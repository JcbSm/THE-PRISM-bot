const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const color = require('../colors.json')

class ReportCommand extends Command {
    constructor() {
        super('report', {
            aliases: ['report'],
            channelRestriction: 'guild',
            args: [
                {
                    id: 'member',
                    type: 'member'
                },
                {
                    id: 'reason',
                    match: 'rest',
                    type: 'string'
                }
            ],
            description: {
                content: "Report another discord user. *logged in #reports*",
                usage: `report <user> <reason>`
            }
        })
    }
    
    exec(message, args) {

        //Check for user
        if(!args.member) {
            return message.reply('Couldn\'t find user');
        }

        //Check for reason
        if(!args.reason) {
            return message.reply('Please give a reason for your report.')
        }

        //Report

        let reportEmbed = new Discord.RichEmbed()

            .setTitle('Report')
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTimestamp()
            .setColor(color.purple)
            .addField('Reported User', args.member, true)
            .addField('Reported by', message.author, true)
            .addField('Channel', message.channel, true)
            .addField('Reason', args.reason)
        
        message.guild.channels.find(ch => ch.name === 'reports').send(reportEmbed)
    }
}

module.exports = ReportCommand;