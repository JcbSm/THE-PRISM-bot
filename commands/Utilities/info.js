const { Command } = require('discord-akairo');
const { colors } = require('../../config');
const packageFile = require('../../package.json');
const { rgb } = require('../../functions');
const moment = require('moment')

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
    
        message.channel.send({ embed: {

            type: 'rich',
            title: `\'${this.client.user.username}\' information`,
            color: rgb(colors.purple),
            footer: {
                text: `by ${packageFile.author}`
            },
            thumbnail: {
                url: this.client.user.avatarURL()
            },
            fields: [
                {
                    name: 'Version',
                    value: packageFile.version,
                    inline: true
                },
                {
                    name: 'Server Count',
                    value: this.client.guilds.cache.size,
                    inline: true
                },
                {
                    name: 'Created on',
                    value: createdDate.format('DD MMM YYYY hh:mm A'),
                }
            ]
        }});
    }
}

module.exports = InfoCommand;