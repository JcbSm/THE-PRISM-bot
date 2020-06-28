const { Command } = require('discord-akairo');
const { ratings } = require('../../config');

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
try{

        const rating = Math.round(Math.random()*10)
        
        const resultGood = Math.floor(ratings.good.length * Math.random())
        const resultMedium = Math.floor(ratings.medium.length * Math.random())
        const resultBad = Math.floor(ratings.bad.length * Math.random())

        let nickname;

        let rateMessage;

        if(rating < 4) {
            rateMessage = ratings.bad[resultBad]
        } else if(rating < 7) {
            rateMessage = ratings.medium[resultMedium]
        } else {
            rateMessage = ratings.good[resultGood]
        }

        if(!args.member) {
            message.reply(`**${rating}/10**, ${rateMessage}`)

        } 

        if(args.member.id === this.client.user.id) return message.channel.send(`12/10, whoever that guy is, they are the best. Whoever made them is too, probably...`)
        
        if(args.member) {
            
            console.log(true)
            if(!args.member.nickname) {
                nickname = args.member.user.username;
            } else {
                nickname = args.member.nickname;
            }
            message.channel.send(`${nickname}, **${rating}/10**, ${rateMessage}`)
        }
    }catch(e){console.log(e)}
}
}

module.exports = RateCommand