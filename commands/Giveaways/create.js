const { Command } = require('discord-akairo')
const color = require('../../datafiles/colors.json')
const Discord = require('discord.js')
const moment = require('moment')

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

        let giveawayEmbed = new Discord.RichEmbed()
            .setColor(color.purple)
            .setTitle(`[** ${message.guild.name} GIVEAWAY **]`)
            .setDescription(`__**PRIZE**__\n\`\`\`${args.prize}\`\`\``)
            .setFooter(new moment(Date.now()).format('DD MMM YYYY, HH:mm') + ' UCT')
        
        let giveawayMessage = await message.channel.send(giveawayEmbed)

        await message.delete()
        await giveawayMessage.react('🎁')
    }
}

module.exports = GiveawayCreateCommand;