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

            const scoreMessage = await linkToMessage('https://discordapp.com/channels/447504770719154192/740196706058108958/740558584940593182', this.client)
            console.log(scoreMessage.content.split("\`"))
            let score = Number(scoreMessage.content.split("\`")[1])
            console.log(score)

            const lastMessage = messages.filter(m => !m.author.bot).array()[1]
            let messagesArray = messages.filter(m => !m.author.bot).map(m => m.content)
            messagesArray.shift()

            if(/^[a-z]{1,}$/i.test(message.content) === false || message.author.id === lastMessage.author.id) {
                message.delete()
            } else {

                if(messagesArray.includes(message.content)) {

                    message.react('730846979977904218')
                    message.reply(`You failed, **SCORE:** \`${score}\``)
                    score = 0;
                    //console.log('Repetition')
                } else if(lastMessage.content.toLowerCase().split("").pop() !== message.content.toLowerCase().split("").shift()) {

                    message.react('730846979977904218')
                    message.reply(`You failed, **SCORE:** \`${score}\``)
                    score = 0;
                    //console.log('No match')
                } else if(!words[message.content.toLowerCase()]) {

                    message.react('730846979977904218')
                    message.reply(`You failed, **SCORE:** \`${score}\``)
                    score = 0;
                    //console.log('Not a word')
                } else {

                    message.react('✅')
                    score++
                }

                scoreMessage.edit(`**CURRENT SCORE**: \`${score}\``)
            }

        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = UmListener;