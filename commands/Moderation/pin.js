const { Command } = require('discord-akairo');
const Discord = require('discord.js');

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
        const channelMessageID = args.link.split('/').splice(5, 2)

        const channelID = channelMessageID.shift()
        const messageID = channelMessageID.pop()

        const pinMessage = await this.client.channels.get(channelID).fetchMessage(messageID)

        //try{console.log(pinMessage.content)} catch(error) {console.log(error)}
        //console.log(pinMessage.content)

        const pinChannel = this.client.channels.get('637349185997373470')

        



        if(pinMessage.guild.id !== '447504770719154192') return;

        if(pinMessage.channel.id === pinChannel.id) return;

        if((await pinMessage.reactions).map(e => e.emoji.name).includes('📌')) {

            if((await pinMessage.reactions.get('📌').fetchUsers()).map(u => u.id).includes(this.client.user.id)) {
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

                    if(!pinMessage.pinned) {
                        pinMessage.pin()
                    }

                    await pinChannel.send({
                        embed: {

                            type: 'rich',
                            title: null,
                            description: `${pinMessage.content}\n\n${pinMessage.channel} [\`Jump\`](${pinMessage.url})` + '\n' + attachmentURL,
                            url: null,
                            color: 6889949,
                            fields: [],
                            timestamp: message.createdAt,
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