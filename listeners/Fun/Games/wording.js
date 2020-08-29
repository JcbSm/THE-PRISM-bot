const { Listener } = require('discord-akairo');
const { prism, emoji } = require('../../../config')
const { linkToMessage, alphabetical } = require('../../../functions')
const words = require('./words_dictionary.json')

class WordingListener extends Listener {
    constructor() {
        super('wording', {
            emitter: 'client',
            event: 'message'
        })
    }
    async exec(message) {

        try{

            function fail(message, score, high) {

                let failMessage;
                message.react('730846979977904218')
                if(score == high) {

                    failMessage = `You failed, **NEW HIGH SCORE:** \`${score}\``
                } else {
                    failMessage = `You failed, **SCORE:** \`${score}\``
                }
                message.reply(failMessage)
                
            }

            if(message.channel.id !== prism.guild.channelIDs.wording || message.author.bot) return;

            const messages = await message.channel.messages.fetch({

                limit: 100
            })

            let firstMessage;
            let highScoreFirstMessage;

            const scoreMessage = await linkToMessage('https://discordapp.com/channels/447504770719154192/740196706058108958/740558584940593182', this.client)
            const highScoreMessage = await linkToMessage('https://discordapp.com/channels/447504770719154192/740196706058108958/740557623845322752', this.client)

            let score = Number(scoreMessage.embeds[0].title.split("\`")[1])
            firstMessage = await linkToMessage(scoreMessage.embeds[0].description.slice(7,-1), this.client)

            let highScore = Number(highScoreMessage.embeds[0].title.split('\`')[1])
            highScoreFirstMessage = await linkToMessage(highScoreMessage.embeds[0].description.slice(7,-1), this.client)

            const lastMessage = messages.filter(m => !m.author.bot).array()[1]
            let messagesArray = messages.map(m => m.content.toLowerCase())
            messagesArray.shift()
            messagesArray.splice(messagesArray.findIndex(m => m.startsWith('<')), 100)

            let increasedScore = 0

            if(/^[a-z]{1,}$/i.test(message.content) === false || message.author.id === lastMessage.author.id) {
                message.delete()
            } else {

                if(!words[message.content.toLowerCase()]) {

                    fail(message, score, highScore)
                    score = 0;

                } else if(messagesArray.length > 0) {
                
                    if(messagesArray[0].trim().toLowerCase().charAt(messagesArray[0].length - 1) !== message.content.trim().toLowerCase().charAt(0)) {

                        fail(message, score, highScore)
                        score = 0;

                    } else if(messagesArray.includes(message.content.toLowerCase())) {

                        fail(message, score, highScore)
                        score = 0;

                    } else {

                        let multiplier = 1
    
                        if(lastMessage.content.trim().toLowerCase().split("").reverse().join("") == message.content.trim().toLowerCase()) {
    
                            message.react('🔁');
                            multiplier++
                        
                        } else if(alphabetical(message.content) === alphabetical(lastMessage.content)) {

                            message.react('🔀'),
                            multiplier++
                        }

                        increasedScore += Math.floor(multiplier * message.content.length / 3);

                        if(increasedScore > 10) increasedScore = 10;

                        message.react(emoji.characters[increasedScore]);

                        if((score += increasedScore) > highScore) {
                            highScore = score += increasedScore
                            highScoreFirstMessage = firstMessage
                        }
                    }

                } else {

                    increasedScore++;
                    message.react(emoji.characters[increasedScore])
                    firstMessage = message
                }

                scoreMessage.edit({ embed: {

                    type: 'rich',
                    title: `**CURRENT SCORE**: \`${score}\``,
                    description: `[Jump](${firstMessage.url})`
                }})
                highScoreMessage.edit({ embed: {

                    type: 'rich',
                    title: `**HIGHEST SCORE**: \`${highScore}\``,
                    description: `[Jump](${highScoreFirstMessage.url})`
                }})
            }

        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = WordingListener;