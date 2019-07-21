const { Command } = require('discord-akairo');

class HelloCommand extends Command {
    constructor() {
        super('hello', {
            trigger: /^helll*oo*o$/i
        });
    }

    exec(message, match, groups) {

        if(message.guild.id !== '447504770719154192') return;
        message.react(this.client.emojis.get('453964150385672203'));
    }
}

module.exports = HelloCommand