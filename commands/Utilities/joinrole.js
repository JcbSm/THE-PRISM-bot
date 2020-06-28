const { Command } = require('discord-akairo');
const { colors, prism } = require('../../config')
const { rgb } = require('../../functions')

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

        const selfRoles = prism.guild.selfRoles;

        if(message.guild.id !== '447504770719154192') return message.reply('That Command only works in PRISM')

        if(!args.role) {

            let gameRoles = selfRoles.filter(r => r.category == 'Games')
            let otherRoles = selfRoles.filter(r => r.category === null)



                message.channel.send({ embed: {

                    type: 'rich',
                    title: `Joinable roles in PRISM`,
                    footer: {
                        text: 'Type \"-joinRole <role>\" to get the role.'
                    },
                    color: rgb(colors.purple),
                    fields: [
                        {
                            name: '**Game Roles**',
                            value: gameRoles.map(r =>r.name)
                        },
                        {
                            name: '**Other Roles**',
                            value: otherRoles.map(r => r.name)
                        }
                    ]

                }})



        } else {

            const role = args.role
            if(!role) return message.reply('No role found.')

            let joinableRole = selfRoles.find(r => r.id == role.id)

            if(!joinableRole) return message.reply(`You are not allowed to give yourself this role`)
            
            if(message.member.roles.cache.has(role.id)) {
                message.reply('You already have this role.')
            } else {
            message.member.roles.add(role.id).then(message.channel.send(`***Successfully given you the ${role.name} role.***`))
            }

        }
    } catch(error) {console.log(error)}
    }
}

module.exports = JoinRoleCommand