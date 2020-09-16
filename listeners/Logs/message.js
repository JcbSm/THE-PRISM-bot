const { Listener } = require('discord-akairo');

class MessageListener extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'message'

        })
    }

    async exec(message) {
        try{

        if(message.author.bot) return;

        if(message.channel.id == '447506187693326338') {

            if(message.content.startsWith('https://tenor.com/' || message.content.startsWith('https://giphy.com/'))) {
                message.delete({ reason: "gifs in chat" })
            }

        }
    }catch(E){console.log(E)}
    }
}

module.exports = MessageListener;