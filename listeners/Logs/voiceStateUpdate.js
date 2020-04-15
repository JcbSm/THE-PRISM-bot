const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
const color = require('../../datafiles/colors.json')
const bans = require('../../datafiles/softBans')
const moment = require('moment')
const Color = require('color')

class voiceStateUpdateListener extends Listener {
    constructor() {
        super('voiceStateUpdate', {
            emitter: 'client',
            eventName: 'voiceStateUpdate'
        });
    }

    async exec(oldMember, newMember) {
        try{
        const guild = oldMember.guild
        const log = this.client.channels.get('669653850902233098');
        const time = moment(Date.now()).format('DD MMM YYYY, HH:mm')
        
        if(!guild) return;
        if(guild.id !== '447504770719154192') return;
        
        function rgb(inputColor) {
            return Color(inputColor).rgbNumber()
        }

        //Softban
        if(newMember.voiceChannel) {

            if(bans.map(u => u.id).includes(newMember.id)) {

                await newMember.setMute(true)
                
            }
        }

        if(oldMember.voiceChannel == newMember.voiceChannel) return;

        if(!oldMember.voiceChannel) {

            await log.send({embed: {
            
                type: 'rich',
                title: null,
                description: `${newMember} joined a voice channel.`,
                url: null,
                color: rgb(color.good),
                fields: [
                    {
                        name: 'Channel',
                        value: `**${newMember.voiceChannel}**`
                    }
                ],
                timestamp: new Date(),
                tumbnail: null,
                image: null,
                video: null,
                author: {
                    name: newMember.user.tag,
                    icon_url: newMember.user.avatarURL
                    },
                provider: null,
                footer: {
                text: `ID: ${newMember.user.id}`
                }
    
            }})    

        } else if(!newMember.voiceChannel) {

            await log.send({embed: {
            
                type: 'rich',
                title: null,
                description: `${newMember} left a voice channel.`,
                url: null,
                color: rgb(color.bad),
                fields: [
                    {
                        name: 'Channel',
                        value: `**${oldMember.voiceChannel}**`
                    }
                ],
                timestamp: new Date(),
                tumbnail: null,
                image: null,
                video: null,
                author: {
                    name: newMember.user.tag,
                    icon_url: newMember.user.avatarURL
                    },
                provider: null,
                footer: {
                text: `ID: ${newMember.user.id}`
                }
    
            }})  

        } else {

            await log.send({embed: {
            
                type: 'rich',
                title: null,
                description: `${newMember} moved channels.`,
                url: null,
                color: rgb(color.purple),
                fields: [
                    {
                        name: 'Old Channel',
                        value: `**${oldMember.voiceChannel}**`
                    },
                    {
                        name: 'New Channel',
                        value: `**${newMember.voiceChannel}**`
                    }
                ],
                timestamp: new Date(),
                tumbnail: null,
                image: null,
                video: null,
                author: {
                    name: newMember.user.tag,
                    icon_url: newMember.user.avatarURL
                    },
                provider: null,
                footer: {
                text: `ID: ${newMember.user.id}`
                }
    
            }})

        }
    }catch(error){console.log(error)}
    }
}

module.exports = voiceStateUpdateListener;