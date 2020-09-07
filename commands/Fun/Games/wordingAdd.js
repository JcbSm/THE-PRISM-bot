const { Command } = require('discord-akairo');
const fs = require('fs')

class WordingAddCommand extends Command {
    constructor() {
        super('addWord', {
            aliases: ['addword'],
            ownerOnly: true,
            args: [
                {
                    id: 'word',
                    match: 'rest'
                }
            ]
        })
    }

    async exec(message, args) {

        try{

            const file = './listeners/Fun/Games/words_dictionary.json'

            let dictionary = JSON.parse(fs.readFileSync(file))

            dictionary[args.word] = 1

            fs.writeFileSync(file, JSON.stringify(dictionary, null, 2))

            await message.channel.send(`***Added ${args.word.toLowerCase()} to the dictionary.***`)

        } catch(e) {console.log(e)}
    }
}

module.exports = WordingAddCommand;