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
                    type: 'role',
                    match: 'rest'
                }
            ],
            userPermissions: 'MANAGE_ROLES',
            clientPermissions: 'MANAGE_ROLES'
            
        })
    }
    
    async exec(message, args) {

            
            if(!args.member) return message.reply('No user found.')

            if(!args.role) return message.reply('No role found.');

            try{
                let role = args.role
                let botMember = await message.guild.members.fetch(this.client.user.id)

                //console.log(static .comparePositions(role, botMember.roles.highest))

                if(role.calculatedPosition >= botMember.roles.highest.calculatedPosition && message.member.id) {
                    return message.reply('I don\'t have the required permissions to perform such an action.')
                } else if(role.calculatedPosition >= message.member.roles.highest.calculatedPosition && message.member.id !== this.client.ownerID) {
                    return message.reply('You can\'t give or remove roles higher or equal to your own.')
                } else {


                if(args.member.roles.cache.has(role.id)) {

                    args.member.roles.remove(role.id)
                    message.channel.send(`***Successfully removed \'${role.name}\' from ${args.member.user.tag}***`)

                } else {

                    args.member.roles.add(role.id)
                    message.channel.send(`***Successfully given ${args.member.user.tag} the \'${role.name}\' role***`)

                } 
            }
            } catch(error) {
                console.log(error)              
            }
    }
}

module.exports = RoleCommand;