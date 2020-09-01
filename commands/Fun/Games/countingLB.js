const { Command } = require('discord-akairo');
const { colors } = require('../../../config');

class CountingLBCommand extends Command {
    constructor() {
        super('counting', {
            aliases: ['counting', 'counts', 'leaderboard'],
            description: {
                content: 'Shows the leaderboard for #counting',
                usage: 'counting <page>'
            },
            args: [
                {
                    id: 'page',
                    type: 'number',
                    default: 1
                }
            ],
            category: 'games'
        })
    }
    async exec(message, args) {

        try{

            let sent = await message.channel.send('***Calculating...***')

            const arr = (await this.client.db.query(`
                SELECT user_id, counts
                FROM tbl_counts
                WHERE counts > 0;
            `)).rows

            arr.sort((a, b) => b.counts - a.counts)

            let arr2 = [];

            for(let i = 0; i < arr.length; i++) {

                let user;
                try{
                    user = await this.client.users.fetch(arr[i].user_id)
                } catch(err) {
                    continue;
                }
                arr2.push(`**${i+1}.** ${user} • \`${arr[i].counts}\``)
            }

            const footer = arr2.length < args.page*10 ? `Page ${args.page} | ${((args.page-1)*10)+1} - ${arr2.length} of ${arr2.length}` : `Page ${args.page} | ${((args.page-1)*10)+1} - ${args.page*10} of ${arr2.length}`

            arr2 = arr2.slice((args.page-1)*10, args.page*10)

            await sent.delete();
            await message.channel.send({embed: {

                title: `${message.guild.name} counting leaderboard`,
                description: arr2.join("\n"),
                color: colors.purple,
                thumbnail: {
                    url: message.guild.iconURL()
                },
                footer: {
                    text: footer
                },
                timestamp: new Date()
            }})

        } catch(e) {console.log(e)}

    }
}

module.exports = CountingLBCommand