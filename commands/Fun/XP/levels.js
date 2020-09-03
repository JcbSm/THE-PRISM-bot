const { Command } = require('discord-akairo');
const { colors } = require('../../../config')

class LevelsCommand extends Command {
    constructor() {
        super('levels', {
            aliases: ['levels'],
            args: [
                {
                    id: 'page',
                    type: 'string',
                    default: 1
                }
            ]
        })
    }

    async exec(message, args) {

        const DB = this.client.db;

        let sent = await message.channel.send('***Calculating...***')

        const arr = (await DB.query(`SELECT * FROM tbl_users WHERE messages > 0`)).rows

        arr.sort((a, b) => b.xp - a.xp)

        let arr2 = [];

        for(let i = 0; i < arr.length; i++) {

            let user;
            try{
                user = await this.client.users.fetch(arr[i].user_id)
            } catch(err) {
                continue;
            }
            arr2.push(`**Lvl [${arr[i].level}]** • ${user} • \`${arr[i].xp}xp\``)
        }

        const footer = arr2.length < args.page*10 ? `Page ${args.page} | ${((args.page-1)*10)+1} - ${arr2.length} of ${arr2.length}` : `Page ${args.page} | ${((args.page-1)*10)+1} - ${args.page*10} of ${arr2.length}`

        arr2 = arr2.slice((args.page-1)*10, args.page*10)

        await sent.delete();
        await message.channel.send({embed: {

            title: `${message.guild.name} LEADERBOARD`,
            description: `${arr2.join("\n")}`,
            color: colors.purple,
            thumbnail: {
                url: message.guild.iconURL()
            },
            footer: {
                text: footer
            },
            timestamp: new Date()
        }})

    }
}

module.exports = LevelsCommand;