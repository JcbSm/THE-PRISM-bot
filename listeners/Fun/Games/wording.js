const { Listener } = require('discord-akairo');
const { prism, emoji, embeds } = require('../../../config')
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

            // Get DB Data

            const DB = this.client.db

            let data = (await DB.query(`SELECT * FROM tbl_wording WHERE user_id = ${message.author.id}`)).rows[0]

            if(data === undefined) {

                await DB.query(`INSERT INTO tbl_wording (user_id, total_points, total_words, total_fails) VALUES (${message.author.id}, 0, 0, 0)`, (err, res) => {

                    if(err) return console.log(err);

                    console.log(`Added ${message.author.tag} to tbl_wording with user_id ${message.author.id}`)
                })

                data = (await DB.query(`SELECT * FROM tbl_wording WHERE user_id = ${message.author.id}`)).rows[0]
            }

            //console.log(data)

            
            // Define Variables

            const scoreMessage = await linkToMessage('https://discordapp.com/channels/447504770719154192/740196706058108958/749406792282538035', this.client);

            let [score, highScore] = [
                Number(scoreMessage.embeds[0].fields[0].name.split("\`")[1]),
                Number(scoreMessage.embeds[0].fields[1].name.split("\`")[1])
            ];

            let [firstMessage, highScoreFirstMessage] = [];

            try {
                firstMessage = await linkToMessage(scoreMessage.embeds[0].fields[0].value.slice(7,-1), this.client)
            } catch {
                firstMessage = message
            }

            try {
                highScoreFirstMessage = await linkToMessage(scoreMessage.embeds[0].fields[1].value.slice(7,-1), this.client)
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

            let pointsLost = 0
            let scoreDiff = 0
            let failed = 0

            function fail() {

                const failMessage = score >= highScore ? `You failed, **NEW HIGH SCORE:** \`${score}\`` : `You failed, **SCORE:** \`${score}\``
                message.react('730846979977904218')
                message.reply(failMessage)
                pointsLost = score
                failed = 1
                score = 0
            }

            if(/^[a-z]{1,}$/i.test(message.content) === false || message.author.id === lastMessage.author.id) {
                return message.delete()

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
                        if(scoreDiff > 10) scoreDiff = 10

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

            // Update DB

            const worstFail = pointsLost > data.worst_fail ? pointsLost : data.worst_fail

            await DB.query(

                `UPDATE tbl_wording SET
                    total_points = ${data.total_points + scoreDiff},
                    total_words = ${data.total_words + 1},
                    total_fails = ${data.total_fails + failed},
                    worst_fail = ${worstFail},
                    last_word = '${message.content}',
                    last_word_timestamp = ${message.createdTimestamp},
                    last_word_url = '${message.url}'
                WHERE user_id = ${message.author.id}`,
                
                (err, res) => {

                    if(err) console.log(err)
                }
            )

            // Editing the Scoreboards

            scoreMessage.edit('', { embed: {
                title: `${message.guild.name} WORDING SCORES:`,
                description: `═══════════════════`,
                fields: [
                    {
                        name: `CURRENT SCORE: \`${score}\``,
                        value: `[Jump](${firstMessage.url})`,
                    },
                    {
                        name: `HIGHEST SCORE: \`${highScore}\``,
                        value: `[Jump](${highScoreFirstMessage.url})`,
                    }
                ]
            }})

        } catch(e) {

            console.log(e)
        }
    }
}

module.exports = WordingListener;