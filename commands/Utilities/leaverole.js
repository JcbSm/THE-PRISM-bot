const { Command } = require('discord-akairo');
const roles = require('../../datafiles/self-roles.js')

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
                    match: 'rest'
                }
            ]
        })
    }

    async exec(message, args) {

        const role = (await message.guild.fetchMembers()).roles.find(r => r.name.toLowerCase().includes(args.role.toLowerCase()))
        if(!role) return message.reply('No role found.')

        let joinableRole = roles.find(r => r.id == role.id)

        if(!joinableRole) return message.reply(`This is not a removeable role.`)

        if(message.member.roles.has(role.id)) {
            message.member.removeRole(role.id).then(message.channel.send(`***Successfully removed the ${role.name} role.***`))
        } else {
            message.reply('You don\'t have this role.')
        }

    }
}

module.exports = LeaveRoleCommand