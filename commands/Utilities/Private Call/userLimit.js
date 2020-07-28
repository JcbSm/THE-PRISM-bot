const { Command } = require('discord-akairo');

class UserLimitCommand extends Command {
    constructor() {
        super('userLimit', {
            aliases: ['userLimit'],
            description: {
                content: 'Sets the user limit for the channel',
                usage: 'userlimit <number>'
            },
            category: 'calls',
            args: [
                {
                    id: 'num',
                    type: 'number'
                }
            ]
        })
    }

    async exec(message, args) {
        try{        
        
        if(message.guild.id === '447504770719154192' || message.guild.id === '569556194612740115') {

            const guild = message.guild
            const everyoneRole = message.guild.roles.cache.find(r => r.name === '@everyone')

            if(args.num > 99) return message.reply('Max user count is 99')

            if(message.channel.topic.split(';').shift() !== 'PRIVATE CALL') return message.reply('This is not a private call text channel, please either make one or use an existing one.');
            if(message.channel.topic.split(';').shift() === 'PRIVATE CALL') {

                const voiceChannel = message.guild.channels.cache.get(message.channel.topic.split(';').pop())

                await voiceChannel.setUserLimit(args.num)
                message.channel.send(`***${voiceChannel.name}\'s user limit is now ${args.num}***`)
            }

        }
    
    }catch(error){console.log(error)}

    }
}

module.exports = UserLimitCommand