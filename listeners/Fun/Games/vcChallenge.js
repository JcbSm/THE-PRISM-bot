const { Listener } = require('discord-akairo');
const { milliToTime } = require('../../../functions')
const { prism } = require('../../../config')

class VcChallengeListener extends Listener {
    constructor() {
        super('vcChallenge', {
            emitter: 'client',
            event: 'voiceStateUpdate'
        })
    }

    async exec(oldState, newState) {
    try{

        if(oldState.channel === newState.channel) return;
        
        const [ vc, tc ] = [ await this.client.channels.fetch(prism.guild.channelIDs.vcChallenge), await this.client.channels.fetch(prism.guild.channelIDs.vcChallengeText) ]
        const lastMessage = (await tc.messages.fetch( { limit: 1 } )).first()

        function leave() {

            if(lastMessage.content.startsWith(`***${newState.member}`)) {

                const time = new Date() - lastMessage.createdAt;
                if(time < 900000) return lastMessage.delete();
                tc.send(`${newState.member} left the channel after \`\`\`${milliToTime(time)}\`\`\`-`);
            }
        }

        function join() {

            if(!lastMessage.content.startsWith("***<@")) {
            
                tc.send(`***${newState.member} has joined the channel.***\n-`)
            }
        }

        if(!newState.channel && oldState.channel.id === vc.id) { leave() }
        if(!oldState.channel && newState.channel.id === vc.id) { join() }
        if(newState.channel && oldState.channel && newState.channel.id === vc.id) { join() }
        if(newState.channel && oldState.channel && oldState.channel.id === vc.id) { leave() }

    }catch(e){console.log(e)}
    }
}

module.exports = VcChallengeListener;