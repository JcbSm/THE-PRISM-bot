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
                    type: 'string',
                    match: 'rest'
                }
            ],
            category: 'moderation'    
        })
    }
    
    exec(message, args) {

        if(!args.member) {
            return message.reply('Couldn\'t find that user.')
        } else {

            let oldName = args.member.nickname

            args.member.setNickname(args.nickname)
            .then()

                if(!args.nickname) {
                    if(oldName == null) return message.reply('They don\'t have a nickname.')
                    message.channel.send(`***Reset nickname for ${args.member.user.tag}, they are "${oldName}" no more.***`)
                    
                } else {
                    message.channel.send(`***Set ${args.member.user.tag}\'s nickname to "${args.nickname}", they are "${oldName}" no more.***`)
                }
            
        }


    }
}

module.exports = NickCommand;