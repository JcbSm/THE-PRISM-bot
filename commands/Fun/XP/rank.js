const { Command } = require('discord-akairo');
const { prism, xpArray, colors} = require('../../../config');

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

            message.channel.send({ embed: {

                title: `${message.guild.name} RANK`,
                description: `\`\`\`[${bar.join("")}]\`\`\`\n\`${data.xp - minXP}/${maxXP}\``,
                fields: [
                    {
                        name: 'Level',
                        value: data.level,
                        inline: true
                    },
                    {
                        name: 'Total XP',
                        value: data.xp,
                        inline: true
                    },
                    {
                        name: 'XP to next level',
                        value: xpArray[data.level + 1] - data.xp,
                        inline: true
                    }
                ],
                thumbnail: {
                    url: member.user.displayAvatarURL({size:1024})
                },
                color: colors.purple,
                timestamp: new Date()
            }})

        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = RankCommand