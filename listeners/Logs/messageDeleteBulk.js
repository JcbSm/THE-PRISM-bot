const { Listener } = require('discord-akairo');
const config = require('../../config');
const { rgb } = require('../../functions');

class MessageDeleteBulkListener extends Listener {
    constructor() {
        super('messageDeleteBulk', {
            emitter: 'client',
            event: 'messageDeleteBulk'
        })
    }
    
    async exec(messages) {

        const message = messages.first();
        const guild = message.guild;
        const log = await this.client.channels.fetch(config.prism.guild.channelIDs.log);
    

        if(!guild) return;
        if(guild.id !== '447504770719154192') return;

        await log.send({embed: {
            
            type: 'rich',
            title: null,
            description: `**Bulk delete in ${message.channel}**`,
            url: null,
            color: rgb(config.colors.bad),
            fields: [],
            timestamp: new Date(),
            tumbnail: null,
            image: null,
            video: null,
            author: {},
            provider: null,
            footer: {
            text: ``
            }

        }})
    }
}

module.exports = MessageDeleteBulkListener;