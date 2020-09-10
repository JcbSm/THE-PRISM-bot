const { Command } = require('discord-akairo');
const { colors, prism } = require('../../../config')
const { linkToMessage } = require('../../../functions')

class RemoveRoleCommand extends Command {
    constructor() {
        super('removeRole', {
            aliases: ['removeRole'],
            args: [
                {
                    id: 'role',
                    type: 'role'
                }
            ]
        })
    }

    async exec(message, args) {

        const rolesMessage = await linkToMessage(prism.guild.messageLinks.joinRoles, this.client);

        let arr = rolesMessage.embeds[0].description.split("\n-\n").slice()

        const role = args.role;
        let element;
        if(role) {
            element = arr.splice(arr.findIndex(e => e.includes(role.id)), 1)
        } else {
            element = arr.pop()
        }

        await rolesMessage.edit('', {embed: {
            title: 'JOINABLE ROLES',
            description: arr.join("\n-\n"),
            color: colors.purple
        }})

        await rolesMessage.reactions.cache.get(element[0].split("•")[0].trim().replace(/\D/gi, '')).remove()
    }
}

module.exports = RemoveRoleCommand;