const { Command } = require('discord-akairo');
const { colors } = require('../../../config')

class UnfunnyCommand extends Command { 
    constructor() {
        super('unfunny', {
            aliases: ['unfunny'],
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
                usage: 'unfunny <member> <points>',
                content: 'Revokes a member of some funny points.'
            },
            userPermissions: 'ADMINISTRATOR'
        })
    }

    async exec(message, args) {
        try{

        const member = args.member
        const DB =  this.client.db

        if(!member) return message.reply('Please provide a member')

        const data = (await DB.query(`SELECT * FROM tbl_users WHERE user_id = ${member.id}`)).rows[0]

        DB.query(`UPDATE tbl_users SET funny_points = funny_points - ${args.points} WHERE user_id = ${member.id}`)

        message.channel.send({ embed: {

            title: 'Funny Points Revoked',
            description: `\`${args.points}\` points.`,
            fields: [
                {
                    name: 'Revoked from:',
                    value: `${member}, \`${data.funny_points - args.points} total\``
                },
                {
                    name: 'By:',
                    value: message.member
                }
            ],
            color: colors.bad,
            thumbnail: {
                url: member.user.displayAvatarURL()
            }
        }})
    }catch(e) {console.log(e)}
    }
}

module.exports = UnfunnyCommand;
