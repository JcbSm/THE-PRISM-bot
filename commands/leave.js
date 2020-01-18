const { Command } = require('discord-akairo');

class LeaveCommand extends Command {
    constructor() {
        super('leave', {
            aliases: ['leave'],
            description: {
                content: 'leave the voice channel',
                usage: 'leave'
            },
            channelRestriction: 'guild'
        })
    }

    async exec(message) {

        message.member.voiceChannel.leave()
    }
}

module.exports = LeaveCommand