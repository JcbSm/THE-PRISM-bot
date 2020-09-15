const { Command } = require('discord-akairo');
const { colors } = require('../../../config')
const { pad, groupDigits } = require('../../../functions')

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
            ],
            category: 'stats'
        })
    }

    async exec(message, args) {

        try{

            const DB = this.client.db;

            let sent = this.client.caching ? await message.channel.send('***Calculating...***\n`Due to the bot recently restarting, users are still being cached. This may take some time...`') : await message.channel.send('***Calculating...***')

            const arr = (await DB.query(`SELECT * FROM tbl_users WHERE xp > 0`)).rows

            arr.sort((a, b) => b.xp - a.xp)

            let arr2 = [];

            for(let i = 0; i < arr.length; i++) {

                let mention

                if(message.guild.members.cache.has(arr[i].user_id)) {
                    mention = `<@${arr[i].user_id}>`
                } else {
                    try{
                        mention = (await this.client.users.fetch(arr[i].user_id)).tag
                    } catch(err) {
                        mention = `\`Deleted User\``
                    }
                }

                arr2.push(`**\`${pad(i+1, 2)}.\`** • \`Lvl [${arr[i].level}]\` • ${mention} • \`${groupDigits(arr[i].xp)} xp\``)
            }

            let page;

            if(isNaN(Number(args.page))) {

                const mem = this.client.util.resolveMember(args.page, message.guild.members.cache)
                if(!mem) {
                    page = 1
                } else {
                    let i = arr2.findIndex(s => s.includes(mem.id))
                    page = Math.ceil((i+1)/10)
                }   
            } else {
                page = args.page
            }

            const footer = arr2.length < page*10 ? `Page ${page} | ${((page-1)*10)+1} - ${arr2.length} of ${arr2.length}` : `Page ${page} | ${((page-1)*10)+1} - ${page*10} of ${arr2.length}`

            arr2 = arr2.slice((page-1)*10, page*10)

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
        } catch(e) {console.log(e)}
    }
}

module.exports = LevelsCommand;