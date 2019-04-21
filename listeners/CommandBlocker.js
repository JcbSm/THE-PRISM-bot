const { Listener } = require('discord-akairo');

class CommandBlockedListener extends Listener {
    constructor() {
        super('commandBlocked', {
            emitter: 'commandHandler',
            eventName: 'commandBlocked'
        })
    }

    exec(message, command, reason) {
        console.log(`${message.author.tag} was blocked form using \'${command.id}\' because of \'${reason}\'!`)
        message.channel.send(`${message.author}, you don\'t have permission to use that command.`)
        .then(msg => {
            msg.delete(5000)
        })
    };
};

module.exports = CommandBlockedListener;