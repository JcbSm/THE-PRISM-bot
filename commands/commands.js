const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const color = require('../colors.json')
const config = require('../config.json')

class CommandsCommand extends Command {
    constructor() {
        super('commands', {
            aliases: ['commands'],
            description: {
                content: 'Lists all the commands',
                usage: 'commands'
            }
        });
    }

    exec(message, args) {

        if(!args.command) {
            
            //Command list
            let helpEmbed = new Discord.RichEmbed()

                .setTitle('__\'THE PRISM\' help__')
                .setFooter(`Type ${config.prefix}help <command> for more information`)
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor(color.purple)
                .setThumbnail(this.client.user.avatarURL)
                //Moderation
                .addField('Moderation', `- Mute\n- Unmute\n- Clear\n- Report`)
                //Utilities
                .addField('Utilities', `- Avatar\n- Changelog\n- Flip\n- Info\n- Nickname\n- Ping\n- Profile\n- Roll`)
                //Fun
                .addField('Fun', '- Fact\n- Anyone\n- Rps')

            message.channel.send(helpEmbed)

        }
    }
}

module.exports = CommandsCommand;