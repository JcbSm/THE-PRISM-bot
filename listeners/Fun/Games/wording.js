const { Listener } = require('discord-akairo');
const { prism, emoji } = require('../../../config')
const { linkToMessage, alphabetical } = require('../../../functions')
const words = require('./words_dictionary.json');

class WordingListener extends Listener {
    constructor() {
        super('wording', {
            emitter: 'client',
            event: 'message'
        })
    }
    async exec(message) {

        try{

            if(message.channel.id !== prism.guild.channelIDs.wording || message.author.bot) return;
            
            // Define Variables

            const [scoreMessage, highScoreMessage] = [
                await linkToMessage('https://discordapp.com/channels/447504770719154192/740196706058108958/749406792282538035', this.client),
                await linkToMessage('https://discordapp.com/channels/447504770719154192/740196706058108958/749406778810433556', this.client)
            ];

            let [score, highScore] = [
                Number(scoreMessage.embeds[0].title.split("\`")[1]),
                Number(highScoreMessage.embeds[0].title.split("\`")[1])
            ]

            let [firstMessage, highScoreFirstMessage] = [];

            try {
                firstMessage = await linkToMessage(scoreMessage.embeds[0].description.slice(7,-1), this.client)
            } catch {
                firstMessage = message
            }

            try {
                highScoreFirstMessage = await linkToMessage(highScoreMessage.embeds[0].description.slice(7,-1), this.client)
            } catch {
                highScoreFirstMessage = firstMessage
            }


            // The Game

            const messages = await message.channel.messages.fetch({

                limit: 100
            })
            const lastMessage = messages.filter(m => !m.author.bot).array()[1]
            let msgArray = messages.map(m => m.content.toLowerCase().trim()).splice(1)
            msgArray.splice(msgArray.findIndex(m => m.startsWith('<')))

            function fail() {

                const failMessage = score >= highScore ? `You failed, **NEW HIGH SCORE:** \`${score}\`` : `You failed, **SCORE:** \`${score}\``
                message.reply(failMessage)
                score = 0
            }

            let scoreDiff = 0

            if(/^[a-z]{1,}$/i.test(message.content) === false || message.author.id === lastMessage.author.id) {
                message.delete()

            } else {

                // Not a word
                if(!words[message.content.toLowerCase()]) {
                    fail();
                
                } else if(msgArray.length > 0) {

                    // No Match
                    if(msgArray[0].charAt(msgArray[0].length - 1) !== message.content.toLowerCase().trim().charAt(0)) {
                        fail()
                    // Repeat
                    } else if(msgArray.includes(message.content.trim().toLowerCase())) {
                        fail()

                    // Pass
                    } else {

                        let mult = 1;

                        if(lastMessage.content.trim().toLowerCase().split("").reverse().join("") == message.content.trim().toLowerCase()) {

                            mult = 2;
                            message.react('🔁');

                        } else if(alphabetical(message.content) === alphabetical(lastMessage.content)) {

                            mult = 2;
                            message.react('🔀');
                        }

                        scoreDiff += Math.floor( mult * message.content.length / 3 );
                        //(scoreDiff > 10) && (scoreDiff = 10)

                        message.react(emoji.characters[scoreDiff]);

                    }

                } else {

                    scoreDiff++;
                    firstMessage = message;
                    message.react(emoji.characters[scoreDiff]);
                }
            }

            // Comparing scores

            score += scoreDiff;

            if(score >= highScore) {
                highScore = score;
                highScoreFirstMessage = firstMessage
            }

            // Editing the Scoreboards

            scoreMessage.edit('', { embed: {

                title: `CURRENT SCORE: \`${score}\``,
                description: `[Jump](${firstMessage.url})`
            }})
            highScoreMessage.edit('', { embed: {

                title: `HIGHEST SCORE: \`${highScore}\``,
                description: `[Jump](${highScoreFirstMessage.url})`
            }})

        } catch(e) {

            console.log(e)
        }
    }
}

module.exports = WordingListener;