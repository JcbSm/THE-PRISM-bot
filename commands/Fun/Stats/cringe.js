const { Command } = require('discord-akairo');
const { colors } = require('../../../config');
const { milliToTime } = require('../../../functions');

class CringeCommand extends Command { 
    constructor() {
        super('cringe', {
            aliases: ['cringe'],
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
                usage: 'cringe <member> <points>',
                content: 'Awards a member with some cringe points.'
            }
        })
    }

    async exec(message, args) {

        try{

        const member = args.member
        const DB = this.client.db;
        const points = Math.round(args.points)

        const authorData = (await DB.query(`SELECT * FROM tbl_users WHERE user_id = ${message.author.id}`)).rows[0]
        if(message.author.id !== this.client.ownerID && (message.createdTimestamp - authorData.cringe_points_last_awarded) < (1000*3600)*12) {
            return message.reply(`You can award points again in \`${milliToTime(((1000*3600)*12 - (message.createdTimestamp - authorData.cringe_points_last_awarded)))}\``)
        }

        if(!member) return message.reply('Please provide a member')
        if(member.id === message.author.id) return message.reply('You can only give other people cringe points')
        if(points > 10 || points < 1) return message.reply('You can only give between 1-10 points.')

        const data = (await DB.query(`SELECT * FROM tbl_users WHERE user_id = ${member.id}`)).rows[0]

        DB.query(`UPDATE tbl_users SET cringe_points = cringe_points + ${points} WHERE user_id = ${member.id}`)
        DB.query(`UPDATE tbl_users SET cringe_points_last_awarded = ${message.createdTimestamp}, cringe_points_awarded = cringe_points_awarded + ${points} WHERE user_id = ${message.author.id}`, (err, res) => {
            console.log(err, res)
        })

        message.channel.send({ embed: {

            title: 'Cringe Points Awarded',
            description: `\`${points}\` points.`,
            fields: [
                {
                    name: 'Awarded to:',
                    value: `${member}, \`${data.cringe_points + points} total\``
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

        } catch(e) {console.log(e)}
    }
}

module.exports = CringeCommand;
