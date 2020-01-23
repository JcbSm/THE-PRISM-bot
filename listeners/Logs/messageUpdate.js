const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
const moment = require('moment')
const color = require('../../datafiles/colors.json')
const Color = require('color')

class MessageUpdateListener extends Listener {
    constructor() {
        super('messageUpdate', {
            emitter: 'client',
            eventName: 'messageUpdate'
        })
    }
    
    async exec(oldMessage, newMessage) {

        const guild = oldMessage.guild
        const log = this.client.channels.get('669653850902233098');
        const time = moment(Date.now()).format('DD MMM YYYY, HH:mm')
        
        if(!guild) return;
        if(guild.id !== '447504770719154192') return;
        if(oldMessage.content === newMessage.content) return;

        function rgb(inputColor) {
            return Color(inputColor).rgbNumber()
        }

        await log.send({embed: {
            
            type: 'rich',
            title: null,
            description: `**${oldMessage.member} changed edited a message in ${oldMessage.channel}**`,
            url: null,
            color: rgb(color.purple),
            fields: [
                {
                    name: '**Before:**',
                    value: oldMessage.content
                },
                {
                    name: '**After:**',
                    value: newMessage.content
                }
            ],
            timestamp: new Date(),
            tumbnail: null,
            image: null,
            video: null,
            author: {
                name: oldMessage.member.user.tag,
                icon_url: oldMessage.member.user.avatarURL
                },
            provider: null,
            footer: {
            text: `ID: ${oldMessage.member.user.id}`
            }
        }})
    }
}

module.exports = MessageUpdateListener;