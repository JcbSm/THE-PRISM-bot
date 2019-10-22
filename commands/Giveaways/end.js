const { Command } = require('discord-akairo')
const color = require('../../datafiles/colors.json')
const Discord = require('discord.js')
const moment = require('moment')

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

        let giveawayMessage = await message.channel.fetchMessage(args.id)

        if(giveawayMessage.reactions.keyArray().includes('🎁')) { 
            let reaction = await giveawayMessage.reactions.get('🎁')
            
            let reactionUsers = (await reaction.fetchUsers()).filter(u => !u.bot).map(u => u.id)

            let reactionUsersNoBot = reactionUsers.filter(u => u.bot)

            let rng = Math.floor(Math.random()*reactionUsers.length)
            let prize = (await giveawayMessage.embeds[0]).description
            message.channel.send(`**<@${reactionUsers[rng]}> has won a giveaway:**\n ${prize}`)
        }

        await message.delete()
    }catch(error){console.log(error)}
    }
}

module.exports = GiveawayEndCommand;