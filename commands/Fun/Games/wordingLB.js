const { Command } = require('discord-akairo');
const { colors } = require('../../../config')

class WordingLBCommand extends Command {
    constructor() {
        super('wording', {
            aliases: ['wording', 'words'],
            description: {
                content: 'Shows the leaderboard for #wording\nCategories: "points", "words", "fails", "average" "worst" (worst fails)',
                usage: 'wording <category> <page>'
            },
            args: [
                {
                    id: 'category',
                    type: 'string',
                    default: 'points',
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

            let sent = await message.channel.send('***Calculating...***')

            const arr = (await this.client.db.query(`
                SELECT *
                FROM tbl_wording
                WHERE total_words > 0;
            `)).rows

            let arr2 = [];
            let title;

            switch(args.category.toLowerCase()) {

                default:
                case 'points':

                    title = 'Total Points'
            
                    arr.sort((a, b) => b.total_points - a.total_points);

                    for(let i = 0; i < arr.length; i++) {

                        arr2.push(`**${i+1}.** <@${arr[i].user_id}> • \`${arr[i].total_points}\``)
                    }

                    break;

                case 'words':

                    title = 'Total Words'

                    arr.sort((a, b) => b.total_words - a.total_words);

                    for(let i = 0; i < arr.length; i++) {

                        arr2.push(`**${i+1}.** <@${arr[i].user_id}> • \`${arr[i].total_words}\``)
                    }

                    break;

                case 'fails':

                    title = 'Total Fails'

                    arr.sort((a, b) => b.total_fails - a.total_fails);

                    for(let i = 0; i < arr.length; i++) {

                        arr2.push(`**${i+1}.** <@${arr[i].user_id}> • \`${arr[i].total_fails}\``)
                    }

                    break;

                case 'worst':

                    title = 'Worst Fails'

                    arr.sort((a, b) => Number(b.worst_fail) - Number(a.worst_fail));

                    for(let i = 0; i < arr.length; i++) {

                        arr2.push(`**${i+1}.** <@${arr[i].user_id}> • \`${Number(arr[i].worst_fail)}\``)
                    }

                    break;
                
                case 'average':
                case 'av':

                    title = 'Average Points (per word)'

                    arr.sort((a, b) => (Number(b.total_points)/Number(b.total_words)) - (Number(a.total_points))/Number(a.total_words));

                    let place = 1

                    for(let i = 0; i < arr.length; i++) {

                        if(arr[i].total_words < 15) continue;

                        arr2.push(`**${place++}.** <@${arr[i].user_id}> • \`${(Math.round((Number(arr[i].total_points)/Number(arr[i].total_words))*100))/100}\``)
                    }

                    break;
            }

            const footer = arr2.length < args.page*10 ? `Page ${args.page} | ${((args.page-1)*10)+1} - ${arr2.length} of ${arr2.length}` : `Page ${args.page} | ${((args.page-1)*10)+1} - ${args.page*10} of ${arr2.length}`

            arr2 = arr2.slice((args.page-1)*10, args.page*10)

            await sent.delete();
            await message.channel.send({embed: {

                title: `${message.guild.name} WORDING LEADERBOARD`,
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

        } catch(err) {
            console.log(err)
        }
    }
}

module.exports = WordingLBCommand