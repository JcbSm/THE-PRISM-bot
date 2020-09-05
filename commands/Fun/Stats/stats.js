const { Command } = require('discord-akairo');
const { groupDigits } = require('../../../functions');
const { colors } = require('../../../config');

class StatsCommand extends Command {
    constructor() {
        super('stats', {
            aliases: ['stats', 'stat'],
            description: {
                content: 'View your stats',
                usage: 'stats <member>'
            },
            args: [
                {
                    id: 'member',
                    type: 'member'
                }
            ],
            category: 'stats'
        })
    }

    async exec(message, args) {

        try{

            const member = args.member ? args.member : message.member;
            const DB = this.client.db;

            const data = (await DB.query(`SELECT * FROM tbl_users WHERE user_id = ${member.id}`)).rows[0];

            if(!data) return message.reply(`This user has no data to view.`);

            const voiceTime = data.total_voice_minutes >= 120 ? `\`${Math.floor((data.total_voice_minutes/60)*10)/10}\` hours` : `\`${data.total_voice_minutes}\` minutes`

            message.channel.send({embed: {

                title: 'PRISM STATS',
                description: `**[${data.level}]** • ${member}`,
                fields: [
                    {
                        name: 'Total Messages',
                        value: `\`${groupDigits(data.total_messages)}\``,
                        inline: true
                    },
                    {
                        name: 'Total Voice Time',
                        value: voiceTime,
                        inline: true
                    }
                ],
                thumbnail: {
                    url: member.user.displayAvatarURL({size:1024})
                },
                timestamp: new Date(),
                color: colors.purple,
                
            }})

        } catch(e) {console.log(e)}
    }
}

module.exports = StatsCommand