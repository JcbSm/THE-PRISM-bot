const { Command } = require('discord-akairo')
const config = require('../../config');
const { rgb } = require('../../functions');

class PollCommand extends Command {
    constructor() {
        super('poll', {
            aliases: ['poll'],
            description: {
                content: 'Creates a poll with reactions to count the answers. There must be between 2 and 20 options.',
                usage: 'poll question; option 1; option 2; option 3....'
            },
            category: 'utilities',
            args: [
                {
                    id: 'options',
                    type: 'string',
                    match: 'rest'
                },
            ],
        })
    }
    
    async exec(message, args) {
        try{
        const emoji = config.emoji.characterArray;
        const colors = config.colors;

        //Split options by `;`, remove whitespace
        let optionsUnfiltered = args.options.split(";").map(item => item.trim())

        let options = optionsUnfiltered.filter(op => op)

        //Set first item as question.
        let question = options.shift()

        
        if(options.length >= 2 && options.length <= 20) {

            //Add emoji before each answer
            for(let i = 0; i < options.length; i++) {
                options[i] = [emoji[i], options[i]]
            }

            //Create embed
            let sent = await message.channel.send({ embed: {

                type: 'rich',
                description: `**${message.member} asks:**\n\n*${question}*\n\n${options.map(item => item.join(" - ")).join('\n')}`,
                color: rgb(colors.purple),
                timestamp: new Date(),
                thumbnail: {
                    url: message.author.displayAvatarURL({size: 4096})
                },
                footer: {
                    text: message.author.tag
                }

            }})
            
            .then(message.delete())

            //Add reactions
            for (let i = 0; i < options.length; i++) {
                await sent.react(emoji[i])
            }
        } else {
            return message.reply(`Something went wrong, type \"${config.prefix}help poll\" for more info`)
        }
    }catch(e) {console.log(e)}
    }
}

module.exports = PollCommand