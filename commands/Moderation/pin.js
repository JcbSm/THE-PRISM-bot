const { Command } = require('discord-akairo');
const { rgb, linkToMessage } = require('../../functions')
const { colors, prism } = require('../../config')

class PinCommand extends Command {
    constructor() {
        super('pin', {
            aliases: ['pin'],
            description: {
                content: 'pins a message to #pins',
                usage: 'pin <message link>'
            },
            //userPermissions: 'MANAGE_MESSAGES',
            args: [
                {
                    id: 'link',
                    type: 'string',
                    match: 'rest'
                }
            ]
        });
    }

    async exec(message, args) {
        try{        
        const pinMessage = await linkToMessage(args.link, this.client)
        const pinChannel = await this.client.channels.fetch(prism.guild.channelIDs.pins)

        if(pinMessage.guild.id !== '447504770719154192') return;

        if(pinMessage.channel.id === pinChannel.id) return;

        if((await pinMessage.reactions.cache).map(e => e.emoji.name).includes('📌')) {

            if(await pinMessage.reactions.cache.get('📌').users.map(u => u.id).includes(this.client.user.id)) {
                return message.reply('I have already pinned that message')
            }
            
        }


                pinMessage.react('📌')
                
                

                
                    let attachmentURL = ''

                    if((await pinMessage.attachments).filter(a => !a.url.includes('.jpg') && !a.url.includes('.png')).map(a => a.url)[0]){
                        attachmentURL = (await pinMessage.attachments).filter(a =>
                            !a.url.includes('.jpg') && !a.url.includes('.png')
                        ).map(a => a.url)[0]
                    }

                    await pinChannel.send({
                        embed: {

                            type: 'rich',
                            title: null,
                            description: `${pinMessage.content}\n\n${pinMessage.channel} [\`Jump\`](${pinMessage.url})` + '\n' + attachmentURL,
                            url: null,
                            color: rgb(colors.purple),
                            fields: [],
                            timestamp: pinMessage.createdAt,
                            tumbnail: null,
                            image: {
                                url: (await pinMessage.attachments).filter(a => 
                                    a.url.includes('.jpg') || a.url.includes('.png')
                                ).map(a => a.url)[0]
                            },
                            author:  {
                                name: pinMessage.author.tag,
                                icon_url: pinMessage.author.avatarURL
                                },
                            provider: null,
                            footer: null

                        }
                    })
              

                await message.channel.send(`***${pinMessage.author}'s message is now saved forever in ${pinChannel}.***`)
                    
            }
            catch(error) {
                console.log(error)
            } 
        
    }
}

module.exports = PinCommand;