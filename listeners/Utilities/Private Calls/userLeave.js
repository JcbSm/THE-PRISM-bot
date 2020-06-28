const { Listener } = require('discord-akairo');

class PrivateCallLeaveListener extends Listener {
    constructor() {
        super('privateCallLeave', {
            emitter: 'client',
            event: 'voiceStateUpdate'
        });
    }

    async exec(oldMember, newMember) {

        try{

            if(oldMember.guild.id === '447504770719154192' || oldMember.guild.id === '569556194612740115') {

                const guild = oldMember.guild
                const pChannels = await guild.channels.cache.filter(c => c.type === 'voice' && c.name.startsWith('🔒'))

                //console.log(pChannels.map(m => m.id))

                //console.log((await newMember.voiceChannel.members.map(m => m.id)).length)

                if(!oldMember.voiceChannel) return;

                if(oldMember.voiceChannel !== newMember.voiceChannel && pChannels.map(m => m.id).includes(oldMember.voiceChannel.id)) {



                    if((await oldMember.voiceChannel.members.map(m => m.id)).length == 0) {

                        const tChannel = await guild.channels.find(c => c.type === 'text' && c.topic && c.topic.startsWith('PRIVATE CALL') && c.topic.split(';').pop() === oldMember.voiceChannel.id)

                        await oldMember.voiceChannel.delete()
                        await tChannel.delete()

                    }
                }
                            
            }
        
        }catch(error){console.log(error)}
    }
}

module.exports = PrivateCallLeaveListener;