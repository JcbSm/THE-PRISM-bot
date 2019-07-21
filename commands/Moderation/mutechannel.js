const { Command } = require('discord-akairo')

class MuteChannelCommand extends Command {
    constructor() {
        super('mutechannel', {
            aliases: ['mutechannel', 'mute-channel'],
            description: {
                content: 'Changes channel permissions so that people with the \'Muted\' role can\'t speak there.',
                usage: 'mutechannel <channel>'
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

        if(!message.guild.roles.find(role => role.name.toLowerCase() === 'muted')) {
            message.guild.createRole({
                name: 'Muted',
                color: '#000001',
                permissions: 'VIEW_CHANNEL'
            })

            return message.reply('No muted role found, created a new one. Try again.')
        }

        let mutedRole = message.guild.roles.find(role => role.name.toLowerCase() === 'muted')

        if(!args.channel) {
            message.channel.overwritePermissions(mutedRole, {SEND_MESSAGES: false})
            message.channel.send(`***Updated permissions for Muted in ${message.channel}***`)
        } else {
            args.channel.overwritePermissions(mutedRole, {SEND_MESSAGES: false})
            message.channel.send(`***Updated permissions for Muted in ${args.channel}***`)
        }
    }
}

module.exports = MuteChannelCommand;