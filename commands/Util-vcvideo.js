const { Command } = require('discord-akairo');
const Discord = require('discord.js')
const color = require('../datafiles/colors.json')

class VcVideoCommand extends Command {
    constructor() {
        super('vcvideo', {
            aliases: ['vcvideo'],
            description: {
                content: 'Provides a link to the video call in the current voice channel.',
                usage: 'vcvideo'
            },
            category: 'utilities',
        })
    }

    exec(message) {
        
        const vcID = message.member.voiceChannelID
        const serverID = message.guild.id

        if (!vcID) return message.reply(`You aren't in a voice channel. Join one and then do the command to get the link.`)
    
        message.channel.send(new Discord.RichEmbed() 
            .setTitle(`${message.member.voiceChannel.name} video call:`)
            .setDescription(`[Click here to join](https://discordapp.com/channels/${serverID}/${vcID})`)
            .setFooter(`Note: Click this again if you click off the channel.`)
            .setColor(color.purple)
        );
    }
}

module.exports = VcVideoCommand