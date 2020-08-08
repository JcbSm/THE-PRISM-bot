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

        if(message.channel.type === 'dm') {

            (await this.client.users.fetch(this.client.ownerID)).send({ embed: {

                type: 'rich',
                description: message.content,
                author: {
                    name: message.author.tag,
                    icon_url: message.author.avatarURL({size: 4096})
                }
            }})
        }
    }catch(E){console.log(E)}
    }
}

module.exports = MessageListener;