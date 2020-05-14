const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const color = require('../../../datafiles/colors.json');

class PrivateCallDeleteCommand extends Command {
    constructor() {
        super('endCall', {
            aliases: ['endCall'],
            description: {
                content: 'Delete a private voice channel',
                usage: 'endCall'
            },
            category: 'utilities',
        })
    }

    async exec(message, args) {
        try{        
        
        if(message.guild.id === '447504770719154192') {

            const guild = message.guild

            if(message.channel.topic.split(';').shift() !== 'PRIVATE CALL') return;
            if(message.channel.topic.split(';').shift() === 'PRIVATE CALL') {
                const voiceChannel = message.guild.channels.get(message.channel.topic.split(';').pop())
                await voiceChannel.delete()
                await message.channel.delete()
            }

        }
    
    }catch(error){console.log(error)}

    }
}

module.exports = PrivateCallDeleteCommand