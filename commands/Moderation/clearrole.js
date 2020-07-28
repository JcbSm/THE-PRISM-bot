const { Command } = require('discord-akairo');
const { rgb } = require('../../functions')
const { colors } = require('../../config')

class ClearRoleCommand extends Command {
    constructor() {
        super('clearrole', {
            aliases: ['clearrole','clear-role'],
            description: {
                content: 'Removes every member from this role',
                usage: 'clearrole <role>'
            },
            category: 'moderation',
            args: [
                {
                    id: 'role',
                    match: 'rest'
                }
            ],
            userPermissions: 'ADMINISTRATOR'
        })
    }

    async exec(message, args) {

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase().includes(args.role.toLowerCase()))
        let num = 0
        let msg = await message.channel.send("Working...")

        for(const [ID, member] of role.members) {

            await member.roles.remove(role.id)
            console.log(`Cleared ${member.user.tag}`);
            num++;
        }

        await msg.delete()

        await message.channel.send({ embed: {

            type: 'rich',
            color: rgb(colors.purple),
            title: '**Role Cleared**',
            description: `Cleared **${num}** members from ${role}`
            
        }})

        console.log(`Cleared ${num}`)

        
    }
}

module.exports = ClearRoleCommand