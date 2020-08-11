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
                const tChannels = await guild.channels.cache.filter(c => c.type === 'text' && c.topic && c.topic.startsWith('PRIVATE CALL'))
                let tChannel;
                
                if(!oldState.channel) {

                } else {

                    tChannel = tChannels.find(c => c.topic.split(";")[2] === oldState.channel.id)

                    if(oldState.channel !== newState.channel) {
    
                        if(tChannels.map(c => c.topic.split(";")[2]).includes(oldState.channel.id) && (await oldState.channel.members.map(m => m.id)).length == 0) {

                            if(tChannel.topic.split(";")[3] === 'true') return;
    
                            async function tenSeconds (n, end, client) {

                                if(n < end) setTimeout(async function() {

                                    if((await client.channels.fetch(oldState.channel.id)).members.size === 0 && tChannel.topic.split(";")[3] === 'false') {
                                        tenSeconds(n, end, client);
                                    }
                                    if(n === end && (await client.channels.fetch(oldState.channel.id)).members.size === 0) {
                                        await oldState.channel.delete();
                                        await tChannel.delete();
                                    }

                                }, 1000);
                    
                                console.log(n++)
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