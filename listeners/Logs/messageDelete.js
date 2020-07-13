const { Listener } = require('discord-akairo');
const config = require('../../config');
const { rgb } = require('../../functions');

class MessageDeleteListener extends Listener {
    constructor() {
        super('messageDelete', {
            emitter: 'client',
            event: 'messageDelete'
        })
    }
    
    async exec(message) {

        const guild = message.guild;
        const log = await this.client.channels.fetch(config.prism.guild.channelIDs.log);
     
        if(!guild) return;
        if(guild.id !== '447504770719154192') return;
        if(message.author.bot) return;

        let logMessage = `**${message.author}'s message was deleted in ${message.channel}**`;

        await log.send({embed: {
            
            type: 'rich',
            title: null,
            description: logMessage,
            url: null,
            color: rgb(config.colors.bad),
            fields: [
                {
                    name: 'Message',
                    value: message.content
                },
            ],
            timestamp: new Date(),
            tumbnail: null,
            image: null,
            video: null,
            author: {
                name: message.member.user.tag,
                icon_url: message.member.user.avatarURL()
                },
            provider: null,
            footer: {
            text: `ID: ${message.member.user.id}`
            }

        }});
    };
}

module.exports = MessageDeleteListener;