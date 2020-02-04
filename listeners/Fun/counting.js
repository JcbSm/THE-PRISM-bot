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

        let valid;

        if(/^\d\d*$/.test(message.content)) {
            valid = true
        }

        if(Number(message.content) !== Number(lastCount)+1 || message.author.id === lastCount.author.id || !valid) return message.delete();
    }
}

module.exports = CountingListener;