const { Command } = require('discord-akairo');

class DeafenCommand extends Command {
    constructor() {
        super('deafen', {
            aliases: ['deafen', 'deafenMe'],
            description: {
                content: 'either deafens or undeafens the user, while still allowing them to speak.',
                usage: 'deafen'
            },
            category: 'utilities'
        })
    }
    exec(message) {

        if(!message.member.voice) return message.reply("You must join a voice channel to use this command.")

        let deaf = message.member.voice.serverDeaf;

        if(deaf) {
            message.member.voice.setDeaf(false)
        } else if(!deaf) {
            message.member.voice.setDeaf(true)
        }

    }
}

module.exports = DeafenCommand