const { Command } = require('discord-akairo');
const Discord = require('discord.js')
const moment = require('moment')
const color = require('../colors.json')

class ProfileCommand extends Command {
    constructor() {
        super('profile', {
            aliases: ['profile'],
            channelRestriction: 'guild',
            args: [
                {
                    id: 'member',
                    type: 'member'
                }
            ],
            description: {
                content: 'View the profile of a user for the server, if no user is given, it will display your own.',
                usage: `profile <user>`
            }
        });
    }

    exec(message, args) {

        

        if(!args.member) {
            
            //Own profile, if no user is given.
            let joinDate = new moment(message.member.joinedAt)
            let createdDate = new moment(message.author.createdAt)
            let guildName = message.guild.name

            let profileEmbed0 = new Discord.RichEmbed()

                .setTitle(`**${guildName} Profile**`)
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor(color.purple)
                .setThumbnail(message.author.avatarURL)
                .setFooter(`ID: ${message.author.id}`)
                .addField('Name', message.author.username, true)
                .addField('Highest Role', message.member.highestRole, true)
                .addField('Date Joined', joinDate.format('DD MMM YYYY, hh:mm A'), true)
                .addField('Date Registered', createdDate.format('DD MMM YYYY, hh:mm A'), true)
            
            message.channel.send(profileEmbed0)
            
        } else {

            //If user is given in second argument
            let joinDate = new moment(args.member.joinedAt)
            let createdDate = new moment(args.member.user.createdAt)
            let guildName = message.guild.name

            let profileEmbed1 = new Discord.RichEmbed()
                .setTitle(`**${guildName} Profile**`)
                .setAuthor(args.member.user.tag, args.member.user.avatarURL)
                .setColor(color.purple)
                .setThumbnail(args.member.user.avatarURL)
                .setFooter(`ID: ${args.member.id}`)
                .addField('Name', args.member.user.username, true)
                .addField('Highest Role', args.member.highestRole, true)
                .addField('Date Joined', joinDate.format('DD MMM YYYY, hh:mm A'), true)
                .addField('Date Registered', createdDate.format('DD MMM YYYY, hh:mm A'), true)
            
            message.channel.send(profileEmbed1)
        }
    }
}

module.exports = ProfileCommand