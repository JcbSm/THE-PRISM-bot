const { Command } = require('discord-akairo');
const roles = require('../roles.json')

class UnmuteCommand extends Command {
    constructor() {
        super('unmute', {
            aliases: ['unmute'],
            args: [
                {
                    id: 'member',
                    type: 'member'
                }
            ],
            clientPermission: ['MANAGE_ROLES'],
            channelRestriction: 'guild',
            userPermissions: ['MANAGE_ROLES'],
            description: {
                content: 'Unmutes a muted user, *requires \'manage roles\' permission.*',
                usage: 'unmute <user>'
            }
        });
    }

    exec(message, args) {
        
        //If targeted use not found or isn't muted
        if(!args.member || !args.member.roles.some(role => role.id === roles.mute)) {
            return message.reply('No muted user found.');
        }

        //Unmutes target memeber.
        return args.member.removeRole('448436476229713921').then(() => {
            return message.channel.send(`***${args.member.user.tag} has been unmuted.***`);
        });
    }
}
module.exports = UnmuteCommand;