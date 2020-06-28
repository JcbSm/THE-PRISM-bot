const { Command } = require('discord-akairo');

class MuteCommand extends Command {
    constructor() {
        super('mute', {
            aliases: ['mute'],
            args: [
                {
                    id: 'member',
                    type: 'member'
                },
                {
                    id: 'reason',
                    match: 'rest',
                    type: 'string'
                }
            ],
            clientPermission: ['MANAGE_ROLES'],
            channelRestriction: 'guild',
            userPermissions: ['MANAGE_ROLES'],
            description: {
                content: 'Mutes a user, *requires \'manage roles\' permission*',
                usage: 'mute <user> <reason>'
            },
            category: 'moderation'
        });
    }

    async exec(message, args) {
        
        try{
            if(!message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')) {
                await message.guild.roles.create({ data: {
                    name: 'Muted',
                    color: '#000001',
                    permissions: 'VIEW_CHANNEL'
                }})

                return message.reply('No muted role found, created a new one. Try again.')
            }

            let mutedRole = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')

            //Checks for target
            if(!args.member) {
                return message.reply('No user found.');
            }

            //Mutes user
            return args.member.roles.add(mutedRole).then(() => {
                if(!args.reason){
                    return message.channel.send(`***${args.member.user.tag} has been muted.***`)
                }
                return message.channel.send(`***${args.member.user.tag} has been muted for ${args.reason}.***`)
            })
        } catch(e) {console.log(e)}
    }
}
module.exports = MuteCommand;