const { Command } = require('discord-akairo');
const math = require('mathjs');
const { rgb } = require('../../functions');
const { colors } = require('../../config')

class MathCommand extends Command {
    constructor() {
        super('calc', {
           aliases: ['calc'],
           args: [
               {
                   id: 'calculation',
                   type: 'string',
                   match: 'rest'
               }
           ]
        })
    }

    async exec(message, args) {
        
        if(!args.calculation) return message.channel.send('Please provide a calculation')

        let resp;
        try {
            resp = math.evaluate(args.calculation);
        } catch (e) {
            return message.channel.send('Invalid calculation.')
        }

        await message.channel.send({embed: {
            
            type: 'rich',
            title: 'PRISM Calculator',
            description: null,
            url: null,
            color: rgb(colors.purple),
            fields: [
                {
                    name: 'Input',
                    value: `\`\`\`js\n${args.calculation}\`\`\``
                },
                {
                    name: 'Output',
                    value: `\`\`\`js\n${resp}\`\`\``
                }
            ],
            timestamp: new Date(),
            tumbnail: null,
            image: null,
            video: null,
            author: {},
            provider: null,
            footer: {
            text: ``
            }

        }})
    }
}

module.exports = MathCommand;