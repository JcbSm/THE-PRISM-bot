const { Listener } = require('discord-akairo');

class MessageListener extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            eventName: 'message'

        })
    }

    async exec(message) {

        if(message.author.bot) return;

        if(/(..*)\1{8,}/gmi.test(message.content)) return message.delete()
        if(/(\w){25,}/gmi.test(message.content) && !message.content.toLowerCase().startsWith("http://") && !message.content.toLowerCase().startsWith("https://")) return message.delete()

        let fetchedMessages = (await message.channel.fetchMessages({ limit: 5 })).filter(m => m.author.id === message.author.id).map(m => m.content);
        let lastMessages = fetchedMessages.splice(1,4)

        if(!lastMessages.includes(message.content)) return;
        
        let repetitions = 0

        for(let m of lastMessages) {
            if(m === message.content) {
                repetitions++;
            }
        }

        if(repetitions >= 3) message.delete()
    }
}

module.exports = MessageListener;