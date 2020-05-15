const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const color = require('../../../datafiles/colors.json');

class ToggleUserCommand extends Command {
    constructor() {
        super('toggleUser', {
            aliases: ['toggleUser'],
            description: {
                content: 'Allows or denies a specific user to view the channel',
                usage: 'toggleUser <user>'
            },
            category: 'utilities',
            args: [
                {
                    id: 'member',
                    type: 'member'
                }
            ]
        })
    }

    async exec(message, args) {
        try{        
        
        if(message.guild.id === '447504770719154192' || message.guild.id === '569556194612740115') {

            const guild = message.guild

            if(message.channel.topic.split(';').shift() !== 'PRIVATE CALL') message.reply('This is not a private call text channel, please either make one or use an existing one.');
            if(message.channel.topic.split(';').shift() === 'PRIVATE CALL') {
                const voiceChannel = message.guild.channels.get(message.channel.topic.split(';').pop())
                const perms = voiceChannel.permissionOverwrites.filter(p => p.type === 'member')

                if(perms.get(args.member.id)) {
                    if(perms.get(args.member.id).allowed.serialize().VIEW_CHANNEL){
                        await voiceChannel.overwritePermissions(args.member.id, { VIEW_CHANNEL: false })
                        message.channel.send(`***${voiceChannel.name} is now invisible to ${args.member}***`)
                    } else {
                        await voiceChannel.overwritePermissions(args.member.id, { VIEW_CHANNEL: true })
                        message.channel.send(`***${voiceChannel.name} is now visible to ${args.member}***`)
                    }
                } else {
                    await voiceChannel.overwritePermissions(args.member.id, { VIEW_CHANNEL: true })
                    message.channel.send(`***${voiceChannel.name} is now visible to ${args.member}***`)
                }


            }

        }
    
    }catch(error){console.log(error)}

    }
}

module.exports = ToggleUserCommand