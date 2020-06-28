const { Command } = require('discord-akairo');

class PrivateCallDeleteCommand extends Command {
    constructor() {
        super('endCall', {
            aliases: ['endCall'],
            description: {
                content: 'Delete a private voice channel',
                usage: 'endCall'
            },
            category: 'private calls',
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
                await voiceChannel.delete()
                await message.channel.delete()
            }

        }
    
    }catch(error){console.log(error)}

    }
}

module.exports = PrivateCallDeleteCommand