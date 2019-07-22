const { Command } = require('discord-akairo');
const roles = require('../../datafiles/self-roles.js')

class JoinRoleCommand extends Command {
    constructor() {
        super('joinrole', {
            aliases: ['joinrole','join-role'],
            description: {
                content: 'Join a role',
                usage: 'joinrole <role>'
            },
            category: 'Utilities',
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

        if(!joinableRole) return message.reply(`You are not allowed to give yourself this role`)
        
        if(message.member.roles.has(role.id)) {
            message.reply('You already have this role.')
        } else {
        message.member.addRole(role.id).then(message.channel.send(`***Successfully given you the ${role.name} role.***`))
        }
    }
}

module.exports = JoinRoleCommand