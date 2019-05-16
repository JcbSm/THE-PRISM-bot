const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const color = require('../datafiles/colors.json');

class ReactionCommand extends Command {
    constructor() {
        super('rolereact', {
            aliases: ['rolereact'],
            description: {
                content: 'adds a role reaction',
                usage: 'rolereact <channel> <messageID> <emoji> <roleID>'
            },
            category: 'moderation',
            userPermissions: 'ADMINISTRATOR',
            channelRestriction: 'guild',
            args: [
                {
                    id: 'channel',
                    type: 'channelMention'
                },
                {
                    id: 'message',
                    type: 'string'
                },
                /*{
                    id: 'emoji',
                    type: 'string'
                },
                {
                    id: 'role',
                    type: 'number'
                }*/
            ]
        })
    }

    exec(message, args) {

        let channel = ''
        if(!args.channel) channel = message.channel
        else channel = args.channel

        channel.fetchMessage(args.message)
            .then(msg => {
                console.log(msg.content)

                if(msg.author.id !== this.client.user.id) return message.reply('You must choose a message sent by me.')
                else {

                }
            }) 
            .catch(console.error)
    }
}

//module.exports = ReactionCommand