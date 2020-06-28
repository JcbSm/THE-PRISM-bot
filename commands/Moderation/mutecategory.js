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

        try{
            if(!message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')) {
                message.guild.createRole({ data: {
                    name: 'Muted',
                    color: '#000001',
                    permissions: 'VIEW_CHANNEL'
                }})

                return message.reply('No muted role found, created a new one. Try again.')
            }

            let mutedRole = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')

            try {
                if(!args.category) {
                    message.channel.parent.createOverwrite(mutedRole, {SEND_MESSAGES: false});
                    message.channel.send(`***Updated permissions for Muted in \'${message.channel.parent}\'***`)
                } else {
                    let category = message.guild.channels.find(channel => channel.name.toLowerCase() === args.category.toLowerCase())
                    category.createOverwrite(mutedRole, {SEND_MESSAGES: false})
                    message.channel.send(`***Updated permissions for Muted in \'${category}\'***`)
                }
            } catch {
                message.reply('No category found.')
            }
        } catch(e) {console.log(e)}
    }
}

module.exports = MuteCategoryCommand