const { Command } = require('discord-akairo');

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
            },
            category: 'moderation'
        });
    }

    exec(message, args) {

        let mutedRole = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        
        //If targeted use not found or isn't muted
        if(!args.member || !args.member.roles.cache.some(role => role.name.toLowerCase() === 'muted')) {
            return message.reply('No muted user found.');
        }

        //Unmutes target memeber.
        return args.member.roles.remove(mutedRole).then(() => {
            return message.channel.send(`***${args.member.user.tag} has been unmuted.***`);
        });
    }
}
module.exports = UnmuteCommand;