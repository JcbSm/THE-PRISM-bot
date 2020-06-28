const { Command } = require('discord-akairo');
const { linkToMessage } = require('../functions')

class TestCommand extends Command {
    constructor() {
        super('debug', {
            aliases: ['debug', 'kick'],
            args: [
                {
                    id: 'link',
                    type: 'string'
                }
            ]
        })
    }

    async exec(message, args) {

        message.reply((await linkToMessage(args.link, this.client)).author.tag)
    }
}

module.exports = TestCommand