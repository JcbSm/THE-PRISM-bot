const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const color = require('../../../datafiles/colors.json');

class ToggleViewCommand extends Command {
    constructor() {
        super('toggleView', {
            aliases: ['toggleView'],
            description: {
                content: 'Toggles whether or not other users can view the voice channel',
                usage: 'toggleView'
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
            
                console.log(voiceChannel.permissionOverwrites)
                await voiceChannel.overwritePermissions(message.guild.roles.find(r => r.name === '@everyone'), { VIEW_CHANNEL: false })

            }

        }
    
    }catch(error){console.log(error)}

    }
}

module.exports = ToggleViewCommand