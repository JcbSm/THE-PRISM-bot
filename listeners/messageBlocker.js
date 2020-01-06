const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
const color = require('../datafiles/colors.json')
const bans = require('../datafiles/softBans')

class BlockerListener extends Listener {
    constructor() {
        super('blockMessage', {
            emitter: 'client',
            eventName: 'message'
        });
    }

    async exec(message) {

        if(message.guild.id !== '447504770719154192') return

        if(bans.map(u => u.id).includes(message.author.id)) {

            await message.delete()

            let logChannel = this.client.channels.get('656189395132481547')

            await logChannel.send(new Discord.RichEmbed()
            
                .setTitle(`**MESSAGE BLOCKED**`)
                .setDescription(message.content + '\n\n' + message.channel)
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor(color.purple)

            )

            message.member.setMute(true)

        }
        
    }
}

module.exports = BlockerListener;