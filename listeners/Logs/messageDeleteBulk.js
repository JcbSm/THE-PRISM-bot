const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
const moment = require('moment')
const color = require('../../datafiles/colors.json')
const Color = require('color')

class MessageDeleteBulkListener extends Listener {
    constructor() {
        super('messageDeleteBulk', {
            emitter: 'client',
            eventName: 'messageDeleteBulk'
        })
    }
    
    async exec(messages) {

        const message = messages.first()
        const guild = message.guild
        const log = this.client.channels.get('669653850902233098');
        const time = moment(Date.now()).format('DD MMM YYYY, HH:mm')
    

        if(!guild) return;
        if(guild.id !== '447504770719154192') return;



        function rgb(inputColor) {
            return Color(inputColor).rgbNumber()
        }



        await log.send({embed: {
            
            type: 'rich',
            title: null,
            description: `**Bulk delete in ${message.channel}**`,
            url: null,
            color: rgb(color.bad),
            fields: [],
            timestamp: new Date(),
            tumbnail: null,
            image: null,
            video: null,
            author: {},
            provider: null,
            footer: {
            text: ``
            }

        }})
    }
}

module.exports = MessageDeleteBulkListener;