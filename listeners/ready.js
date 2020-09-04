const { Listener } = require('discord-akairo');
const { colors, prism } = require('../config')
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

            console.log(`\x1b[1m[ \x1b[35m${this.client.user.username} is Online \x1b[37m]\x1b[0m`);

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

            //Restart VoiceXP

            const DB = this.client.db;

            await DB.query(`UPDATE tbl_users SET voice = false`)

            const guild = await this.client.guilds.fetch(prism.guild.id);
            const voiceChannels = guild.channels.cache.filter(c => c.type === 'voice');

            for(const [id, channel] of voiceChannels) {
                for(const [id, member] of channel.members) {

                    this.client.emit('voiceStateUpdate', member.voice, member.voice)
                }
            }

        }catch(e){console.log(e)}
    }
}

module.exports = ReadyListener;