const { Command } = require('discord-akairo');
const { colors } = require('../../config');
const { rgb } = require('../../functions')

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
            message.channel.send({ embed: {

                type: 'rich',
                image: {
                    url: message.author.avatarURL({size: 4096})
                },
                footer: {
                    text: 'Couldn\'t find a target user, displaying your own.'
                },
                color: rgb(colors.purple)

            }});
        } else {

            //check for avatar
            if(!args.member.user.avatarURL) {
                return message.reply('No avatar found.')
            }

            //Shows avatar of targeted user
            message.channel.send({ embed: {

                type: 'rich',
                image: {
                    url: args.member.user.displayAvatarURL({size: 4096})
                },
                color: rgb(colors.purple)
            }});
        }
    }
}

module.exports = AvatarCommand;