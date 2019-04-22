const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const color = require('../colors.json');

class AvatarCommand extends Command {
    constructor() {
        super('avatar', {
            aliases: ['avatar'],
            args: [
                {
                    id: 'member',
                    type: 'member'
                }
            ],
            description: {
                content: 'View a user\'s avatar on a larger scale, if you don\'t specify a user, your own avatar will be shown.',
                usage: 'avatar <member>'
            },
            category: 'utilities'
        });
    }

    exec(message, args) {
        if(!args.member) {

            //check for avatar
            if(!message.author.avatarURL) {
                return message.reply('No avatar found.')
            }

            //No user targeted, own avatar shown
            let OwnAvatarEmbed = new Discord.RichEmbed()
                .setImage(message.author.avatarURL)
                .setFooter('Couldn\'t find a target user, displaying own avatar')
                .setColor(color.purple)
            
            message.channel.send(OwnAvatarEmbed);
        } else {

            //check for avatar
            if(!args.member.user.avatarURL) {
                return message.reply('No avatar found.')
            }

            //Shows avatar of targeted user
            let OtherAvatarEmbed = new Discord.RichEmbed()
                .setImage(args.member.user.avatarURL)
                .setColor(color.purple)
            
            message.channel.send(OtherAvatarEmbed);
        }
    }
}

module.exports = AvatarCommand;