const { Command } = require('discord-akairo');
const roles = require('../roles.json');

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

    exec(message, args) {

        //Checks for target
        if(!args.member) {
            return message.reply('No user found.');
        }

        //Mutes user
        return args.member.addRole(roles.mute).then(() => {
            if(!args.reason){
                return message.channel.send(`***${args.member.user.tag} has been muted.***`)
            }
            return message.channel.send(`***${args.member.user.tag} has been muted for ${args.reason}.***`)
        })
    }
}
module.exports = MuteCommand;