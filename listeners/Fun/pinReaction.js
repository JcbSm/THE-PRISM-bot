const { Listener } = require('discord-akairo');
const config = require('../../config');
const { rgb } = require('../../functions')

class PinReactionListener extends Listener {
    constructor() {
        super('pinReact', {
            emitter: 'client',
            event: 'messageReactionAdd'
        });
    }

    async exec(messageReaction, user) {
try{        
        const pinChannel = await this.client.channels.fetch(config.prism.guild.channelIDs.pins);

        const message = messageReaction.message

        if(message.guild.id !== config.prism.guild.id) return;

        if(message.channel.id === pinChannel.id) return;

        if(messageReaction.emoji.name === '📌' && messageReaction.count == 1) {

            if((await messageReaction.users.fetch()).map(u => u.id).includes(this.client.user.id)) {
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
                            title: null,
                            description: `**${message.member}:**\n\n${message.content}\n\n${attachmentURL}`,
                            url: null,
                            color: rgb(config.colors.purple),
                            fields: [
                                {
                                    name: '\u200b',
                                    value: message.channel,
                                    inline: true
                                },
                                {
                                    name: '\u200b',
                                    value: `[\`Jump\`](${message.url})`,
                                    inline: true
                                }
                            ],
                            timestamp: message.createdAt,
                            thumbnail: {
                                url: message.author.displayAvatarURL({size:512})
                            },
                            image: {
                                url: (await message.attachments).filter(a => 
                                    a.url.includes('.jpg') || a.url.includes('.png')
                                ).map(a => a.url)[0]
                            },
                            author:  null,
                            provider: null,
                            footer: {
                                text: message.author.tag
                            }

                        }
                    })
                }
                catch(error) {
                    console.log(error)
                }

                await message.channel.send(`***${message.author}'s message is now saved forever in ${pinChannel}.***`)
                    
            }
        }
    }catch(e){console.log(e)}
    }
}

module.exports = PinReactionListener;