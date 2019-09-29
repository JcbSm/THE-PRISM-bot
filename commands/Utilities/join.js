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

        if(message.guild.voiceConnection) {

            message.reply('I\'m already connected somewhere else.')
        } else {
    
            console.log(message.member.voiceChannelID)

            message.member.voiceChannel.join().then(connection => {
                messeage.react('👌')
            })
        }
    }
}

module.exports = JoinCommand