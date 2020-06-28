const { Command } = require('discord-akairo');
const { colors } = require('../../config')
const { rgb } = require('../../functions')

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
                content: "Report another discord user to the Council.",
                usage: `report <user> <reason>`
            },
            category: 'moderation'
        })
    }
    
    async exec(message, args) {

        const channel = await this.client.channels.fetch(config.prism.guild.channels.reports.id)

        //Check for user
        if(!args.member) {
            return message.reply('Couldn\'t find user');
        }

        //Check for reason
        if(!args.reason) {
            return message.reply('Please give a reason for your report.')
        }

        channel.send({ embed: {

            type: 'rich',
            title: 'Report',
            author: {
                name: message.author.tag,
                icon_url: message.author.avatarURL()
            },
            timestamp: new Date(),
            color: rgb(colors.purple),
            fields: [
                {
                    name: 'Reported User',
                    value: args.member,
                    inline: true
                },
                {
                    name: 'Reported By',
                    value: message.member,
                    inline: true
                },
                {
                    name: 'Channel',
                    value: message.channel,
                    inline: true
                },
                {
                    name: 'Reason',
                    value: args.reason
                }
            ]
        }})

        message.reply("Done, thankyou for the report.")
    }
}

module.exports = ReportCommand;