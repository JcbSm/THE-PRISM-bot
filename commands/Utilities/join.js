const { Command } = require('discord-akairo');

class JoinCommand extends Command {
    constructor() {
        super('join', {
            aliases: ['join'],
            description: {
                content: 'Join the voice channel',
                usage: 'join'
            },
            category: 'utilities',
            channelRestriction: 'guild'
        })
    }

    async exec(message) {

        if(!message.member.voiceChannelID) return message.reply('You\'re not in a voice channel.')

        if(!message.guild.voiceConnection) {
            try {
    
                console.log(message.member.voiceChannelID)

                const channel = message.member.voiceChannel;
                channel.join().then(connection => {
                    console.log('Joined')
                })

            } catch(error) {console.error(e)}
        }
    }
}

module.exports = JoinCommand