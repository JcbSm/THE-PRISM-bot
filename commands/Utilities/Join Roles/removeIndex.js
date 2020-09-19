const { Command } = require('discord-akairo');
const { colors, prism } = require('../../../config')
const { linkToMessage } = require('../../../functions')

class RemoveIndexCommand extends Command {
    constructor() {
        super('removeIndex', {
            aliases: ['removeIndex'],
            args: [
                {
                    id: 'index',
                    type: 'number'
                }
            ],
            userPermissions: 'ADMINISTRATOR'
        })
    }

    async exec(message, args) {

        const rolesMessage = await linkToMessage(prism.guild.messageLinks.joinRoles, this.client);

        let arr = rolesMessage.embeds[0].description.split("\n-\n").slice()

        let element;
        if(args.index) {
            element = arr.splice(args.index, 1)
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

module.exports = RemoveIndexCommand;