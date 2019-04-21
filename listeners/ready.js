const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            eventName: 'ready'
        });
    }

    exec(message) {
        console.log(`\'${this.client.user.username}\' is Online on ${this.client.guilds.size} server(s)`);
        
        this.client.users.get("227848397447626752").send("I'm back online.");
    }
}

module.exports = ReadyListener;