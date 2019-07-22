const { Command } = require('discord-akairo');
const randomFact = require('../../datafiles/facts.js')

class FactCommand extends Command {
    constructor() {
        super('fact', {
            aliases: ['fact'],
            description: {
                content: 'Gives you a nice fun fact.',
                usage: 'fact'
            },
            category: 'fun'
        })
    }

    exec(message) {

        let result = Math.floor(Math.random()* randomFact.length);
        
        message.reply(randomFact[result])
    }
}

module.exports = FactCommand;