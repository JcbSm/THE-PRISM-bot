const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const moment = require('moment')
const color = require('../../datafiles/colors.json')
const packageFile = require('../../package.json')

class InfoCommand extends Command {
    constructor() {
        super('info', {
            aliases: ['info'],
            description: {
                content: 'Shows information about the bot',
                usage: 'info'
            },
            category: 'utilities'
        })
    }

    exec(message) {

        let createdDate = new moment(this.client.user.createdAt)

        let infoEmbed = new Discord.RichEmbed()

            .setTitle(`\'${this.client.user.username}\' information.`)
            .setColor(color.purple)
            .setFooter(`by ${packageFile.author}`)
            .setThumbnail(this.client.user.avatarURL)
            .addField('Version', packageFile.version, true)
            .addField('Server count', this.client.guilds.size, true)
            .addField('Created on', createdDate.format('DD MMM YYYY hh:mm A'), true)
            .addField('Invite to your server', 'https://tinyurl.com/the-prism-bot', true)
            .addField('Join us', 'https://discord.gg/Cb8QtdN')
    
        message.channel.send(infoEmbed);
    }
}

module.exports = InfoCommand;