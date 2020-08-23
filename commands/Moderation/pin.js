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
                            description: `**${pinMessage.member}:**\n\n${pinMessage.content}\n\n${attachmentURL}`,
                            url: null,
                            color: colors.purple,
                            fields: [
                                {
                                    name: '\u200b',
                                    value: pinMessage.channel,
                                    inline: true
                                },
                                {
                                    name: '\u200b',
                                    value: `[\`Jump\`](${pinMessage.url})`,
                                    inline: true
                                }
                            ],
                            timestamp: pinMessage.createdAt,
                            thumbnail: {
                                url: pinMessage.author.displayAvatarURL({size:512})
                            },
                            image: {
                                url: (await pinMessage.attachments).filter(a => 
                                    a.url.includes('.jpg') || a.url.includes('.png')
                                ).map(a => a.url)[0]
                            },
                            author:  null,
                            provider: null,
                            footer: {
                                text: pinMessage.author.tag
                            }

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