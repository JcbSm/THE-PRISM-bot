const { Command } =require('discord-akairo');

class RoleCommand extends Command {
    constructor() {
        super('role', {
            aliases: ['role'],
            description: {
                    content: 'Add / remove a role from a member',
                    usage: 'role <member>'
            },
            category: 'moderation',
            args: [
                {
                    id: 'member',
                    type: 'member'
                },
                {
                    id: 'role',
                    type: 'string',
                    match: 'rest'
                }
            ],
            userPermissions: 'MANAGE_ROLES',
            clientPermissions: 'MANAGE_ROLES'
            
        })
    }
    
    exec(message, args) {

        try{
            
            if(!args.member) {
                return message.reply('No user found.')
            }

            try{
                let role = message.guild.roles.find(r => r.name.toLowerCase().includes(args.role.toLowerCase()))


                if(args.member.roles.some(role => role.name.toLowerCase() === args.role.toLowerCase())) {

                    args.member.removeRole(role.id)
                    message.channel.send(`***Successfully removed \'${role.name}\' from ${args.member.user.tag}***`)

                } else {

                    args.member.addRole(role.id)
                    message.channel.send(`***Successfully given ${args.member.user.tag} the \'${role.name}\' role***`)

                }
            } catch {

                message.reply('No role found.')                
            }
        } catch {

            return message.reply('I don\'t have permission to do that.')
        }
    }
}

module.exports = RoleCommand;