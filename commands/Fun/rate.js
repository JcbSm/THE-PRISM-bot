const { Command } = require('discord-akairo');
const replies = require('../../datafiles/ratings')

class RateCommand extends Command {
    constructor() {
        super('rate', {
            aliases: ['rate'],
            description: {
                content: 'Rates a user out of 10',
                usage: 'rate <user>'
            },
            category: 'fun',
            args: [
                {
                    id: 'member',
                    type: 'member',

                }
            ]
        })
    }

    exec(message, args) {

        const rating = Math.round(Math.random()*10)
        
        const resultGood = Math.floor(replies.good.length * Math.random())
        const resultMedium = Math.floor(replies.medium.length * Math.random())
        const resultBad = Math.floor(replies.bad.length * Math.random())

        let nickname = ''

        let rateMessage = ''

        if(rating < 4) {
            rateMessage = replies.bad[resultBad]
        } else if(rating < 7) {
            rateMessage = replies.medium[resultMedium]
        } else {
            rateMessage = replies.good[resultGood]
        }

        if(!args.member) {
            message.reply(`**${rating}/10**, ${rateMessage}`)
        } else {
            
            if(!args.member.nickname) {
                nickname = args.member.user.username
            } else {
                nickname = args.member.nickname
            }
            message.channel.send(`${nickname}, **${rating}/10**, ${rateMessage}`)
        }
    }
}

module.exports = RateCommand