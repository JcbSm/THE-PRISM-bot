const { Command } = require('discord-akairo');
const { colors, prism } = require('../../../config')

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

            if(message.guild.id !== prism.guild.id) return message.reply('This only works in PRISM, sorry...')

        const member = args.member
        const DB =  this.client.db
        const points = Math.round(args.points)

        if(!member) return message.reply('Please provide a member')

        const data = (await DB.query(`SELECT * FROM tbl_users WHERE user_id = ${member.id}`)).rows[0]

        if(!data) return message.reply('This person is not on the database.')

        DB.query(`UPDATE tbl_users SET funny_points = funny_points - ${points} WHERE user_id = ${member.id}`)

        message.channel.send({ embed: {

            title: 'Funny Points Revoked',
            description: `\`${points}\` points.`,
            fields: [
                {
                    name: 'Revoked from:',
                    value: `${member}, \`${data.funny_points - points} total\``
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
