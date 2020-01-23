const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
const moment = require('moment')
const color = require('../../datafiles/colors.json')
const Color = require('color')

class MessageDeleteListener extends Listener {
    constructor() {
        super('messageDelete', {
            emitter: 'client',
            eventName: 'messageDelete'
        })
    }
    
    async exec(message) {

        const guild = message.guild
        const log = this.client.channels.get('669653850902233098');
        const time = moment(Date.now()).format('DD MMM YYYY, HH:mm')
        
        if(!guild) return;
        if(guild.id !== '447504770719154192') return;
        if(message.author.bot) return;

        function rgb(inputColor) {
            return Color(inputColor).rgbNumber()
        }

        await log.send({embed: {
            
            type: 'rich',
            title: null,
            description: `**${message.author}'s message was deleted in ${message.channel}**`,
            url: null,
            color: rgb(color.bad),
            fields: [
                {
                    name: 'Message',
                    value: message.content
                },
            ],
            timestamp: new Date(),
            tumbnail: null,
            image: null,
            video: null,
            author: {
                name: message.member.user.tag,
                icon_url: message.member.user.avatarURL
                },
            provider: null,
            footer: {
            text: `ID: ${message.member.user.id}`
            }

        }})
    }
}

module.exports = MessageDeleteListener;