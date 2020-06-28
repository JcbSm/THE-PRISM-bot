const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    async exec() {

        const client = this.client;

        console.log(`${client.user.username} is Online`);
        
        (await client.users.fetch(client.ownerID)).send({embed: {
            type: 'rich',
            title: 'Online',
            timestamp: new Date()
        }});

        client.user.setPresence({ activity: { name: '▲', type: 'WATCHING'}, status: 'dnd'})
    }
}

module.exports = ReadyListener;