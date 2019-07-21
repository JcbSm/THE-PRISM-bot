const { Command } = require('discord-akairo');

class NicknameCommand extends Command {
    constructor() {
        super('nickname', {
            aliases: ['nickname'],
            ownerOnly: false,
            channelRestriction: 'guild',
            description: {
                content: 'Returns your nickname (very pointless, yes)',
                usage: 'nickname'
            },
            category: 'utilities'
        });
    };

    exec(message) {
        if(message.author.nickname) {
            
            return message.reply(`Your nickname is ${message.author.nickname}.`);
        } else {
            
            //If user has no nickname
            return message.reply(`Why did you even do this command, you don't have a nickname...? It's useless anyway, you can just look at your name.`)
        }
    }
}

module.exports = NicknameCommand