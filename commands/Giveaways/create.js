const { Command } = require('discord-akairo')
const { colors } = require('../../config')
const { rgb } = require('../../functions')

class GiveawayCreateCommand extends Command {
    constructor() {
        super('giveaway', {
            aliases: ['gCreate', 'giveaway-create','g-create', 'giveaway'],
            description: {
                usage: 'giveaway <giveaway>',
                content: 'Starts a giveaway.'
            },
            args: [
                {
                    id: 'prize',
                    type: 'string',
                    match: 'rest'
                }
            ]
        })
    }

    async exec(message, args) {

        if(!args.prize) return message.reply('Please enter a prize')
        
        let giveawayMessage = await message.channel.send({ embed: {

            type: 'rich',
            title: `[**GIVEAWAY** ]`,
            description: `__**PRIZE**__ \n\n\`\`\`${args.prize}\`\`\`\n`,
            fields: [
                {
                    name: 'To Enter:',
                    value: 'React to this message with 🎁 to enter!'
                }
            ],
            color: rgb(colors.purple),
            timestamp: new Date()
        }})

        await message.delete()
        await giveawayMessage.react('🎁')
    }
}

module.exports = GiveawayCreateCommand;