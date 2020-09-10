const { Command } = require('discord-akairo');
const { prism } = require('../../config')
const { linkToMessage } = require('../../functions')


class LeaveRoleCommand extends Command {
    constructor() {
        super('leaverole', {
            aliases: ['leaverole','leave-role'],
            description: {
                content: 'Remove a joinable role',
                usage: 'leaverole <role>'
            },
            category: 'utilities',
            args: [
                {
                    id: 'role',
                    type: 'role',
                    match: 'rest'
                }
            ]
        })
    }

    async exec(message, args) {

        try{

            if(message.guild.id !== prism.guild.id) return;

            const rolesMessage = await linkToMessage(prism.guild.messageLinks.joinRoles, this.client)

            const descArr = rolesMessage.embeds[0].description.split("\n-\n")

            descArr.shift();
            console.log(true)
            const arr = descArr.map(e => e.split("•")[1].trim().replace(/\D/gi, ''))

            function remove(message, member, role) {
                member.roles.remove(role.id)
                message.channel.send(`***Removed ${member.user.tag} to the ${role.name} role.***`)
            }

            if(arr.includes(args.role.id)) {
                message.member.roles.cache.has(args.role.id) ? remove(message, message.member, args.role) : message.reply('You already don\'t have this role')
            } else {
                message.reply('You can\'t remove yourself from this role.')
            }

        } catch(e) {console.log9e}
    }
}

module.exports = LeaveRoleCommand