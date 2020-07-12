const { Listener } = require('discord-akairo');
const config = require('../../config');

class CountingListener extends Listener {
    constructor() {
        super('counting', {
            emitter: 'client',
            event: 'message'

        })
    }

    async exec(message) {

        if(message.channel.id !== config.prism.guild.channelIDs.counting) return;
        const lastCount = (await message.channel.messages.fetch( {limit:2} )).last()
        let valid;
        if(/^\d{1,}$/.test(message.content)) {
            valid = true
        }
        if(Number(message.content) !== Number(lastCount.content)+1 || message.author.id === lastCount.author.id || !valid) return message.delete();

    }
}

module.exports = CountingListener;