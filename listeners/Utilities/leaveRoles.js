const { Listener } = require('discord-akairo');
const { colors, prism } = require('../../config')
const { linkToMessage } = require('../../functions')

class LeaveRoleListener extends Listener {
    constructor() {
        super('leaveRole', {
            emitter: 'client',
            event: 'messageReactionRemove'
        })
    }

    async exec(messageReaction, user) {

        const rolesMessage = await linkToMessage(prism.guild.messageLinks.joinRoles, this.client)

        if(messageReaction.message !== rolesMessage) return;

        const arr = rolesMessage.embeds[0].description.split("\n-\n");
        const roleID = arr[arr.findIndex(e => e.includes(messageReaction.emoji.id))].split("•")[1].trim().replace(/\D/gi, '');

        (await messageReaction.message.guild.members.fetch(user.id)).roles.remove(roleID)
    }

}

module.exports = LeaveRoleListener;