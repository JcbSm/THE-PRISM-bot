const { Command } = require('discord-akairo');
const roles = require('../../datafiles/self-roles.js')
const color = require('../../datafiles/colors.json');
const Discord = require('discord.js');

class JoinRoleCommand extends Command {
    constructor() {
        super('joinrole', {
            aliases: ['joinrole','join-role'],
            description: {
                content: 'Join a role',
                usage: 'joinrole <role>'
            },
            category: 'Utilities',
            args: [
                {
                    id: 'role',
                    match: 'rest'
                }
            ]
        })
    }

    async exec(message, args) {

        if(message.guild.id !== '447504770719154192') return message.reply('That Command only works in PRISM')

        if(!args.role) {

            let gameRoles = roles.filter(r => r.category == 'Games')
            let otherRoles = roles.filter(r => r.category === null)

            try{let selfRoleEmbed = new Discord.RichEmbed()

                .setTitle('Joinable Roles in PRISM')
                .setFooter('Type \"-joinRole <role>\" to get the role.')
                .setColor(color.purple)
                .addField('**Game Roles**', gameRoles.map(r => r.name))
                .addField('**Other Roles**', otherRoles.map(r => r.name))

            message.channel.send(selfRoleEmbed)
            }catch(error)
            {console.log(error)}

        } else {

            const role = (await message.guild.fetchMembers()).roles.find(r => r.name.toLowerCase().includes(args.role.toLowerCase()))
            if(!role) return message.reply('No role found.')

            let joinableRole = roles.find(r => r.id == role.id)

            if(!joinableRole) return message.reply(`You are not allowed to give yourself this role`)
            
            if(message.member.roles.has(role.id)) {
                message.reply('You already have this role.')
            } else {
            message.member.addRole(role.id).then(message.channel.send(`***Successfully given you the ${role.name} role.***`))
            }

        }
    }
}

module.exports = JoinRoleCommand