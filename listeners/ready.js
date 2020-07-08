const { Listener } = require('discord-akairo');
const { colors } = require('../config')
const { getTime } = require('../functions')

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    async exec() {

        console.log(`${this.client.user.username} is Online`);

        const readyEmbed = {
            type: 'rich',
            title: `**Online**`,
            description: `\`[${getTime()}]\` Client Ready!`,
            fields: [
                {
                    name: 'Test Mode',
                    value: this.client.testing
                }
            ],
            timestamp: new Date()
        }
        if(this.client.testing) readyEmbed.color = colors.test;
        if(!this.client.testing) readyEmbed.color = colors.good;
        
        (await this.client.users.fetch(this.client.ownerID)).send({embed: readyEmbed});

        this.client.user.setPresence({ activity: { name: '▲', type: 'WATCHING'}, status: 'dnd'})
    }
}

module.exports = ReadyListener;