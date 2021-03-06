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
            
            const sent = await (await this.client.users.fetch(this.client.ownerID)).send({embed: {

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

            sent.react('597841926451888130')

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

            //Restart Temp Mutes

            const mutedArr = (await DB.query(`SELECT user_id, temp_mute_timestamp FROM tbl_users WHERE temp_mute_timestamp IS NOT NULL`)).rows
            mutedArr.forEach(async row => {
                const member = await guild.members.fetch(row.user_id)
                this.client.emit('tempMute', member, row.temp_mute_timestamp)
            })

            //Cache tbl_users

            const idArr = (await DB.query(`SELECT user_id FROM tbl_users`)).rows
            
            for(let i = 0; i < idArr.length; i++) {
                if(i === 0) {
                    console.log("Caching tbl_users...")
                    this.client.caching = true
                }
                await this.client.users.fetch(idArr[i].user_id)
                if(i+1 === idArr.length) {
                    console.log("Done!")
                    this.client.caching = false
                }
            }

        }catch(e){console.log(e)}
    }
}

module.exports = ReadyListener;