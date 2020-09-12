const { Command } = require('discord-akairo');

class QueryCommand extends Command {
    constructor() {
        super('query', {
            aliases: ['query'],
            args: [
                {
                    id: 'query',
                    match: 'rest'
                }
            ]
        })
    }

    async exec(message, args) {

        try{

            const DB = this.client.db;

            if(!args.query.includes('```')) return message.reply('please put the query inside a code block.');

            const query = args.query.split('```')[1]

            if(!query.trim().toLowerCase().startsWith('select') && message.author.id !== this.client.ownerID) {

                return message.reply('Only the owner can use queries other than `\'SELECT\'`')
            }

            await DB.query(query, (err, res) => {

                try{

                    if(err) {
                        message.reply('An error occurrded, https://dashboard.heroku.com/apps/prism-bot/logs')
                        return console.log(err)
                    };
                    
                    if(res.rows.length === 0) {

                        message.channel.send({embed: {

                            description: `**RUNNING**\`\`\`${query}\`\`\``
                        }})

                    } else if(res.rows.length === 1) {
                        message.channel.send({embed: {

                            description: `**RUNNING**\`\`\`${query}\`\`\`\n **RESULT**\`\`\`json\n${JSON.stringify(res.rows[0], null, 2)}\`\`\``
                        }})
                        
                    } else if(res.rows.length > 1) {
                        message.channel.send({embed: {

                            description: `**RUNNING**\`\`\`${query}\`\`\`\n **RESULT**\`\`\`json\n${JSON.stringify(res.rows[0], null, 2)} \n ... ${res.rows.length - 1} more items.\`\`\``
                        }})
                    }
                } catch(e) {console.log(e)}
            })

        } catch(err) {console.log(err)}
    }
}

module.exports = QueryCommand