const { Command } = require('discord-akairo');

class FlipCommand extends Command {
    constructor() {
        super('flip', {
            aliases: ['flip'],
            args: [
                {
                    id: 'side',
                    type: 'string'
                }
            ],
            description: {
                content: 'Flips a coin, you can choose heads or tails, if you don\'t, it will flip it anyway.',
                usage: 'flip <side>'
            },
            category: 'utilities'
        })
    }

    exec(message, args) {

            //Generate heads or tails
            let randomNumber = Math.floor(Math.random()*2);
            let outcome;

            switch(randomNumber) {
                case 0:
                    outcome = 'heads';
                    break;
                case 1:
                    outcome = 'tails';
                    break;
            
            }

            //No side chosen
            if(!args.side) {
                return message.reply(`You flipped ${outcome}.`);

            //If they guess correctly
            } else if(args.side == outcome) {
                return message.reply(`You flipped ${outcome}, congratulations!`)

            //If they don't guess correctly
            } else if(args.side !== outcome) {
                return message.reply(`You flipped ${outcome}, unlucky...`)
            }
        
    };
}

module.exports = FlipCommand