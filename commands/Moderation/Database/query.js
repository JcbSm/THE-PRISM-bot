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

                    console.log(res);

                    let desc;
                    let fieldArr = [];

                    fieldArr.push({
                        name: 'Result',
                        value: `\`\`\`js\n{\n    command: '${res.command}',\n    rowCount: ${res.rowCount},\n    oid: ${res.oid}\n}\`\`\``
                    })
                    
                    if(res.rows.length === 0) {

                        desc = `\`\`\`${query}\`\`\``

                    } else if(res.rows.length === 1) {

                        desc = `\`\`\`${query}\`\`\``;
                        fieldArr.push({
                            name: 'Rows',
                            value: `\`\`\`json\n${JSON.stringify(res.rows[0], null, 2)}\`\`\``
                        })
                        
                    } else if(res.rows.length > 1) {

                        desc = `\`\`\`${query}\`\`\``;
                        fieldArr.push({
                            name: 'Rows',
                            value: `\`\`\`json\n${JSON.stringify(res.rows[0], null, 2)} \n ... ${res.rows.length - 1} more items.\`\`\``
                        })
                    }

                    message.channel.send({embed: {
                        title: 'Running query:',
                        description: desc,
                        fields: fieldArr
                    }})

                } catch(e) {console.log(e)}
            })

        } catch(err) {console.log(err)}
    }
}

module.exports = QueryCommand