const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping']
        });
    }

    exec(message) {
        return message.reply('Pong!').then(sent => {
            const timeDiff = (sent.editedAt || sent.createdAt) - (message.editedAt || message.createdAt);
            const text = `\`${timeDiff} ms\``;
            return sent.edit(`${sent} ${text}`);
        });
    }
}

module.exports = PingCommand;