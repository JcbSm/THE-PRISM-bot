const { Command } = require('discord-akairo')

class PingRoleCommand extends Command {
    constructor() {
        super('pingrole', {
            aliases: ['pingrole'],
            description: {
                content: 'Pings a role with a message, giving users the option to react with either \"Yes\" or \"No\"',
                usage: 'pingrole <role> <message>'
            },
            split: 'quoted',
            args: [
                {
                    id: 'role',
                    type: 'role'
                },
                {
                    id: 'message',
                    match: 'rest'
                }
            ],
            category: 'utilities',
        })
    }

    async exec(message, args) {

        const role = args.role
        
        if(!role) return message.reply('No role found.')

        if(role.mentionable) {

            let botMessage = await message.channel.send(`${message.member} asks ${role}: ${args.message}`)
            await botMessage.react('✅')
            await botMessage.react('699654286069465189')
            
            message.delete()

        } else {
            return message.reply('Unable to ping that role.')
        }
        
    }
}

module.exports = PingRoleCommand