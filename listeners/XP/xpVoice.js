const { Listener } = require('discord-akairo');
const { rng } = require('../../functions')

class XPVoiceListener extends Listener {
    constructor() {
        super('xpVoice', {
            emitter: 'client',
            event: 'voiceStateUpdate'
        })
    }

    async exec(oldState, newState) {

        try{
            const DB = this.client.db;

            if(!newState.channel) {

            } else {

                const newID = newState.channel.id;
                const afkID = '751190740725661748'

                if(newID === afkID) return;

                const isVoice = (await DB.query(`SELECT voice FROM tbl_users WHERE user_id = ${newState.member.id}`)).rows[0].voice

                if(newState.channel && !isVoice) {

                    const member = newState.member

                    await DB.query(`UPDATE tbl_users SET voice = true WHERE user_id = ${member.id}`)

                    async function addXP(client) {

                        setTimeout(async function() {

                            try{

                                if(member.voice.channel) {

                                    if(member.voice.channel.members.size > 1 && member.voice.channel.id !== afkID) {

                                        const xpAdd = rng(7,3)
                                        
                                        DB.query(`UPDATE tbl_users SET xp = xp WHERE user_id = ${member.id}`, async (err, res) => {

                                            if(err) return console.log(err);
                                        })
                                    }

                                    addXP(client)

                                } else {

                                    await DB.query(`UPDATE tbl_users SET voice = false WHERE user_id = ${member.id}`)
                                }

                            } catch(e) {console.log(e)}

                        }, 300000)
                    }

                    addXP(this.client)
                }
            }

        } catch(e) {console.log(e)}
    }
}

module.exports = XPVoiceListener;