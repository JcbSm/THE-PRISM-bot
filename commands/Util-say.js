const { Command } = require('discord-akairo');

class SayCommand extends Command {
    constructor() {
        super('say', {
            aliases: ['say'],
            description: {
                content: 'Says a command in a channel, if no channel is specified, it will say it in the current channel. If your message is more than one word, you need to enclose it in quotation marks.',
                usage: 'say <message> <channel>'
            },
            args: [
                {
                    id: 'message',
                },
                {
                    id: 'channel',
                    type: 'channelMention'
                }
            ],
            split: 'quoted',
            userPermissions: 'ADMINISTRATOR',
            category: 'utilities'
        })
    }

    exec(message, args) {

        if(!args.channel) {
            return message.channel.send(args.message)
        }
        args.channel.send(args.message).then(
            message.react('👌')
        )
        
    }
}

module.exports = SayCommand;