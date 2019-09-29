const { Listener } = require('discord-akairo');
const prismRoles = require('../datafiles/roles')

class SpeakerListener extends Listener {
    constructor() {
        super('speaker', {
            emitter: 'client',
            eventName: 'guildMemberUpdate'
        });
    }

    exec(oldMember, newMember) {

        if(!oldMember.roles.has('627829247339266048') && newMember.roles.has('627829247339266048')) {

            if(!newMember.voiceChannel) return;

            let voiceMembers = newMember.voiceChannel.members

            let voiceMembersFiltered = voiceMembers.filter(u => !u.roles.has('627829247339266048'))

            for(let i = 0; i < voiceMembersFiltered.keyArray().length; i++) {
                try {
                    voiceMembersFiltered.get(voiceMembersFiltered.keyArray()[i]).setMute(true)
                } catch (error) {
                    console.log(error)
                }
    
            }
            
        } else if(oldMember.roles.has('627829247339266048') && !newMember.roles.has('627829247339266048')) {

            if(!newMember.voiceChannel) return;

            let mutedMembers = this.client.guilds.get('447504770719154192').members.filter(m => m.serverMute)

            for(let i = 0; i < mutedMembers.keyArray().length; i++) {
                try {
                    mutedMembers.get(mutedMembers.keyArray()[i]).setMute(false)
                } catch (error) {
                    console.log(error)
                }
    
            }
        }
    }
}

module.exports = SpeakerListener;