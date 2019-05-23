const { Command } = require('discord-akairo');

class SpamCommand extends Command {
    constructor() {
        super('spam', {
            aliases: ['spam'],
            description: {
                content: 'spams a user',
                usage: 'spam'
            },
            args: [
                {
                    id: 'member',
                    type: 'member'
                },
                {
                    id: 'amount',
                    type: 'number'
                },
                {
                    id: 'message',
                    match: 'rest'
                }
            ]
        });
    }

    exec(message, args) {

        if(message.author.id !== '227848397447626752') return message.reply('This command is only for Jacob#5491 to use.')

        if(args.amount > 50) return message.reply('Too many, max 50.')
        
        try{
            for(let i = 0; i < args.amount; i++) {
                message.channel.send(`<@${args.member.id}> ${args.message}`)
                message.delete()
            }
        }catch(err){
            console.log(err)
        }

    }
}

module.exports = SpamCommand;