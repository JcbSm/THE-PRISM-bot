const { Command } = require('discord-akairo');
const { colors, prism } = require('../../../config')
const { linkToMessage } = require('../../../functions')

class AddRoleCommand extends Command {
    constructor() {
        super('addRole', {
            aliases: ['addRole'],
            args: [
                {
                    id: 'role',
                    type: 'role'
                },
                {
                    id: 'emojiID',
                    type: 'string'
                },
                {
                    id: 'position',
                    type: 'number'
                }
            ]
        })
    }

    async exec(message, args) {

        try{

            const rolesMessage = await linkToMessage(prism.guild.messageLinks.joinRoles, this.client);
            const role = args.role;
            const emoji = this.client.emojis.cache.get(args.emojiID)

            if(!role || !emoji) {
                message.reply('Something went wrong')
            }

            let arr = rolesMessage.embeds[0].description.split("\n-\n").slice()
            arr.shift()

            const pos = args.position ? args.position-1 : arr.length

            arr.splice(pos, 0, `${emoji} • ${role}`)

            await rolesMessage.edit('', {embed: {
                title: 'JOINABLE ROLES',
                description: 'React with an emoji to get the role.\n-\n' + arr.join("\n-\n"),
                color: colors.purple
            }})

            await rolesMessage.react(emoji.id)

        } catch(err) {console.log(err)}
    }
}

module.exports = AddRoleCommand;