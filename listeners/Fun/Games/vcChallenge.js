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
        return;
        if(oldState.channel === newState.channel) return;
        
        const [ vc, tc ] = [ await this.client.channels.fetch(prism.guild.channelIDs.vcChallenge), await this.client.channels.fetch(prism.guild.channelIDs.vcChallengeText) ]
        const lastMessage = (await tc.messages.fetch( { limit: 1 } )).first()

        function leave() {

            if(lastMessage.content.startsWith(`***${newState.member}`)) {

                const time = new Date() - lastMessage.createdAt;
                if(time < 900000) return lastMessage.delete();
                else return tc.send(`${newState.member} left the channel after \`\`\`${milliToTime(time)}\`\`\`-`);
            }
        }

        function join() {

            if(!lastMessage.content.startsWith("***<@")) {
            
                return tc.send(`***${newState.member} has joined the channel.***\n-`)
            }
        }

        if( (!newState.channel && oldState.channelID === vc.id) || (newState.channel && oldState.channel && oldState.channelID === vc.id) ) return leave();
        else if( (!oldState.channel && newState.channelID === vc.id) || (newState.channel && oldState.channel && newState.channelID === vc.id) ) return join();

    }catch(e){console.log(e)}
    }
}

module.exports = VcChallengeListener;