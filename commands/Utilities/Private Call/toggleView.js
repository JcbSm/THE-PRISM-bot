const { Command } = require('discord-akairo');

class ToggleViewCommand extends Command {
    constructor() {
        super('toggleView', {
            aliases: ['toggleView'],
            description: {
                content: 'Toggles whether or not other users can view the voice channel',
                usage: 'toggleView'
            },
            category: 'calls',
        })
    }

    async exec(message, args) {
        try{        
        
            if(message.guild.id === '447504770719154192' || message.guild.id === '569556194612740115') {

                const guild = message.guild
                const everyoneRole = message.guild.roles.cache.find(r => r.name === '@everyone')

                if(message.channel.topic.split(';').shift() !== 'PRIVATE CALL') message.reply('This is not a private call text channel, please either make one or use an existing one.');
                if(message.channel.topic.split(';').shift() === 'PRIVATE CALL') {
                    const voiceChannel = message.guild.channels.cache.get(message.channel.topic.split(';').pop())
                    const perms = voiceChannel.permissionOverwrites.get(everyoneRole.id)
                    
                    console.log(perms)
                    console.log(perms.deny.serialize().VIEW_CHANNEL)

                    if(perms.allow.serialize().VIEW_CHANNEL) {
                        await voiceChannel.createOverwrite(everyoneRole, { VIEW_CHANNEL: false })
                        message.channel.send(`***${voiceChannel.name} is now invisible to \`@everyone\`***`)
                    } else {
                        await voiceChannel.createOverwrite(everyoneRole, { VIEW_CHANNEL: true })
                        message.channel.send(`***${voiceChannel.name} is now visible to \`@everyone\`***`)
                    }
                }
            }
            
        }catch(error){console.log(error)}
    }
}

module.exports = ToggleViewCommand