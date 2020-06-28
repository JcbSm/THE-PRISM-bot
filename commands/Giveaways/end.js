const { Command } = require('discord-akairo')
const { colors } = require('../../config')
const { rgb } = require('../../functions')

class GiveawayEndCommand extends Command {
    constructor() {
        super('end', {
            aliases: ['gend', 'giveaway-end','g-end', 'end'],
            description: {
                usage: 'end <message ID> <Number of winners>',
                content: 'Ends a giveaway.'
            },
            args: [
                {
                    id: 'id',
                    type: 'string'
                }
            ]
        })
    }

    async exec(message, args) {
        try{

            if(!args.id) return message.reply('Please enter a the message ID and amount of winners.')

            let giveawayMessage = await message.channel.messages.fetch(args.id)

            if(giveawayMessage.reactions.cache.keyArray().includes('🎁')) { 

                let reaction = await giveawayMessage.reactions.cache.get('🎁')
                let reactionUsers = (await reaction.users.fetch()).filter(u => !u.bot).map(u => u.id)
                let rng = Math.floor(Math.random()*reactionUsers.length)
                if(reactionUsers.length == 0) return message.channel.send("No one has entered the giveaway yet.")
                let prize = (await giveawayMessage.embeds[0]).description
                message.channel.send(`**<@${reactionUsers[rng]}> has won a giveaway:**\n\n ${prize}`)
            }

            await message.delete()

        } catch(error) {console.log(error)}
    }
}

module.exports = GiveawayEndCommand;