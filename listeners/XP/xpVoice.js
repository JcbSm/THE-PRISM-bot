const { Listener } = require('discord-akairo');
const { rng } = require('../../functions')
const { colors, xpArray, prism } = require('../../config')

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

                let data = (await DB.query(`SELECT voice, xp, level FROM tbl_users WHERE user_id = ${newState.member.id}`)).rows[0]

                let isVoice;

                if(data) {
                    isVoice = data.voice
                } else {

                    await DB.query(`INSERT INTO tbl_users (user_id, messages, xp, last_message_timestamp, level, voice, voice_minutes) VALUES (${newState.member.id}, 0, 0, 0, 0, false, 0)`, (err, res) => {

                        if(err) return console.log(err);
                        console.log(`Added ${newState.member.user.tag} to tbl_users with user_id ${newState.member.id}`)
                    })

                    data = (await DB.query(`SELECT voice FROM tbl_users WHERE user_id = ${newState.member.id}`)).rows[0]
                }

                if(newState.channel && !isVoice) {

                    const member = newState.member

                    await DB.query(`UPDATE tbl_users SET voice = true WHERE user_id = ${member.id}`)

                    async function addXP(client) {

                        setTimeout(async function() {

                            try{

                                if(member.voice.channel) {

                                    if(member.voice.channel.members.size > 1 && member.voice.channel.id !== afkID) {

                                        const xpAdd = rng(7,3)

                                        data = (await DB.query(`SELECT voice, xp, level FROM tbl_users WHERE user_id = ${newState.member.id}`)).rows[0]
                                        
                                        await DB.query(`UPDATE tbl_users SET xp = xp + ${xpAdd}, voice_minutes = voice_minutes + 5 WHERE user_id = ${member.id}`, async (err, res) => {

                                            if(err) return console.log(err);
                                        })
                
                                        if(xpArray[data.level + 1] <= (data.xp + xpAdd)) {
                        
                                            let level = Number(data.level) + 1;
                        
                                            (await client.channels.fetch(prism.guild.channelIDs.levelUps)).send({
                                                embed: {
                                                    title: 'LEVEL UP!',
                                                    description: `${member.user} you reached level ${level}! <:pogchamp:519201541274730496>`,
                                                    timestamp: new Date(),
                                                    footer: {
                                                        text: member.user.tag
                                                    },
                                                    color: colors.purple
                                                }
                                            })

                                            await DB.query(`UPDATE tbl_users SET level = ${level} WHERE user_id = ${member.id}`)
                                        }
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