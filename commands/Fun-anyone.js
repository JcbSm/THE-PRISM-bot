const { Command } = require('discord-akairo');
const Discord = require('discord.js')
const config = require('../config.json')

class AnyoneCommand extends Command {
    constructor() {
        super('anyone', {
            aliases: ['anyone'],
            channelRestriction: 'guild',
            prefix: `Hey prism bot, tag`
        })
    }

    exec(message) {

        let randomMember = message.guild.members.random()
        let stringTwo = ['Hi..', 'You have been summoned!', 'Ping!', 'You there..', 'Hellooo', 'Is this annoying?', 'You didnt get an actual message, it\'s just me.', 'pranked ;)', 'noob', 'Hey there sweet sutff ;)']
        let response = Math.floor(Math.random()*stringTwo.length)

    message.channel.send(`${randomMember.user}, ${stringTwo[response]}`)
    }
}

module.exports = AnyoneCommand