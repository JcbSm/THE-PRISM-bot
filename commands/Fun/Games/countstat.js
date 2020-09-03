const { Command } = require('discord-akairo');
const { colors, prism } = require('../../../config');

class CountStatCommand extends Command {
    constructor() {
        super('countstat', {
            aliases: ['countstat', 'countstats'],
            description: {
                content: 'View a tbl_counts counting stats',
                usage: 'countstat <member>'
            },
            args: [
                {
                    id: 'member',
                    type: 'member',
                    match: 'rest'
                }
            ],
            category: 'games'
        })
    }
    async exec(message, args) {

        const member = args.member ? args.member : message.member;

        try{

            const currentCount = (await (await this.client.channels.fetch(prism.guild.channelIDs.counting)).messages.fetch({limit: 1})).first()
            
            // Get Position

            const arr = (await this.client.db.query(`
                SELECT user_id, counts
                FROM tbl_counts
                WHERE counts > 0;
            `)).rows

            arr.sort((a, b) => b.counts - a.counts)
            const lbPos = arr.findIndex(u => u.user_id === member.id) + 1

            // Send Data

            const data = (await this.client.db.query(`SELECT * FROM tbl_counts WHERE user_id = ${member.user.id}`)).rows[0]

            if(!data) return message.reply('This user has no stats to view.')

            message.channel.send({ embed: {
                title: `${message.guild.name} COUNTING STATS`,
                description: `${member} has counted \`${data.counts}\` times`,
                fields: [
                    {
                        name: 'Percentage of all counts',
                        value: `\`${Math.round(data.counts/Number(currentCount.content)*10000)/100}%\``,
                        inline: true
                    },
                    {
                        name: `Position`,
                        value: lbPos,
                        inline: true
                    },
                    {
                        name: 'Most recent count',
                        value: `\`${data.last_count}\` • [Jump](${data.last_count_url})`,
                    }
                ],
                color: colors.purple,
                thumbnail: {
                    url: member.user.displayAvatarURL({size: 1024})
                },
                timestamp: Number(data.last_count_timestamp),
                footer: {
                    text: 'Last counted'
                }
            }})
            
        } catch(e) {
            console.log(e)
        }
    }    
}

module.exports = CountStatCommand