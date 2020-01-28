const { Command } = require('discord-akairo');

class JoinCommand extends Command {
    constructor() {
        super('join', {
            aliases: ['join'],
            description: {
                content: 'Join the voice channel',
                usage: 'join'
            },
            channelRestriction: 'guild'
        })
    }

    async exec(message) {

        if(!message.member.voiceChannelID) return message.reply('You\'re not in a voice channel.')

        if(message.guild.voiceConnection) {

            message.reply('I\'m already connected somewhere else.')
        } else {

            message.member.voiceChannel.join().then(connection => {
                messeage.react('👌')
                const dispatcher = connection.playFile('../assets/audio/Clicks an that.mp3')
                dispatcher.on("end", end => voiceChannel.leave())
            })
            .catch(console.error)

        }
    }
}

module.exports = JoinCommand