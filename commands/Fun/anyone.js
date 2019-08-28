const { Command } = require('discord-akairo');
const Discord = require('discord.js')

class AnyoneCommand extends Command {
    constructor() {
        super('anyone', {
            aliases: ['anyone'],
            channelRestriction: 'guild',
            prefix: `Hey prism bot, tag`,
            description: {
                content: 'Tags a random server member',
                usage: 'anyone (just kidding, it\'s a secret'
            },
            category: 'fun'
        })
    }

    exec(message) {

        if(message.author.id !== 227848397447626752) return message.reply("Only our true leader can use this command...")

        //Filter COllection to remove bot
        let membersFiltered = message.guild.members.filter(tag => tag.id !== this.client.user.id) 

        //Select random member
        let randomMember = membersFiltered.random()

        //Select radnom message
        let responses = ['Hi..', 'You have been summoned!', 'Ping!', 'You there..', 'Hellooo', 'Is this annoying?', 'You didnt get an actual message, it\'s just me.', 'pranked ;)', 'noob', 'Hey there sweet sutff ;)']
        let rng = Math.floor(Math.random()*responses.length)

    message.channel.send(`${randomMember.user}, ${responses[rng]}`)
    }
}

module.exports = AnyoneCommand