const { Listener } = require('discord-akairo');

class LevelUpListener extends Listener {
    constructor() {
        super('levelUp', {
            emitter: 'client',
            event: 'levelUp'
        })
    }

    async exec(member, level) {

        (await this.client.channels.fetch(prism.guild.channelIDs.levelUps)).send({
            embed: {
                title: 'LEVEL UP!',
                description: `${member} you reached level ${level}! <:pogchamp:519201541274730496>`,
                timestamp: new Date(),
                footer: {
                    text: member.user.tag
                },
                color: colors.purple
            }
        })
    }
}

module.exports = LevelUpListener;