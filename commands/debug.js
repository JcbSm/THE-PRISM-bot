const { Command } = require('discord-akairo');
const { rgb } = require('../functions')

class TestCommand extends Command {
    constructor() {
        super('debug', {
            aliases: ['debug'],
            args: [
                {
                    id: 'member',
                    type: 'member'
                }
            ]
        })
    }

    async exec(message, args) {

        console.log("test")

        console.log(rgb('red'))
    }
}

module.exports = TestCommand