const { Command } = require('discord-akairo');
const Discord = require('discord.js')
const ud = require('urban-dictionary')
const color = require('../../datafiles/colors.json')

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

                    let sent = new Discord.RichEmbed()
                        .setColor(color.purple)
                        .setTitle(`The Urban Dictionary: "${udWord}"`)
                        .setDescription(udDefinition)
                        .addField('Example:', udExample)
                    
                    message.channel.send(sent)

                    /*await sent.react('⬅')
                    await sent.react('➡')
                    const filter = user => user.id === message.author.id;
                    const collector = sent.createReactionCollector(filter, { time: 20000 })
                    collector.on('collect' some code)
                    collector.on('end', collected => message.channel.send('TimedOut'))*/
                } catch(error){
                    console.error
                    message.reply("Something went wrong")
                }
            }
        })
    }
}

module.exports = DefineCommand