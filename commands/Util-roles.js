const { Command } = require('discord-akairo');
const roles = require('../roles.json')

class RolesCommand extends Command {
    constructor() {
        super('roles', {
            aliases: ['roles'],
            channelRestriction: 'guild'
        })
    }

    exec(message) {

        message.channel.send('***Work in progress***')
    }
}

module.exports = RolesCommand