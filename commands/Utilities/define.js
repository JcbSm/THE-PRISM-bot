const { Command } = require('discord-akairo');
const Discord = require('discord.js')
const ud = require('urban-dictionary')
const { colors } = require('../../config');
const { rgb } = require('../../functions');

class DefineCommand extends Command {
    constructor() {
        super('define', {
            aliases: ['define','def'],
            description: {
                content: 'Defines a word using The Urban Dictionary',
                usage: 'define <word> <page>'
            },
            category: 'utilities',
            args: [
                {
                    id: 'word',
                    type: 'string',
                    //match: 'rest'
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

        ud.term(definition, (error, entries, tags) => {
            if (error) {
                console.log(error)
                message.reply(`Unable to find definition for ${args.word}`)
            } else {

                try {
                    let sortedEntries = entries.filter(e => e.definition.length < 1024 && e.word.length < 1024 && e.example.length < 1024)

                    if(!args.page) {
                        args.page = 0
                    }

                    let i = args.page

                    let udWord = sortedEntries[i].word.replace(/\[|\]/g, '**')
                    let udDefinition = sortedEntries[i].definition.replace(/\[|\]/g, '**')
                    let udExample = sortedEntries[i].example.replace(/\[|\]/g, '**')

                    if(udWord.split("").length >= 1024 || udDefinition.split("").length >= 1024 || udExample.split("").length >= 1024) {
                        console.log("Too big!")
                    
                    
                    }
                    
                    message.channel.send({ embed: {

                        type: 'rich',
                        color: rgb(colors.purple),
                        title: `The Urban Dictionary: "${udWord}"`,
                        description: udDefinition,
                        fields: [
                            {
                                name: 'Example:',
                                value: udExample
                            }
                        ]
                    }})

                    
                } catch(error){
                    console.error
                    message.reply("Something went wrong")
                }
            }
        })
    }
}

module.exports = DefineCommand