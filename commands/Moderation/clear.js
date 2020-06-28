const { Command } = require('discord-akairo');

class ClearCommand extends Command {
    constructor() {
        super('clear', {
            aliases: ['clear'],
            channelRestriction: 'guild',
            userPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    id: 'amount',
                    type: 'number'
                }
            ],
            description: {
                content: 'Bulk deletes messages. *requires \'manage messages\' permission*',
                usage: 'clear <amount>'
            },
            category: 'moderation'
        });
    }

    exec(message, args) {

        //Check if stated amount
        if(!args.amount) {
            return message.reply('Please specity how many messages you\'d like to clead')

        //Check amount is positive
        } else if(args.number < 0) {
            return message.reply('I can only clear between 1 and 99 messages.')
        
        //Check amount is >= 100
        } else if(args.amount > 99) {
            return message.reply('I can only clear between 1 and 99 messages.')

        //Check for integer
        } else if(!Number.isInteger(args.amount)) {
            return message.reply('The number of messages you want to clear must be an integer.')

        //Delete given amount
        } else {
            return message.channel.bulkDelete(args.amount + 1)
                .then(message.channel.send(`***Successfully removed ${args.amount} messages.***`)
                .then(msg => {
                    msg.delete({ timeout: 5000 })
                })
            )
        }
    }
}

module.exports = ClearCommand;