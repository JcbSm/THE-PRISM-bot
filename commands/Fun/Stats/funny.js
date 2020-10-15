const { Command } = require('discord-akairo');
const { colors, prism } = require('../../../config');
const { milliToTime } = require('../../../functions');

class FunnyCommand extends Command { 
    constructor() {
        super('funny', {
            aliases: ['funny'],
            args: [
                {
                    id: 'member',
                    type: 'member'
                },
                {
                    id: 'points',
                    type: 'number',
                    default: 0
                }
            ],
            description: {
                usage: 'funny <member> <points>',
                content: 'Awards a member with some funny points.'
            }
        })
    }

    async exec(message, args) {

        if(message.guild.id !== prism.guild.id) return message.reply('This only works in PRISM, sorry...')

        const member = args.member
        const DB = this.client.db;
        const points = Math.round(args.points)

        const authorData = (await DB.query(`SELECT * FROM tbl_users WHERE user_id = ${message.author.id}`)).rows[0]
        if(message.author.id !== this.client.ownerID && (message.createdTimestamp - authorData.funny_points_last_awarded) < (1000*3600)*12) {
            return message.reply(`You can award points again in \`${milliToTime(((1000*3600)*12 - (message.createdTimestamp - authorData.funny_points_last_awarded)))}\``)
        }

        if(!member) return message.reply('Please provide a member')
        if(member.id === message.author.id) return message.reply('You can only give other people funny points')
        if(points > 10 || points < 1) return message.reply('You can only give between 1-10 points.')

        const data = (await DB.query(`SELECT * FROM tbl_users WHERE user_id = ${member.id}`)).rows[0]

        if(!data) return message.reply('This person is not on the database.')

        DB.query(`UPDATE tbl_users SET funny_points = funny_points + ${points} WHERE user_id = ${member.id}`)
        DB.query(`UPDATE tbl_users SET funny_points_last_awarded = ${message.createdTimestamp}, funny_points_awarded = funny_points_awarded + ${points} WHERE user_id = ${message.author.id}`)

        message.channel.send({ embed: {

            title: 'Funny Points Awarded',
            description: `\`${points}\` points.`,
            fields: [
                {
                    name: 'Awarded to:',
                    value: `${member}, \`${data.funny_points + points} total\``
                },
                {
                    name: 'By:',
                    value: message.member
                }
            ],
            color: colors.good,
            thumbnail: {
                url: member.user.displayAvatarURL()
            }
        }})
    }
}

module.exports = FunnyCommand;
