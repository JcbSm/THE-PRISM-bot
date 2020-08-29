const { Listener } = require('discord-akairo');
const config = require('../../config');
const { rgb } = require('../../functions');

class MessageUpdateListener extends Listener {
    constructor() {
        super('messageUpdate', {
            emitter: 'client',
            event: 'messageUpdate'
        })
    }
    
    async exec(oldMessage, newMessage) {

        const guild = oldMessage.guild
        const log = await this.client.channels.fetch(config.prism.guild.channelIDs.log);
        
        if(!guild) return;
        if(guild.id !== config.prism.guild.id) return;
        if(oldMessage.content === newMessage.content) return;
        if(oldMessage.author.bot) return;

        if(/nigg/i.test(newMessage.content)) {
            if(newMessage.author.id === this.client.ownerID) {
                console.log("Jacob has the N pass")
                newMessage.delete()
            } else {
                newMessage.channel.send(`${newMessage.member} is a racist!`)
                newMessage.delete()
            }
        }
        if(newMessage.channel.id === config.prism.guild.channelIDs.counting) {
            newMessage.delete()
        }
        if(newMessage.channel.id === config.prism.guild.channelIDs.wording) {
            newMessage.delete()
        }

        await log.send({embed: {
            
            type: 'rich',
            title: null,
            description: `**${oldMessage.member} changed edited a message in ${oldMessage.channel}**`,
            url: null,
            color: rgb(config.colors.purple),
            fields: [
                {
                    name: '**Before:**',
                    value: oldMessage.content
                },
                {
                    name: '**After:**',
                    value: newMessage.content
                },
                {
                    name: 'Message',
                    value: `[\`jump\`](${oldMessage.url})`
                }
            ],
            timestamp: new Date(),
            tumbnail: null,
            image: null,
            video: null,
            author: {
                name: oldMessage.member.user.tag,
                icon_url: oldMessage.member.user.avatarURL()
                },
            provider: null,
            footer: {
            text: `ID: ${oldMessage.member.user.id}`
            }
        }})
    }
}

module.exports = MessageUpdateListener;