const { Listener } = require('discord-akairo');
const {colors, prism} = require('../../config');
const { rgb } = require('../../functions');

class voiceStateUpdateListener extends Listener {
    constructor() {
        super('voiceStateUpdate', {
            emitter: 'client',
            event: 'voiceStateUpdate'
        });
    }

    async exec(oldState, newState) {
        try{
        const guild = oldState.guild
        const log = await this.client.channels.fetch(prism.guild.channelIDs.log);

        
        if(!guild) return;
        if(guild.id !== prism.guild.id) return;
        
        //console.log(oldState.channel.name)

        if(oldState.channel == newState.channel) return;

        if(!oldState.channel) {

            await log.send({embed: {
            
                type: 'rich',
                title: null,
                description: `${newState.member} joined a voice channel.`,
                url: null,
                color: rgb(colors.good),
                fields: [
                    {
                        name: 'Channel',
                        value: `**${newState.channel}**`
                    }
                ],
                timestamp: new Date(),
                tumbnail: null,
                image: null,
                video: null,
                author: {
                    name: newState.member.user.tag,
                    icon_url: newState.member.user.avatarURL()
                    },
                provider: null,
                footer: {
                text: `ID: ${newState.member.user.id}`
                }
    
            }})    

        } else if(!newState.channel) {

            await log.send({embed: {
            
                type: 'rich',
                title: null,
                description: `${newState.member} left a voice channel.`,
                url: null,
                color: rgb(colors.bad),
                fields: [
                    {
                        name: 'Channel',
                        value: `**${oldState.channel}**`
                    }
                ],
                timestamp: new Date(),
                tumbnail: null,
                image: null,
                video: null,
                author: {
                    name: newState.member.user.tag,
                    icon_url: newState.member.user.avatarURL
                    },
                provider: null,
                footer: {
                text: `ID: ${newState.member.user.id}`
                }
    
            }})  

        } else {

            await log.send({embed: {
            
                type: 'rich',
                title: null,
                description: `${newState.member} moved channels.`,
                url: null,
                color: rgb(colors.purple),
                fields: [
                    {
                        name: 'Old Channel',
                        value: `**${oldState.channel}**`
                    },
                    {
                        name: 'New Channel',
                        value: `**${newState.channel}**`
                    }
                ],
                timestamp: new Date(),
                tumbnail: null,
                image: null,
                video: null,
                author: {
                    name: newState.member.user.tag,
                    icon_url: newState.member.user.avatarURL
                    },
                provider: null,
                footer: {
                text: `ID: ${newState.member.user.id}`
                }
    
            }})

        }
    }catch(error){console.log(error)}
    }
}

module.exports = voiceStateUpdateListener;