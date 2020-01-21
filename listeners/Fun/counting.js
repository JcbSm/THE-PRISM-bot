const { Listener } = require('discord-akairo');

class CountingListener extends Listener {
    constructor() {
        super('counting', {
            emitter: 'client',
            eventName: 'message'

        })
    }

    async exec(message) {

        if(message.channel.id !== '583742663627505669') return;

        const lastCount = (await message.channel.fetchMessages( {limit:2} )).last()

        if(Number(message.content) !== Number(lastCount)+1 || message.author.id === lastCount.author.id) return message.delete();
    }
}

module.exports = CountingListener;