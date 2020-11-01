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

    async exec(m, t) {

        console.log(`Counting tempmute for ${m.user.tag}`)

        async function checkMute(client, member, interval) {

        try{
            const timestamp = Number((await client.db.query(`SELECT temp_mute_timestamp FROM tbl_users WHERE user_id = ${member.id}`)).rows[0].temp_mute_timestamp)

            if(!timestamp) return console.log(`Cancelling due to ${member.user.tag} being unmuted`);

            setTimeout(async function() {

                if(Math.floor(timestamp/interval) > Math.floor(Date.now()/interval)) {

                    if(!member.roles.cache.has(prism.guild.roleIDs.muted)) {
                        member.roles.add(prism.guild.roleIDs.muted)
                    }

                } else if(Math.floor(timestamp/interval) <= Math.floor(Date.now()/interval)) {

                    if(member.roles.cache.has(prism.guild.roleIDs.muted)) {
                        member.roles.remove(prism.guild.roleIDs.muted);
                        member.user.send({embed: {
                            description: `You're now unmuted in ${member.guild.name}`,
                            timestamp: Date.now()
                        }})
                        await client.db.query(`UPDATE tbl_users SET temp_mute_timestamp = null WHERE user_id = ${member.id}`)
                    }
                }

                checkMute(client, member, interval)

            }, interval)
        }catch(e){console.log(e)}
        }

        checkMute(this.client, m, 60000)
    }
}

module.exports = TempMuteListener