const { Command } = require('discord-akairo');

class NickCommand extends Command {
    constructor() {
        super('nick', {
            aliases: ['nick'],
            description: {
                content: 'Changes a user\'s nickname',
                usage: 'nick <user>'
            },
            userPermissions: 'MANAGE_NICKNAMES',
            clientPermissions: 'MANAGE_NICKNAMES',
            channelRestriction: 'guild',
            args: [
                {
                    id: 'member',
                    type: 'member'
                },
                {
                    id: 'nickname',
                    type: 'string'
                }
            ],
            category: 'moderation'    
        })
    }
    
    exec(message, args) {

        if(!args.member) {
            return message.reply('Couldn\'t find that user.')
        } else {
            args.member.setNickname(args.nickname)
            .then()

                if(!args.nickname) {
                    message.channel.send(`***Reset nickname for ${args.member.user.tag}***`)
                } else {
                    message.channel.send(`***Set ${args.member.user.tag}\'s nickname to "${args.nickname}".***`)
                }
            
        }


    }
}

module.exports = NickCommand;