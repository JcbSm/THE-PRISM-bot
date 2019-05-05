const { Command } = require('discord-akairo')

class MuteCategoryCommand extends Command {
    constructor() {
        super('mutecategory', {
            aliases: ['mutecategory', 'mute-category'],
            description: {
                content: 'Changes category permissions so that people with the \'Muted\' role can\'t speak there.',
                usage: 'mutecategory <category>'
            },
            userPermissions: 'MANAGE_CHANNELS',
            clientPermissions: 'MANAGE_CHANNELS',
            args: [
                {
                    id: 'category',
                    type: 'string',
                    match: 'rest'
                }
            ],
            category: 'moderation'
        })
    }

    exec(message, args) {

        if(!message.guild.roles.find(role => role.name.toLowerCase() === 'muted')) {
            message.guild.createRole({
                name: 'Muted',
                color: '#000001',
                permissions: 'VIEW_CHANNEL'
            })

            return message.reply('No muted role found, created a new one. Try again.')
        }

        let mutedRole = message.guild.roles.find(role => role.name.toLowerCase() === 'muted')

        try {
            if(!args.category) {
                message.channel.parent.overwritePermissions(mutedRole, {SEND_MESSAGES: false});
                message.channel.send(`***Updated permissions for Muted in \'${message.channel.parent}\'***`)
            } else {
                let category = message.guild.channels.find(channel => channel.name.toLowerCase() === args.category.toLowerCase())
                category.overwritePermissions(mutedRole, {SEND_MESSAGES: false})
                message.channel.send(`***Updated permissions for Muted in \'${category}\'***`)
            }
        } catch {
            message.reply('No category found.')
        }
    }
}

module.exports = MuteCategoryCommand