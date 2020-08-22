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

        message.member.voice.channel ? message.member.voice.setDeaf(!message.member.voice.serverDeaf) : message.reply("You must join a voice channel to use this command."); 
    }
}

module.exports = DeafenCommand