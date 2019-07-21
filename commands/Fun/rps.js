const { Command } = require('discord-akairo');

class RpsCommand extends Command {
    constructor() {
        super('rps', {
            aliases: ['rps'],
            args: [
                {
                    id: 'choice',
                    type: 'string'
                }
            ],
            description: {
                content: 'Play rock, paper, scissors with the bot.',
                usage: 'rps <rock | paper | scissors>'
            },
            category: 'fun'
        })
    }

    exec(message, args) {

        if(!args.choice) {

            const filter = m => m.author.id === message.author.id;
            message.reply('Please choose either rock, paper or scissors, type \'cancel\' to cancel the command.').then(r => r.delete(10000))
            message.channel.awaitMessages(filter,
                {
                    max: 1,
                    time: 10000
                })

            .then(collected => {

                if(collected.first().content === 'cancel') {
                    return message.channel.send('Canceled.').then(r => r.delete(3000))
                }

                let playerChoice = collected.first().content.toLowerCase()
                let botChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random()*3)];
                let winner = ''
    
                if(playerChoice !== 'rock' && playerChoice !== 'paper' && playerChoice !== 'scissors') {
                    return message.reply(`You need to choose rock, paper or scissors. This isn\'t a single player game. :(`)
                }
    
                if(playerChoice === botChoice) {
                    return message.reply(`${botChoice}! Draw...`)
    
                //Test who wins if player chooses rock
                } else if(playerChoice === 'rock') {
                    if(botChoice === 'paper') {
                        winner = 'I'
                    } else {
                        winner = 'You'
                    }
    
                //Test who wins is player chooses paper
                } else if(playerChoice === 'paper') {
                    if(botChoice === 'scissors') {
                        winner = 'I'
                    } else {
                        winner = 'You'
                    }
    
                //Test who wins if player chooses scissors
                } else if(playerChoice === 'scissors') {
                    if(botChoice === 'rock') {
                        winner = 'I'
                    } else {
                        winner = 'You'
                    }
                }
    
                return message.reply(`${botChoice}! ${winner} win.`)
                

            }).catch(err => {
                message.reply('Timed out.').then(r => r.delete(3000))
            })

        } else {

            let playerChoice = args.choice.toLowerCase()
            let botChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random()*3)];
            let winner = ''

            if(playerChoice !== 'rock' && playerChoice !== 'paper' && playerChoice !== 'scissors') {
                return message.reply(`You need to choose rock, paper or scissors. This isn\'t a single player game. :(`)
            }

            if(playerChoice === botChoice) {
                return message.reply(`${botChoice}! Draw...`)

            //Test who wins if player chooses rock
            } else if(playerChoice === 'rock') {
                if(botChoice === 'paper') {
                    winner = 'I'
                } else {
                    winner = 'You'
                }

            //Test who wins is player chooses paper
            } else if(playerChoice === 'paper') {
                if(botChoice === 'scissors') {
                    winner = 'I'
                } else {
                    winner = 'You'
                }

            //Test who wins if player chooses scissors
            } else if(playerChoice === 'scissors') {
                if(botChoice === 'rock') {
                    winner = 'I'
                } else {
                    winner = 'You'
                }
            }

            return message.reply(`${botChoice}! ${winner} win.`)
        }
    }
}

module.exports = RpsCommand