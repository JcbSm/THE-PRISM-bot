const { Listener } = require('discord-akairo')
const { prism, emoji } = require('../../../config')
const { linkToMessage } = require('../../../functions')

class WordingDeleteListener extends Listener {
    constructor() {
        super('wordingDelete', {
            emitter: 'client',
            event: 'messageDelete'
        })
    }
    
    async exec(message) {

        try{

            if(message.channel.id !== prism.guild.channelIDs.wording) return;

            console.log("MESSAGE DELETED IN WORDING")

            const scoreMessage = await linkToMessage('https://discordapp.com/channels/447504770719154192/740196706058108958/740558584940593182', this.client)
            const highScoreMessage = await linkToMessage('https://discordapp.com/channels/447504770719154192/740196706058108958/740557623845322752', this.client)

            let score = Number(scoreMessage.embeds[0].title.split("\`")[1])
            let firstMessage = await linkToMessage(scoreMessage.embeds[0].description.slice(7,-1), this.client)

            let highScore = Number(highScoreMessage.embeds[0].title.split('\`')[1])
            let highScoreFirstMessage = await linkToMessage(highScoreMessage.embeds[0].description.slice(7,-1), this.client)

            
            let changedScore = emoji.numbers[message.reactions.cache.last().emoji.name]

            scoreMessage.edit({ embed: {

                type: 'rich',
                title: `**CURRENT SCORE**: \`${score - changedScore}\``,
                description: `[Jump](${firstMessage.url})`
            }})

            if(score === highScore) {

                highScoreMessage.edit({ embed: {

                    type: 'rich',
                    title: `**HIGHEST SCORE**: \`${highScore - changedScore}\``,
                    description: `[Jump](${highScoreFirstMessage.url})`
                }})
            }

        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = WordingDeleteListener;