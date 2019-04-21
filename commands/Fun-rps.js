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
            }
        })
    }

    exec(message, args) {

        if(!args.choice) {
            return message.reply(`You need to choose rock, paper or scissors. This isn\'t a single player game. :(`)
        }

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

module.exports = RpsCommand