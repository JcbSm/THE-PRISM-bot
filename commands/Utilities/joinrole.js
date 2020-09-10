const { Command } = require('discord-akairo');
const { colors, prism } = require('../../config')
const { rgb, linkToMessage } = require('../../functions')

class JoinRoleCommand extends Command {
    constructor() {
        super('joinrole', {
            aliases: ['joinrole','join-role'],
            description: {
                content: 'Join a role',
                usage: 'joinrole <role>'
            },
            category: 'utilities',
            args: [
                {
                    id: 'role',
                    type: 'role',
                    match: 'rest',
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
            const arr = descArr.map(e => e.split("•")[1].trim().replace(/\D/gi, ''))

            function add(message, member, role) {
                member.roles.remove(role.id)
                message.channel.send(`***Added ${member.user.tag} to the ${role.name} role.***`)
            }

            if(arr.includes(args.role.id)) {
                message.member.roles.cache.has(args.role.id) ? message.reply('You already have this role') : add(message, message.member, args.role)
            } else {
                message.reply('You can\'t add yourself to this role.')
            }
            
        } catch(error) {console.log(error)}
    }
}

module.exports = JoinRoleCommand