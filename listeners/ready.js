const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            eventName: 'ready'
        });
    }

    exec() {
        console.log(`\'${this.client.user.username}\' is Online on ${this.client.guilds.size} server(s)`);
        
    }
}

module.exports = ReadyListener;