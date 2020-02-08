const { Command } = require('discord-akairo');

class DeafenCommand extends Command {
    constructor() {
        super('deafen', {
            aliases: ['deafen', 'deafenMe'],
            description: {
                content: 'either deafens or undeafens the user, while still allowing them to speak.',
                usage: 'deafen'
            }
        })
    }
    exec(message) {

        if(!message.member.voiceChannel) return message.reply("You must join a voice channel to use this command.")

        let deaf = message.member.serverDeaf;

        if(deaf) {
            message.member.setDeaf(false)
        } else if(!deaf) {
            message.member.setDeaf(true)
        }

    }
}

module.exports = DeafenCommand