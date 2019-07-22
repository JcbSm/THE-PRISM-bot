const { Command } = require('discord-akairo');

class ClearRoleCommand extends Command {
    constructor() {
        super('clearrole', {
            aliases: ['clearrole','clear-role'],
            description: {
                content: 'Removes every member from this role',
                usage: 'clearrole <role>'
            },
            category: 'moderation',
            args: [
                {
                    id: 'role',
                    match: 'rest'
                }
            ],
            userPermissions: 'ADMINISTRATOR'
        })
    }

    exec(message, args) {

        let role = message.guild.roles.find(r => r.name.toLowerCase().includes(args.role.toLowerCase()))

        for(let i = 0; i < role.members.keyArray().length; i++) {

            try {
                message.guild.members.get(role.members.keyArray()[i]).removeRole(role.id)
            } catch (error) {
                console.error
            }

        }

        message.channel.send("Done!")
    }
}

module.exports = ClearRoleCommand