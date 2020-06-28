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

        let role = message.guild.roles.cache.find(r => r.name.toLowerCase().includes(args.role.toLowerCase()))

        const num = role.members.keyArray().length

        let msg = await message.channel.send("Working...")

        for(let i = 0; i < role.members.keyArray().length; i++) {

            try {
                (await message.guild.members.fetch(role.members.keyArray()[i])).roles.remove(role.id)
            } catch (error) {
                console.log(error)
            }

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