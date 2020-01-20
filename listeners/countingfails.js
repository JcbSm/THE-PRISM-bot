const { Listener } = require('discord-akairo');
const Discord = require('discord.js');
const color = require('../datafiles/colors.json')

class CountingFailsListener extends Listener {
    constructor() {
        super('countingFails', {
            emitter: 'client',
            eventName: 'messageDelete'
        })
    }

    exec(message) {

        const re = /[0-9]+$/

        if(message.channel.id == '583742663627505669' && message.content.match(re)) {

            this.client.channels.get('628307976981053476').send(
                new Discord.RichEmbed()
                    .setColor(color.purple)
                    .setTitle('**Failed Count:**')
                    .setDescription(`${message.content}`)
                    .setAuthor(message.author.tag, message.author.avatarURL)
            )
        }
    }
}

module.exports = CountingFailsListener;