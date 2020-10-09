const { Command } = require('discord-akairo');
const { xpCalc, groupDigits } = require('../../../functions');
const { colors, embeds } = require('../../../config');

class XpCalcCommand extends Command {
    constructor() {
        super('xpcalc', {
            aliases: ['xpcalc'],
            args: [
                {
                    id: 'level',
                    type: 'number',
                    prompt: {
                        retries: 0,
                        start: message => message.reply('Please provide a level')
                    }
                },
                {
                    id: 'xp',
                    type: 'number',
                    default: 0,
                }
            ],
            description: {
                content: 'Calculates how much XP is needed to reach a certain level',
                usage: 'xpcalc <level> <current XP>'
            }
        })
    }

    async exec(message, args) {

        const currentXP = args.xp ? args.xp : (await this.client.db.query(`SELECT xp FROM tbl_users WHERE user_id = ${message.author.id}`)).rows[0].xp
        const requiredXP = xpCalc(args.level) - currentXP;

        if(requiredXP < 0) return message.reply('This level has already been surpassed')

        message.channel.send({ embed: {

            title: 'XP Calculator',
            description: 'Xp can only be earnt from messages every minute.\n\nVoice chat XP is given every 5 minutes.',
            fields: [
                {
                    name: 'Required XP',
                    value: `\`${groupDigits(requiredXP)}\``,
                    inline: true
                },
                {
                    name: 'Average Messages',
                    value: `\`${groupDigits(Math.round(requiredXP/5))}\``,
                    inline: true
                }
            ],
            color: colors.purple,
            thumbnail: {
                url: this.client.user.displayAvatarURL()
            },
            timestamp: message.createdTimestamp
        }})
    }
}

module.exports = XpCalcCommand;