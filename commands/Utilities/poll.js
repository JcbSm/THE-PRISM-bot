const { Command } = require('discord-akairo')
const Discord = require('discord.js')
const emoji = require('../../datafiles/emoji-characters-array')
const color = require('../../datafiles/colors.json')
const config = require('../../config.json')

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

        //Split options by `;`, remove whitespace
        let optionsUnfiltered = args.options.split(";").map(item => item.trim())

        let options = optionsUnfiltered.filter(op => op)

        //Set first item as question.
        let question = options.shift()

        //Check if user has nickname
        let nickname = message.member.nickname
        if(!nickname) {
            nickname = message.member.user.username
        }
        
        
        if(options.length >= 2 && options.length <= 20) {

            //Add emoji before each answer
            for(let i = 0; i < options.length; i++) {
                options[i] = [emoji[i], options[i]]
            }

            //Create embed
            let sent = await message.channel.send(new Discord.RichEmbed()

                .setTitle(`${nickname}\'s poll`)
                .setColor(color.purple)
                .addField(`\"${question}\"`, options.map(item => item.join(" - "))))
            
            .then(message.delete())

            //Add reactions
            for (let i = 0; i < options.length; i++) {
                await sent.react(emoji[i])
            }
        } else {
            return message.reply(`Something went wrong, type \"${config.prefix}help poll\" for more info`)
        }
    }
}

module.exports = PollCommand