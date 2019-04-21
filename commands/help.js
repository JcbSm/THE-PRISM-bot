const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const color = require('../colors.json')
const config = require('../config.json')

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'commands'],
            args: [
                {
                    id: 'command',
                    type: 'string',
                }
            ]
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
                .addField('Moderation', `- Mute\n- Unmute\n- Clear\n`)
                //Utilities
                .addField('Utilities', `- Avatar\n- Flip\n- Info\n- Nickname\n- Ping\n- Profile\n- Roll`)
                //Fun
                .addField('Fun', '- Fact\n- Anyone')

            message.channel.send(helpEmbed)

        }

        switch(args.command) {
        
            //Roll command information
            case 'roll':
                let helpRollEmbed = new Discord.RichEmbed()

                .setTitle('__Roll__')
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor(color.purple)
                .setThumbnail(this.client.user.avatarURL)
                .addField(`${config.prefix}roll <max>`, `Rolls a dice with a number of sides equal to <max>.`)

            message.channel.send(helpRollEmbed);

            break;

            //Profile command information
            case 'profile':
            let helpProfileEmbed = new Discord.RichEmbed()

                .setTitle('__Profile__')
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor(color.purple)
                .setThumbnail(this.client.user.avatarURL)
                .addField(`${config.prefix}profile <user>`, `Shows the profile of the target user for the server. If no user is given, the bot will display your own.`)

            message.channel.send(helpProfileEmbed);

            break;

            //Avatar command information
            case 'avatar':
            let helpAvatarEmbed = new Discord.RichEmbed()

                .setTitle('__Avatar__')
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor(color.purple)
                .setThumbnail(this.client.user.avatarURL)
                .addField(`${config.client.prefix}avatar <user>`, 'Shows the avatar of the target user. If no user is given, the bot will display your own.')

            message.channel.send(helpAvatarEmbed);

            break;

            //Flip command info
            case 'flip':
            let helpFlipCommand = new Discord.RichEmbed()

                .setTitle('__Flip__')
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor(color.purple)
                .setThumbnail(this.client.user.avatarURL)
                .addField(`${config.prefix}flip <side>`, 'Flip a coin and guess the side it will land on. If no side is given. the coin will flip anyway.')

            message.channel.send(helpFlipCommand);

            break;

            //Clear Command Info
            case 'clear':
            let helpClearCommand = new Discord.RichEmbed()

                .setTitle('__Clear__')
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor(color.purple)
                .setThumbnail(this.client.user.avatarURL)
                .addField(`${config.prefix}clear <amount>`, 'Bulk delete messages in a channel.')

            message.channel.send(helpClearCommand);
        }
    }
}

module.exports = HelpCommand;