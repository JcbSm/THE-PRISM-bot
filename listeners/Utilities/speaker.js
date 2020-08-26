const { Listener } = require('discord-akairo');
const { prism } = require('../../config')

class SpeakerListener extends Listener {
    constructor() {
        super('speaker', {
            emitter: 'client',
            event: 'guildMemberUpdate'
        });
    }

    exec(oldMember, newMember) {

        try{

            const speakerID = prism.guild.roleIDs.speaker

            if(newMember.roles.cache.has(speakerID) && !oldMember.roles.cache.has(speakerID) && newMember.voice.channel) {

                for(const [id, member] of newMember.voice.channel.members.filter(m => !m.roles.cache.has(speakerID))) {
                    member.voice.setMute(true)
                }
            } else

            if(oldMember.roles.cache.has(speakerID) && !newMember.roles.cache.has(speakerID) && newMember.voice.channel) {

                for(const [id, member] of newMember.voice.channel.members.filter(m => m.voice.serverMute)) {
                    member.voice.setMute(false)
                }
            }

        } catch(e) {
            
            console.log(e)
        }
    }
}

module.exports = SpeakerListener;