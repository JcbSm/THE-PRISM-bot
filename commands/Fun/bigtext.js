const { Command } = require('discord-akairo');
const emoji = require('../../datafiles/emoji-characters')

class BigTextCommand extends Command {
    constructor() {
        super('bigtext', {
            aliases: ['bigtext'],
            description: {
                content: 'Turn text into larger letters.',
                usage: 'bigtext <text>'
            },
            category: 'fun',
            args: [
                {
                    id: 'text',
                    match: 'rest',
                    type: 'string'
                }
            ]
        })
    }

    exec(message, args) {

        let textArray = args.text.split("")

        let emojiArray = textArray.map(e => emoji[e.toLowerCase()]+ " ").join("");

        message.channel.send(emojiArray).then(message.delete())
    }
}

module.exports = BigTextCommand;