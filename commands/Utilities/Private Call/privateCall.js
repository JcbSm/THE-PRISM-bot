const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const color = require('../../../datafiles/colors.json');

class PrivateCallCommand extends Command {
    constructor() {
        super('privatecall', {
            aliases: ['privatecall'],
            description: {
                content: 'Create a temporary private voice channel',
                usage: 'privatecall <user limit> <name>'
            },
            category: 'utilities',
            args: [
                {
                    id: 'num',
                    type: 'number'
                },
                {
                    id: 'name',
                    type: 'string',
                    match: 'rest',
                },
            ],
            split: 'quoted'
        })
    }

    async exec(message, args) {
        try{        
        
        if(message.guild.id === '447504770719154192' || message.guild.id === '569556194612740115') {

            const guild = message.guild
            const everyoneRole = message.guild.roles.find(r => r.name === '@everyone')

            if(args.num > 99) return message.reply('Max user count is 99')

            let name;

            if(args.name) {
                name = `🔒 ${args.name}`
            } else {
                if(message.member.nickname) {
                    name = `🔒 ${message.member.nickname}\'s Channel`
                } else {
                    name = `🔒 ${message.author.username}\'s Channel`
                }
            }

            const voiceChannel = await guild.createChannel(name, {type: 'voice', userLimit: args.num})
            await voiceChannel.overwritePermissions(message.author.id, { VIEW_CHANNEL: true })
            await voiceChannel.overwritePermissions(this.client.user.id, { VIEW_CHANNEL: true })
            await voiceChannel.overwritePermissions(everyoneRole, { VIEW_CHANNEL: true })
            await voiceChannel.setParent('638153434096205846')

            const textChannel = await guild.createChannel(name, { type: 'text'})
            await textChannel.overwritePermissions(message.author.id, { VIEW_CHANNEL: true })
            await textChannel.overwritePermissions(this.client.user.id, { VIEW_CHANNEL: true })
            await textChannel.overwritePermissions(everyoneRole, { VIEW_CHANNEL: false })
            await textChannel.setParent('638153434096205846')
            await textChannel.setTopic(`PRIVATE CALL;${message.member};${voiceChannel.id}`)

            await textChannel.send(
                `${message.member} This is your private Voice Chat text channel for ${name}: Here are some commands you can use to change things around:\n
\`\`\`js\n
-endCall: Ends and removes the voice channel\n
(not yet working) -toggleView: Toggles whether or not other users can see the channel\n
\`\`\`
`)

        }
    
    }catch(error){console.log(error)}

    }
}

module.exports = PrivateCallCommand