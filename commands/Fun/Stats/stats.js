const { Command } = require('discord-akairo');
const { groupDigits } = require('../../../functions');
const { colors, embeds } = require('../../../config');

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

            const voiceTime = data.total_voice_minutes >= 120 ? `\`${Math.round((data.total_voice_minutes/60)*10)/10}\` hours` : `\`${data.total_voice_minutes}\` minutes`
            const mutedTime = data.total_mute_minutes >= 120 ? `\`${Math.round((data.total_mute_minutes/60)*10)/10}\` hours` : `\`${data.total_mute_minutes}\` minutes`
            const mutedStr = data.total_voice_minutes > 0 ? `, \`${Math.round((data.total_mute_minutes/data.total_voice_minutes)*10000)/100}%\`` : ''

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
                    },
                    embeds.blankInline,
                    {
                        name: 'AFK Counter',
                        value: `\`${data.afk_count}\``,
                        inline: true
                    },
                    {
                        name: 'Time spent muted',
                        value: `${mutedTime + mutedStr}`,
                        inline: true
                    },
                    embeds.blankInline,
                    {
                        name: 'Funny Points',
                        value: `\`${data.funny_points}\` points.\nAwarded \`${data.funny_points_awarded}\``,
                        inline: true
                    },
                    {
                        name: 'Cringe Points',
                        value: `\`${data.cringe_points}\` points.\nCringed \`${data.cringe_points_awarded}\` times.`,
                        inline: true
                    },
                    embeds.blankInline,
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