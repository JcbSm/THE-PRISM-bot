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

            if(oldState.guild.id === '447504770719154192' || oldState.guild.id === '742026925156860026') {

                const guild = oldState.guild
                const pChannels = await guild.channels.cache.filter(c => c.type === 'voice' && c.name.startsWith('🔒'))
                let tChannel;
                
                if(!oldState.channel) {

                } else {

                    tChannel = await guild.channels.cache.find(c => c.type === 'text' && c.topic && c.topic.startsWith('PRIVATE CALL') && c.topic.split(';').pop() === oldState.channel.id)
    
                    if(oldState.channel !== newState.channel) {
    
                        if(pChannels.map(m => m.id).includes(oldState.channel.id) && (await oldState.channel.members.map(m => m.id)).length == 0) {
    
                            async function tenSeconds (n, end, client) {

                                if(n < end) setTimeout(async function() {

                                    if((await client.channels.fetch(oldState.channel.id)).members.size === 0) {
                                        tenSeconds(n, end, client);
                                    }
                                    if(n === end && (await client.channels.fetch(oldState.channel.id)).members.size === 0) {
                                        await oldState.channel.delete();
                                        await tChannel.delete();
                                    }

                                }, 1000);
                    
                                n++;
                            };

                            tenSeconds(0, 60, this.client)
    
                        }
                    }
                }           
            }
        
        } catch(error) {console.log(error)}
    }
}

module.exports = PrivateCallLeaveListener;