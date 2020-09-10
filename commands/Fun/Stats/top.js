const { Command } = require('discord-akairo');
const { colors } = require('../../../config');
const { groupDigits } = require('../../../functions');

class TopCommand extends Command {
    constructor() {
        super('top', {
            aliases: ['top', 'leaderboard', 'lb'],
            description: {
                content: 'Show the server\'s leaderboard. Categories: "messages", "voice", "afk", "muted"',
                usage: 'leaderboard <category> <page>'
            },
            args: [
                {
                    id: 'category',
                    type: 'string',
                    default: 'messages'
                },
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

            const sent = await message.channel.send('***Calculating...***')

            const DB = this.client.db

            let arr = (await DB.query(`SELECT user_id, total_messages, total_voice_minutes, afk_count, total_mute_minutes FROM tbl_users`)).rows

            let [arr2, title] = [[], null]

            switch(args.category.toLowerCase()) {

                default:
                case 'messages':

                    title = 'Total Messages'

                    arr.sort((a, b) => b.total_messages - a.total_messages);
                    arr = arr.filter(u => u.total_messages > 0)

                    for(let i = 0; i < arr.length; i++) {

                        arr2.push(`**${i+1}.** <@${arr[i].user_id}> • \`${groupDigits(arr[i].total_messages)}\``)
                    }
                    break;

                case 'voice':

                    title = 'Total VC Time'

                    arr.sort((a, b) => b.total_voice_minutes - a.total_voice_minutes);
                    arr = arr.filter(u => u.total_voice_minutes > 0)

                    for(let i = 0; i < arr.length; i++) {

                        arr2.push(`**${i+1}.** <@${arr[i].user_id}> • \`${Math.round((arr[i].total_voice_minutes/60)*10)/10} hours\``)
                    }
                    break;

                case 'afk':

                    title = 'Most AFKs'
    
                    arr.sort((a, b) => b.afk_count - a.afk_count);
                    arr = arr.filter(u => u.afk_count > 0)
    
                    for(let i = 0; i < arr.length; i++) {

                        arr2.push(`**${i+1}.** <@${arr[i].user_id}> • \`${arr[i].afk_count}\``)
                    }
                    break;

                case 'muted':

                    title = 'Most Time Spent Muted'

                    arr.sort((a, b) => b.total_mute_minutes - a.total_mute_minutes);
                    arr = arr.filter(u => u.total_mute_minutes > 0)

                    //console.log(arr.filter(u => u.total_mute_minutes === 0).length)

                    for(let i = 0; i < arr.length; i++) {

                        arr2.push(`**${i+1}. ** <@${arr[i].user_id}> • \`${arr[i].total_mute_minutes}\``)
                    }
                    break;
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
                description: `*${title}:*\n\n${arr2.join("\n")}`,
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

module.exports = TopCommand;