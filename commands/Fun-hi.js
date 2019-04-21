const { Command } = require('discord-akairo');

class HiCommand extends Command {
    constructor() {
        super('hi', {
            aliases: ['hi', 'hello']
        })
    }

    exec(message) {
        
        message.reply('Hi')
    }
}

module.exports = HiCommand;