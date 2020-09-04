const { Command } = require('discord-akairo');
const { prism, xpArray, colors, embeds} = require('../../../config');
const { groupDigits, pad } = require('../../../functions')

class RankCommand extends Command {
    constructor() {
        super('rank', {
            aliases: ['rank'],
            args: [
                {
                    id: 'member',
                    type: 'member'
                }
            ]
        })
    }

    async exec(message, args) {

        const DB = this.client.db;

        try{

            const member = args.member ? args.member : message.member

            const data = (await DB.query(`SELECT * FROM tbl_users WHERE user_id = ${member.id}`)).rows[0]
            if(!data) return message.reply('No data to view')

            //Progress Bar

            const barLength = 45;
            const minXP = xpArray[data.level];
            const maxXP = xpArray[data.level +1];

            let progress = Math.floor(((data.xp - minXP)/(maxXP - minXP)) * barLength)

            let bar = [];

            for(let i = 0; i < barLength; i++) {

                if(progress > i) {
                    bar.push('■')
                } else {
                    bar.push('-')
                }
            }

            const date = new Date(message.createdTimestamp - data.last_message_timestamp);
            const footer = date.getUTCHours() === 0 ? `${pad(date.getUTCMinutes(), 2)}:${pad(date.getUTCSeconds(), 2)}` : null

            message.channel.send({ embed: {

                title: `${message.guild.name} RANK`,
                description: `\`\`\`                  LEVEL [${data.level}]\n[${bar.join("")}]\n${groupDigits(data.xp - minXP)} / ${groupDigits(maxXP-minXP)}\`\`\``,
                fields: [
                    {
                        name: 'Total XP',
                        value: `\`${groupDigits(data.xp)}\``,
                        inline: true
                    },
                    {
                        name: 'XP to next level',
                        value: `\`${groupDigits(xpArray[data.level + 1] - data.xp)}\``,
                        inline: true
                    },
                    embeds.blankInline,
                    {
                        name: 'Messages',
                        value: `\`${groupDigits(data.messages)}\``,
                        inline: true
                    },
                    {
                        name: 'Voice',
                        value: `\`${groupDigits(data.voice_minutes)} minutes\``,
                        inline: true
                    },
                    embeds.blankInline
                ],
                thumbnail: {
                    url: member.user.displayAvatarURL({size:1024})
                },
                color: colors.purple,
                timestamp: Number(data.last_message_timestamp),
                footer: {
                    text: footer
                }
            }})

        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = RankCommand