const { Listener } = require('discord-akairo');
const Discord = require('discord.js');
const config = require('../../config')
const { rgb } = require('../../functions')

class CountingFailsListener extends Listener {
    constructor() {
        super('countingFails', {
            emitter: 'client',
            event: 'messageDelete'
        })
    }

    async exec(message) {

        const re = /[0-9]+$/

        if(message.channel.id == '583742663627505669' && message.content.match(re)) {

            (await this.client.channels.fetch('628307976981053476')).send({embed: {
            
                type: 'rich',
                title: '**Failed Count:**',
                description: message.content,
                url: null,
                color: rgb(config.colors.purple),
                fields: [],
                timestamp: new Date(),
                tumbnail: null,
                image: null,
                video: null,
                author: {
                    name: message.member.user.tag,
                    icon_url: message.member.user.avatarURL()
                    },
                provider: null,
                footer: {
                text: `ID: ${message.member.user.id}`
                }
    
            }})
        }
    }
}

module.exports = CountingFailsListener;