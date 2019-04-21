/* const { Command } = require('discord-akairo');
const Discord = require('discord.js')
const color = require('../colors.json')
const roles = require('../roles.json')

class RolesCommand extends Command {
    constructor() {
        super('roles', {
            aliases: ['roles'],
            channelRestriction: 'guild',
            args: [
                {
                    id: 'option',
                    type: ['list', 'join', 'leave'],
                    default: 'list'
                },
                {
                    id: 'role',
                    type: 'string'
                }
            ]
        })
    }

    exec(message, args) {

        if(args.option === 'list') {

            let roleListEmbed = new Discord.RichEmbed()

            .setTitle('Roles')
            .setColor(color.purple)
            .addField('Roles', 'Revision\nLuke\'s 18th')

            message.channel.send(roleListEmbed)
        }
        message.channel.send('***Work in progress***')
    }
}

module.exports = RolesCommand */