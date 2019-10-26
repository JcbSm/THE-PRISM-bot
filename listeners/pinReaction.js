const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
const color = require('../datafiles/colors.json')

class PinReactionListener extends Listener {
    constructor() {
        super('pinReact', {
            emitter: 'client',
            eventName: 'messageReactionAdd'
        });
    }

    async exec(messageReaction, user) {
        
        const pinChannel = this.client.channels.get('637349185997373470')

        const message = messageReaction.message

        if(message.guild.id !== '447504770719154192') return;

        if(message.channel.id === pinChannel.id) return;

        if(messageReaction.emoji.name === '📌' && messageReaction.count == 3) {

            if((await messageReaction.fetchUsers()).map(u => u.id).includes(this.client.user.id)) {
                return console.log('I have already pinned')
            } else {
                message.react('📌')
                
                

                try{    
                    let attachmentURL = ''

                    if((await message.attachments).filter(a => !a.url.includes('.jpg') && !a.url.includes('.png')).map(a => a.url)[0]){
                        attachmentURL = (await message.attachments).filter(a =>
                            !a.url.includes('.jpg') && !a.url.includes('.png')
                        ).map(a => a.url)[0]
                    }

                    await pinChannel.send({
                        embed: {

                            type: 'rich',
                            title: message.content,
                            description: message.channel + '\n' + attachmentURL,
                            url: null,
                            color: 6889949,
                            fields: [],
                            timestamp: null,
                            tumbnail: null,
                            image: {
                                url: (await message.attachments).filter(a => 
                                    a.url.includes('.jpg') || a.url.includes('.png')
                                ).map(a => a.url)[0]
                            },
                            author:  {
                                name: message.author.tag,
                                icon_url: message.author.avatarURL
                                },
                            provider: null,
                            footer: null

                        }
                    })
                }
                catch(error) {
                    console.log(error)
                }

                await message.channel.send(`***${message.author}'s message is now saved forever in ${pinChannel}.***`)
                    
            }
        }
    }
}

module.exports = PinReactionListener;