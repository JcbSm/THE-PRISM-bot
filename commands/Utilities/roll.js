const { Command } = require('discord-akairo');

class RollCommand extends Command {
    constructor() {
        super('roll', {
            aliases: ['roll'],
            args: [
                {
                    id: 'num',
                    type: 'number',
                    default: 6,
                }

            ],
            description: {
                content: 'Rolls a dice',
                usage: 'roll <max>'
            },
            category: 'utilities'
        })
    }

    exec(message, args) {

        //Check number is integer greater than 1
        if(args.num >= 1 && Number.isInteger(args.num)) {
            let rolledNumber = Math.floor(Math.random()*args.num + 1);

            //Output
            return message.reply(`Rolled a ${rolledNumber}. :game_die:`)
        } else {

            //Output if they chose a number less than 0.
            let replies = ['Seriously?', 'Are you taking the piss?', 'You must be stupid...', 'No.. just no...', '...', '...Why??', 'You really like to cause issues, don\'t you.'];
            let result = Math.floor(Math.random()* replies.length);
            
            return message.reply(replies[result])
        }
    }
}

module.exports = RollCommand;