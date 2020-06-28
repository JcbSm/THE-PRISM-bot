const { Command } = require('discord-akairo')

class UnmuteChannelCommand extends Command {
    constructor() {
        super('unmutechannel', {
            aliases: ['unmutechannel', 'unmute-channel'],
            description: {
                content: 'Changes channel permissions so that people with the \'Muted\' role can speak there.',
                usage: 'unmutechannel <channel>'
            },
            userPermissions: 'MANAGE_CHANNELS',
            clientPermissions: 'MANAGE_CHANNELS',
            args: [
                {
                    id: 'channel',
                    type: 'channelMention'
                }
            ],
            category: 'moderation'
        })
    }
    
    exec(message, args) {

        if(!message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')) {
            message.guild.createRole({ data: {
                name: 'Muted',
                color: '#000001',
                permissions: 'VIEW_CHANNEL'
            }})

            return message.reply('No muted role found, created a new one. Try again.')
        }

        let mutedRole = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')

        if(!args.channel) {
            message.channel.createOverwrite(mutedRole, {SEND_MESSAGES: true})
            message.channel.send(`***Updated permissions for Muted in ${message.channel}***`)
        } else {
            args.channel.createOverwrite(mutedRole, {SEND_MESSAGES: true})
            message.channel.send(`***Updated permissions for Muted in ${args.channel}***`)
        }
    }
}

module.exports = UnmuteChannelCommand;