const { Command } = require('discord-akairo');
const { colors } = require('../../../config');

class CountingLBCommand extends Command {
    constructor() {
        super('counting', {
            aliases: ['counting', 'counts'],
            description: {
                content: 'Shows the leaderboard for #counting',
                usage: 'counting <page>'
            },
            args: [
                {
                    id: 'category',
                    type: 'string',
                    default: 'counts'
                },
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

            let sent = this.client.caching ? await message.channel.send('***Calculating...***\n`Due to the bot recently restarting, users are still being cached. This may take some time...`') : await message.channel.send('***Calculating...***')

            const arr = (await this.client.db.query(`SELECT * FROM tbl_counts WHERE counts > 0`)).rows

            let arr2 = [];
            let title;

            switch (args.category) {
                
                case 'counts':

                    title = 'Total Counts';

                    arr.sort((a, b) => b.counts - a.counts)

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

                        arr2.push(`**${i+1}.** ${mention} • \`${arr[i].counts}\``)
                    }

                    break;

                case 'last':
                case 'oldest':

                    title = 'Oldest Count'

                    arr.sort((a, b) => a.last_count - b.last_count)

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

                        arr2.push(`**${i+1}.** ${mention} • \`${arr[i].last_count}\``)
                    }

                    break;
            }

            const footer = arr2.length < args.page*10 ? `Page ${args.page} | ${((args.page-1)*10)+1} - ${arr2.length} of ${arr2.length}` : `Page ${args.page} | ${((args.page-1)*10)+1} - ${args.page*10} of ${arr2.length}`

            arr2 = arr2.slice((args.page-1)*10, args.page*10)

            await sent.delete();
            await message.channel.send({embed: {

                title: `${message.guild.name} COUNTING LEADERBOARD`,
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

module.exports = CountingLBCommand