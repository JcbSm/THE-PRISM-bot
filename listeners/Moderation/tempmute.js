const { Listener } = require('discord-akairo');
const { repeat } = require('../../functions');
const { prism } = require('../../config')

class TempMuteListener extends Listener {
    constructor() {
        super('tempMute', {
            event: 'tempMute',
            emitter: 'client'
        })
    }

    async exec(member, timestamp) {

        console.log(`Counting tempmute for ${member.user.tag}`)

        const DB = this.client.db

        const func = function checkMute() {

            if(Math.floor(timestamp/60000) > Math.floor(Date.now()/60000)) {

                if(!member.roles.cache.has(prism.guild.roleIDs.muted)) {
                    member.roles.add(prism.guild.roleIDs.muted)
                }
            } else if(Math.floor(timestamp/60000) <= Math.floor(Date.now()/60000)) {

                if(member.roles.cache.has(prism.guild.roleIDs.muted)) {
                    member.roles.remove(prism.guild.roleIDs.muted);
                    member.user.send({embed: {
                        description: `You're now unmuted in ${member.guild.name}`,
                        timestamp: Date.now()
                    }})
                    DB.query(`UPDATE tbl_users SET temp_mute_timestamp = null WHERE user_id = ${member.id}`)
                }
            }
        }
        try{
        repeat(func, 60000, (timestamp-Date.now())/(1000*60)+1)
        }catch(e){console.log(e)}
    }
}

module.exports = TempMuteListener