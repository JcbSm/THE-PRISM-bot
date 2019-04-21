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
                }
            ],
            clientPermission: ['MANAGE_ROLES'],
            channelRestriction: 'guild'
        });
    }
    
    //Checks for moderator role
    userPermissions(message) {
        return message.member.roles.some(role => role.id === roles.mod);
    }

    exec(message, args) {

        //Checks for target
        if(!args.member) {
            return message.reply('No user found.');
        }

        //Mutes user
        return args.member.addRole(roles.mute).then(() => {
            return message.channel.send(`***${args.member.user.tag} has been muted.***`)
        })
    }
}
module.exports = MuteCommand;