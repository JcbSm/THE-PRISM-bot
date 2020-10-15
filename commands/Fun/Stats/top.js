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

            let sent = this.client.caching ? await message.channel.send('***Calculating...***\n`Due to the bot recently restarting, users are still being cached. This may take some time...`') : await message.channel.send('***Calculating...***')

            const DB = this.client.db

            let arr = (await DB.query(`SELECT * FROM tbl_users`)).rows

            let [arr2, title] = [[], null]

            switch(args.category.toLowerCase()) {

                default:
                case 'messages':

                    title = 'Total Messages'

                    arr.sort((a, b) => b.total_messages - a.total_messages);
                    arr = arr.filter(u => u.total_messages > 0)

                    for(let i = 0; i < arr.length; i++) {

                        let mention;
                        if(message.guild.members.cache.has(arr[i].user_id)) {
                            mention = `<@${arr[i].user_id}>`
                        } else {
                            try{
                                mention = (await this.client.users.fetch(arr[i].user_id)).tag
                            } catch(err) {
                                mention = `\`Deleted User\``
                            }
                        }

                        arr2.push(`**${i+1}.** ${mention} • \`${groupDigits(arr[i].total_messages)}\``)
                    }
                    break;

                case 'voice':

                    title = 'Total VC Time'

                    arr.sort((a, b) => b.total_voice_minutes - a.total_voice_minutes);
                    arr = arr.filter(u => u.total_voice_minutes > 0)

                    for(let i = 0; i < arr.length; i++) {

                        let mention;
                        if(message.guild.members.cache.has(arr[i].user_id)) {
                            mention = `<@${arr[i].user_id}>`
                        } else {
                            try{
                                mention = (await this.client.users.fetch(arr[i].user_id)).tag
                            } catch(err) {
                                mention = `\`Deleted User\``
                            }
                        }

                        const field = arr[i].total_voice_minutes;
                        let time = field > 6000 ? `\`${Math.round(field/60)} hours\`` : `\`${Math.round((field/60)*10)/10} hours\``
                        if(field < 120) time = `\`${field} minutes\``

                        arr2.push(`**${i+1}.** ${mention} • ${time}`)
                    }
                    break;

                case 'afk':

                    title = 'Most AFKs'
    
                    arr.sort((a, b) => b.afk_count - a.afk_count);
                    arr = arr.filter(u => u.afk_count > 0)
    
                    for(let i = 0; i < arr.length; i++) {

                        let mention;
                        if(message.guild.members.cache.has(arr[i].user_id)) {
                            mention = `<@${arr[i].user_id}>`
                        } else {
                            try{
                                mention = (await this.client.users.fetch(arr[i].user_id)).tag
                            } catch(err) {
                                mention = `\`Deleted User\``
                            }
                        }

                        arr2.push(`**${i+1}.** ${mention} • \`${arr[i].afk_count}\``)
                    }
                    break;

                case 'muted':
                case 'mute':

                    title = 'Most Time Spent Muted'

                    arr.sort((a, b) => b.total_mute_minutes - a.total_mute_minutes);
                    arr = arr.filter(u => u.total_mute_minutes > 0)

                    for(let i = 0; i < arr.length; i++) {

                        let mention;
                        if(message.guild.members.cache.has(arr[i].user_id)) {
                            mention = `<@${arr[i].user_id}>`
                        } else {
                            try{
                                mention = (await this.client.users.fetch(arr[i].user_id)).tag
                            } catch(err) {
                                mention = `\`Deleted User\``
                            }
                        }

                        const field = arr[i].total_mute_minutes;
                        let time = field > 6000 ? `\`${Math.round(field/60)} hours\`` : `\`${Math.round((field/60)*10)/10} hours\``
                        if(field < 600) time = `\`${field} minutes\``

                        arr2.push(`**${i+1}. ** ${mention} • ${time}`)
                    }
                    break;

                case 'muted%':
                case 'mute%':

                    title = 'Percentage of Time Spent Muted'

                    arr = arr.filter(u => u.total_voice_minutes > 60)
                    arr.sort((a, b) => ((b.total_mute_minutes/b.total_voice_minutes)*100000) - ((a.total_mute_minutes/a.total_voice_minutes)*100000));

                    for(let i = 0; i < arr.length; i++) {

                        let mention;
                        if(message.guild.members.cache.has(arr[i].user_id)) {
                            mention = `<@${arr[i].user_id}>`
                        } else {
                            try{
                                mention = (await this.client.users.fetch(arr[i].user_id)).tag
                            } catch(err) {
                                mention = `\`Deleted User\``
                            }
                        }

                        arr2.push(`**${i+1}. ** ${mention} • \`${Math.round((arr[i].total_mute_minutes/arr[i].total_voice_minutes)*10000)/100}%\``)
                    }

                    break;

                case 'funny':

                    title = 'Funny Points';

                    arr = arr.filter(u => u.funny_points !== 0)
                    arr.sort((a, b) => b.funny_points - a.funny_points);

                    for(let i = 0; i < arr.length; i++) {

                        let mention;
                        if(message.guild.members.cache.has(arr[i].user_id)) {
                            mention = `<@${arr[i].user_id}>`
                        } else {
                            try{
                                mention = (await this.client.users.fetch(arr[i].user_id)).tag
                            } catch(err) {
                                mention = `\`Deleted User\``
                            }
                        }

                        arr2.push(`**${i+1}. ** ${mention} • \`${arr[i].funny_points}\``)
                    }

                    break;

                case 'cringe':

                    title = 'Cringe Points';

                    arr = arr.filter(u => u.cringe_points !== 0)
                    arr.sort((a, b) => b.cringe_points - a.cringe_points);

                    for(let i = 0; i < arr.length; i++) {

                        let mention;
                        if(message.guild.members.cache.has(arr[i].user_id)) {
                            mention = `<@${arr[i].user_id}>`
                        } else {
                            try{
                                mention = (await this.client.users.fetch(arr[i].user_id)).tag
                            } catch(err) {
                                mention = `\`Deleted User\``
                            }
                        }

                        arr2.push(`**${i+1}. ** ${mention} • \`${arr[i].cringe_points}\``)
                    }

                    break;

                case 'awarded':

                    title = 'Funny Points Awarded';

                    arr = arr.filter(u => u.funny_points_awarded !== 0)
                    arr.sort((a, b) => b.funny_points_awarded - a.funny_points_awarded);

                    for(let i = 0; i < arr.length; i++) {

                        let mention;
                        if(message.guild.members.cache.has(arr[i].user_id)) {
                            mention = `<@${arr[i].user_id}>`
                        } else {
                            try{
                                mention = (await this.client.users.fetch(arr[i].user_id)).tag
                            } catch(err) {
                                mention = `\`Deleted User\``
                            }
                        }

                        arr2.push(`**${i+1}. ** ${mention} • \`${arr[i].funny_points_awarded}\``)
                    }

                    break;

                case 'cringed':

                    title = 'Most Cringed';

                    arr = arr.filter(u => u.cringe_points_awarded !== 0)
                    arr.sort((a, b) => b.cringe_points_awarded - a.cringe_points_awarded);

                    for(let i = 0; i < arr.length; i++) {

                        let mention;
                        if(message.guild.members.cache.has(arr[i].user_id)) {
                            mention = `<@${arr[i].user_id}>`
                        } else {
                            try{
                                mention = (await this.client.users.fetch(arr[i].user_id)).tag
                            } catch(err) {
                                mention = `\`Deleted User\``
                            }
                        }

                        arr2.push(`**${i+1}. ** ${mention} • \`${arr[i].cringe_points_awarded}\``)
                    }

                    break;

                case 'score':
                case 'overall':

                    title = 'Overall Score';

                    arr = arr.filter(u => u.cringe_points_awarded !== 0 || u.funny_points_awarded !== 0)
                    arr.sort((a, b) => (b.funny_points - b.cringe_points) - (a.funny_points - a.cringe_points));

                    for(let i = 0; i < arr.length; i++) {

                        let mention;
                        if(message.guild.members.cache.has(arr[i].user_id)) {
                            mention = `<@${arr[i].user_id}>`
                        } else {
                            try{
                                mention = (await this.client.users.fetch(arr[i].user_id)).tag
                            } catch(err) {
                                mention = `\`Deleted User\``
                            }
                        }

                        arr2.push(`**${i+1}. ** ${mention} • \`${arr[i].funny_points - arr[i].cringe_points}\``)

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