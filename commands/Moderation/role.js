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
    
    async exec(message, args) {

            
            if(!args.member) {
                return message.reply('No user found.')
            }

            try{
                let role = await message.guild.roles.find(r => r.name.toLowerCase().includes(args.role.toLowerCase()))
                let botMember = await message.guild.fetchMember(this.client.user.id)

                if(role.calculatedPosition >= botMember.highestRole.calculatedPosition && message.member.id) {
                    return message.reply('I don\'t have the required permissions to perform such an action.')
                } else if(role.calculatedPosition >= message.member.highestRole.calculatedPosition && message.member.id !== this.client.ownerID) {
                    return message.reply('You can\'t give or remove roles higher or equal to your own.')
                } else {


                if(args.member.roles.has(role.id)) {

                    args.member.removeRole(role.id)
                    message.channel.send(`***Successfully removed \'${role.name}\' from ${args.member.user.tag}***`)

                } else {

                    args.member.addRole(role.id)
                    message.channel.send(`***Successfully given ${args.member.user.tag} the \'${role.name}\' role***`)

                } 
            }
            } catch(error) {
                console.log(error)
                message.reply('No role found.')                
            }
    }
}

module.exports = RoleCommand;