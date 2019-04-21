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
            ]
        });
    }

    exec(message, args) {
        if(!args.member) {

            //No user targeted, own avatar shown
            let OwnAvatarEmbed = new Discord.RichEmbed()
                .setImage(message.author.avatarURL)
                .setColor(color.purple)
            
            message.channel.send(OwnAvatarEmbed);
        } else {

            //Shows avatar of targeted user
            let OtherAvatarEmbed = new Discord.RichEmbed()
                .setImage(args.member.user.avatarURL)
                .setColor(color.purple)
            
            message.channel.send(OtherAvatarEmbed);
        }
    }
}

module.exports = AvatarCommand;