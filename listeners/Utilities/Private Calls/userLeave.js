const { Listener } = require('discord-akairo');

class PrivateCallLeaveListener extends Listener {
    constructor() {
        super('privateCallLeave', {
            emitter: 'client',
            event: 'voiceStateUpdate'
        });
    }

    async exec(oldState, newState) {

        try{

            if(oldState.guild.id === '447504770719154192' || oldState.guild.id === '569556194612740115') {

                const guild = oldState.guild
                const pChannels = await guild.channels.cache.filter(c => c.type === 'voice' && c.name.startsWith('🔒'))

                console.log(pChannels.map(m => m.id))

                console.log((await newState.channel.members.map(m => m.id)).length)

                if(!oldState) return;

                if(oldState.channel !== newState.channel && pChannels.map(m => m.id).includes(oldState.channel.id)) {



                    if((await oldState.channel.members.map(m => m.id)).length == 0) {

                        const tChannel = await guild.channels.cache.find(c => c.type === 'text' && c.topic && c.topic.startsWith('PRIVATE CALL') && c.topic.split(';').pop() === oldState.channel.id)

                        await oldState.channel.delete()
                        await tChannel.delete()

                    }
                }
                            
            }
        
        }catch(error){console.log(error)}
    }
}

module.exports = PrivateCallLeaveListener;