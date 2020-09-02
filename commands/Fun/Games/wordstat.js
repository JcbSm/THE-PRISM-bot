const { Command } = require('discord-akairo');
const { colors } = require('../../../config')

class WordStatCommand extends Command {
    constructor() {
        super('wordstat', {
            aliases: ['wordstat', 'wordstats'],
            description: {
                content: 'View a tbl_wording stats',
                usage: 'wordstat <member>'
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

        try {

            const data = (await this.client.db.query(`SELECT * FROM tbl_wording WHERE user_id = ${member.id}`)).rows[0];

            if(!data) return message.reply('This user has no stats to view.');

            message.channel.send({ embed: {

                title: `${message.guild.name} WORDING STATS`,
                description: `${member} has earnt \`${data.total_points}\` points`,
                fields: [
                    {
                        name: 'Total Words',
                        value: `\`${data.total_words}\``,
                        inline: true
                    },
                    {
                        name: 'Total Fails',
                        value: `\`${data.total_fails}\``,
                        inline: true
                    },
                    {
                        name: 'Average points per word',
                        value: `\`${Math.round((Number(data.total_points) / Number(data.total_words)) * 100) / 100}\``,
                        inline: false
                    },
                    {
                        name: 'Worst fail',
                        value: `\`${Number(data.worst_fail)}\` points thrown away`,
                        inline: true
                    },
                    {
                        name: 'Last Word',
                        value: `${data.last_word} • [Jump](${data.last_word_url})`
                    }
                ],
                color: colors.purple,
                thumbnail: {
                    url: member.user.displayAvatarURL({size: 1024})
                },
                timestamp: Number(data.last_word_timestamp),
                footer: {
                    text: 'Last worded'
                }
            }})

        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = WordStatCommand