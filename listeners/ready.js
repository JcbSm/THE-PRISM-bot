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
        try{

        console.log(`${this.client.user.username} is Online`);

        const color = this.client.testing ? colors.test : colors.good;

        let [configArray, valuesArray] = [[], []];

        configArray = [
            'Testing',
            'Commands',
            'Listeners'
        ];
        valuesArray = [
            this.client.testing,
            this.client.commandHandler.modules.size,
            this.client.listenerHandler.modules.size
        ];
        
        (await this.client.users.fetch(this.client.ownerID)).send({embed: {

            type: 'rich',
            title: 'Online',
            description: `\`[${getUTCTime(this.client.readyAt)} UTC]\``,
            color: color,
            fields: [
                {
                    name: 'Config',
                    value: `- ${configArray.join("\n - ")}`,
                    inline: true
                },
                {
                    name: '-',
                    value: `- ${valuesArray.join("\n - ")}`,
                    inline: true
                }
            ],
            timestamp: new Date()
        }});

        this.client.user.setPresence({ activity: { name: '▲', type: 'WATCHING'}, status: 'dnd'})
    }catch(e){console.log(e)}
    }
}

module.exports = ReadyListener;