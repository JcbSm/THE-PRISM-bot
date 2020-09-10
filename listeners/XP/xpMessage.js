const { Listener } = require('discord-akairo');
const { rng } = require('../../functions')
const { prism, xpArray, colors } = require('../../config')

class XPMessageListener extends Listener {
    constructor() {
        super('xpMessage', {
            emitter: 'client',
            event: 'message'
        })
    }

    async exec(message) {

        try{
            if(!message.guild) return;
            if(message.author.bot || message.content.startsWith(`${this.client.commandHandler.prefix}rank`) || message.guild.id !== prism.guild.id) return;

            const DB = this.client.db;

            let data = (await DB.query(`SELECT * FROM tbl_users WHERE user_id = ${message.author.id};`)).rows[0]

            if(data === undefined) {

                await DB.query(`INSERT INTO tbl_users (user_id) VALUES (${message.author.id})`, (err, res) => {

                    if(err) return console.log(err);
                    console.log(`Added ${message.author.tag} to tbl_users with user_id ${message.author.id}`)
                })
                
                data = (await DB.query(`SELECT * FROM tbl_users WHERE user_id = ${message.author.id};`)).rows[0]
            }

            await DB.query(`UPDATE tbl_users SET total_messages = total_messages + 1 WHERE user_id = ${message.author.id}`)

            if(message.createdTimestamp - data.last_message_timestamp > 60000) {

                const xpAdd = rng(7, 3)
                
                if(xpArray[data.level + 1] <= (data.xp + xpAdd)) {

                    this.client.emit('levelUp', message.member, data.level)
                    
                } else {
                }
                
                await DB.query(`UPDATE tbl_users SET
                    messages = messages + 1,
                    xp = xp + ${xpAdd},
                    last_message_timestamp = ${message.createdTimestamp}
                    WHERE user_id = ${message.author.id}
                `, (err, res) => {

                    if(err) return console.log(err)
                })
            }

        } catch(e) {console.log(e)}

    }
}

module.exports = XPMessageListener;