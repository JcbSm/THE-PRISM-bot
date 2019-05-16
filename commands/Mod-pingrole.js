const { Command } = require('discord-akairo')

class PingRoleCommand extends Command {
    constructor() {
        super('pingrole', {
            aliases: ['pingrole'],
            description: {
                content: 'Pings a role which can\'t be mentioned by everyone',
                usage: 'pingrole <role> <message>'
            },
            split: 'quoted',
            args: [
                {
                    id: 'role',
                },
                {
                    id: 'message',
                    match: 'rest'
                }
            ],
            category: 'moderation',
            userPermissions: 'MENTION_EVERYONE'
        })
    }

    async exec(message, args) {

        let role = message.guild.roles.find(r => r.name.toLowerCase().includes(args.role.toLowerCase()))

        const rolePermBit = role.permissions

        await role.setMentionable(true)
        await message.channel.send(`<@&${role.id}> ${args.message}.`)
        await role.setMentionable(false)
        message.delete()
        
    }
}

module.exports = PingRoleCommand