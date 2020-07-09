const { Listener } = require('discord-akairo');
const { colors } = require('../config')
const { getUTCTime } = require('../functions')

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
            title: `Online`,
            description: `\`[${getUTCTime(this.client.readyAt)} UTC]\`\nClient Ready`,
            fields: [],
            timestamp: new Date()
        }
        if(this.client.testing) {

            readyEmbed.color = colors.test;
            readyEmbed.fields.push({name: 'Test mode', value: 'enabled'})
        }
        if(!this.client.testing) readyEmbed.color = colors.good;
        
        (await this.client.users.fetch(this.client.ownerID)).send({embed: readyEmbed});

        this.client.user.setPresence({ activity: { name: '▲', type: 'WATCHING'}, status: 'dnd'})
    }
}

module.exports = ReadyListener;