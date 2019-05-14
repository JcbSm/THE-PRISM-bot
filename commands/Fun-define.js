const { Command } = require('discord-akairo');
const Discord = require('discord.js')
const ud = require('urban-dictionary')
const color = require('../datafiles/colors.json')

class DefineCommand extends Command {
    constructor() {
        super('define', {
            aliases: ['define'],
            description: {
                content: 'Defines a word using The Urban Dictionary',
                usage: 'define <word>'
            },
            category: 'fun',
            args: [
                {
                    id: 'word',
                    type: 'string',
                    match: 'rest'
                },
                {
                    id: 'page',
                    type: 'number',
                }
            ],
            split: 'quoted'
        })
    }

    exec(message, args) {


        let definition = args.word

        ud.term(definition, async (error, entries, tags) => {
            if (error) {
                return message.reply(`Unable to find definition for ${args.word}`)
            } else {

                let i = ''
                if(!args.page) {
                    i = 0
                } else {
                    i = args.page
                }

                let udWord = entries[i].word.replace(/\[|\]/g, '**')
                let udDefinition = entries[i].definition.replace(/\[|\]/g, '**')
                let udExample = entries[i].example.replace(/\[|\]/g, '**')

                let sent = await message.channel.send(new Discord.RichEmbed()
                    .setColor(color.purple)
                    .setTitle(`The Urban Dictionary: "${udWord}"`)
                    .setDescription(udDefinition)
                    .addField('Example:', udExample)
                )

                /*await sent.react('⬅')
                await sent.react('➡')

                const filter = user => user.id === message.author.id;
                const collector = sent.createReactionCollector(filter, { time: 20000 })

                collector.on('collect' some code)
                collector.on('end', collected => message.channel.send('TimedOut'))*/
            }
        })
    }
}

module.exports = DefineCommand