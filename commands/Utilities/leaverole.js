const { Command } = require('discord-akairo');
const { prism } = require('../../config')


class LeaveRoleCommand extends Command {
    constructor() {
        super('leaverole', {
            aliases: ['leaverole','leave-role'],
            description: {
                content: 'Remove a joinable role',
                usage: 'leaverole <role>'
            },
            category: 'utilities',
            args: [
                {
                    id: 'role',
                    type: 'role',
                    match: 'rest'
                }
            ]
        })
    }

    async exec(message, args) {

        const selfRoles = prism.guild.selfRoles;

        const role = args.role
        if(!role) return message.reply('No role found.')

        let joinableRole = selfRoles.find(r => r.id == role.id)

        if(!joinableRole) return message.reply(`This is not a removeable role.`)

        if(message.member.roles.cache.has(role.id)) {
            message.member.roles.remove(role.id).then(message.channel.send(`***Successfully removed the ${role.name} role.***`))
        } else {
            message.reply('You don\'t have this role.')
        }

    }
}

module.exports = LeaveRoleCommand