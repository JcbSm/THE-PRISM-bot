const { Command } = require('discord-akairo');
const changelogLink = 'https://github.com/JcbSm/THE-PRISM-bot/commits/master';
const { colors } = require('../../config');
const { rgb } = require('../../functions')

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
        
        message.channel.send({ embed: {

            type: 'rich',
            color: rgb(colors.purple),
            author: {
                name: this.client.user.username,
                icon_url: this.client.user.avatarURL()
            },
            fields: [
                {
                    name: 'Changelog',
                    value: `[GitHub Rep](${changelogLink})`
                }
            ]
        }})
        
    }
}

module.exports = ChangeCommand