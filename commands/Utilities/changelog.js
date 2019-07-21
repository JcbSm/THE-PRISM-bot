const { Command } = require('discord-akairo');
const Discord = require('discord.js')
const color = require('../../datafiles/colors.json')
let changelogLink = 'https://github.com/JcbSm/THE-PRISM-bot/commits/master';

class ChangeCommand extends Command {
    constructor() {
        super('changelog', {
            aliases: ['changelog', 'changes', 'updates'],
            description: {
                content: 'Send\'s a link to the changelog of the bot',
                usage: 'changelog'
            },
            category: 'utilities'
        })
    }

    exec(message) {

        let string = 'here';
        let link = string.link(changelogLink);
        

        let changelogEmbed = new Discord.RichEmbed()

            .setColor(color.purple)
            .setAuthor(this.client.user.username, this.client.user.avatarURL)
            .addField(`Changelog`, `You can see the latest changes to\n${this.client.user.username} bot ***[here](${changelogLink} 'changelog')***`)

        
        message.channel.send(changelogEmbed)
        
    }
}

module.exports = ChangeCommand