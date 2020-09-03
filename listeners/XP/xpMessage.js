const { Listener } = require('discord-akairo');
const { rng } = require('../../functions')
const { prism, xpArray } = require('../../config')

class XPMessageListener extends Listener {
    constructor() {
        super('xpMessage', {
            emitter: 'client',
            event: 'message'
        })
    }

    async exec(message) {

        try{

            if(message.author.bot || message.content.startsWith(`${this.client.commandHandler.prefix}rank`)) return;

            const DB = this.client.db;

            let data = (await DB.query(`SELECT * FROM tbl_users WHERE user_id = ${message.author.id};`)).rows[0]

            if(data === undefined) {

                await DB.query(`INSERT INTO tbl_users (user_id, messages, xp, last_message_timestamp, level) VALUES (${message.author.id}, 0, 0, ${Number(message.createdTimestamp)}, 0)`, (err, res) => {

                    if(err) return console.log(err);
                    console.log(`Added ${message.author.tag} to tbl_users with user_id ${message.author.id}`)
                })
                
                data = (await DB.query(`SELECT * FROM tbl_users WHERE user_id = ${message.author.id};`)).rows[0]
            }

            if(message.createdTimestamp - data.last_message_timestamp > 60000) {

                const xpAdd = rng(3, 7)
                let level;
                
                if(xpArray[data.level + 1] <= (data.xp + xpAdd)) {

                    level = data.level + 1;

                    (await this.client.channels.fetch(prism.guild.channelIDs.levelUps)).send(`${message.member}, you just reached level ${level}`)
                } else {
                    level = data.level
                }
                
                await DB.query(`UPDATE tbl_users SET
                    messages = messages + 1,
                    xp = xp + ${xpAdd},
                    last_message_timestamp = ${message.createdTimestamp},
                    level = ${level}
                    WHERE user_id = ${message.author.id}
                `, (err, res) => {

                    if(err) return console.log(err)
                })
            }

        } catch(e) {console.log(e)}

    }
}

module.exports = XPMessageListener;