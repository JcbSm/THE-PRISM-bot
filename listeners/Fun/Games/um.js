const { Listener } = require('discord-akairo');
const { prism } = require('../../../config')
const { linkToMessage } = require('../../../functions')
const words = require('./words_dictionary.json')

class UmListener extends Listener {
    constructor() {
        super('um', {
            emitter: 'client',
            event: 'message'
        })
    }
    async exec(message) {

        try{

            if(message.channel.id !== prism.guild.channelIDs.um || message.author.bot) return;

            const messages = await message.channel.messages.fetch({

                limit: 100
            })

            let firstMessage;
            let highScoreFirstMessage;

            const scoreMessage = await linkToMessage('https://discordapp.com/channels/447504770719154192/740196706058108958/740558584940593182', this.client)
            const highScoreMessage = await linkToMessage('https://discordapp.com/channels/447504770719154192/740196706058108958/740557623845322752', this.client)

            let score = Number(scoreMessage.content.split("\`")[1])
            firstMessage = await linkToMessage(scoreMessage.embeds[0].description.slice(7,-1), this.client)

            let highScore = Number(highScoreMessage.content.split('\`')[1])
            highScoreFirstMessage = await linkToMessage(highScoreMessage.embeds[0].description.slice(7,-1), this.client)

            const lastMessage = messages.filter(m => !m.author.bot).array()[1]
            let messagesArray = messages.map(m => m.content.toLowerCase())
            messagesArray.shift()
            messagesArray.splice(messagesArray.findIndex(m => m.startsWith('<')), 100)

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


            if(/^[a-z]{1,}$/i.test(message.content) === false || message.author.id === lastMessage.author.id) {
                message.delete()
            } else {

                if(!words[message.content.toLowerCase()]) {

                    fail(message, score, highScore)
                    score = 0;
                    //console.log('Not a word')

                } else if(messagesArray.length > 0) {
                
                    if(messagesArray[0].trim().toLowerCase().charAt(messagesArray[0].length - 1) !== message.content.trim().toLowerCase().charAt(0)) {

                        fail(message, score, highScore)
                        score = 0;
                        //console.log('No match')
                    } else if(messagesArray.includes(message.content.toLowerCase())) {

                        fail(message, score, highScore)
                        score = 0;
                        //console.log('Repetition')
                    } else {

                        message.react('✅')
                        score++
                        if(score > highScore) {
                            highScore = score
                            highScoreFirstMessage = firstMessage
                        }
    
                        if(lastMessage.content.trim().toLowerCase().split("").reverse().join("") == message.content.trim().toLowerCase()) {
    
                            message.react('🔁')
                        }
                    }

                } else {

                    message.react('✅')
                    score++

                    firstMessage = message

                    if(lastMessage.content.trim().toLowerCase().split("").reverse().join("") == message.content.trim().toLowerCase()) {

                        message.react('🔁')
                    }
                }

                scoreMessage.edit(`**CURRENT SCORE**: \`${score}\``, {embed: {

                    type: 'rich',
                    description: `[Jump](${firstMessage.url})`
                }})
                highScoreMessage.edit(`**HIGHEST SCORE**: \`${highScore}\``, {embed: {

                    type: 'rich',
                    description: `[Jump](${highScoreFirstMessage.url})`
                }})
            }

        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = UmListener;