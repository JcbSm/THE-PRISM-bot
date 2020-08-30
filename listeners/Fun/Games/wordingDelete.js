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

            // console.log("MESSAGE DELETED IN WORDING")

            const [scoreMessage, highScoreMessage] = [
                await linkToMessage('https://discordapp.com/channels/447504770719154192/740196706058108958/749406792282538035', this.client),
                await linkToMessage('https://discordapp.com/channels/447504770719154192/740196706058108958/749406778810433556', this.client)
            ];

            let [score, highScore] = [
                Number(scoreMessage.embeds[0].title.split("\`")[1]),
                Number(highScoreMessage.embeds[0].title.split("\`")[1])
            ]

            let [firstMessage, highScoreFirstMessage] = [
                await linkToMessage(scoreMessage.embeds[0].description.slice(7,-1), this.client),
                await linkToMessage(highScoreMessage.embeds[0].description.slice(7,-1), this.client)
            ];
            
            const messages = await message.channel.messages.fetch({

                limit: 100
            })

            //let changedScore = emoji.numbers[message.reactions.cache.last().emoji.name]

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

//module.exports = WordingDeleteListener;