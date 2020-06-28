const { Command } = require('discord-akairo');
const { facts } = require('../../config');

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

        let result = Math.floor(Math.random()* facts.length);
        
        message.reply(facts[result])
    }
}

module.exports = FactCommand;