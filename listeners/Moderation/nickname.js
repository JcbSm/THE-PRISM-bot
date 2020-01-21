const { Listener } = require('discord-akairo');


class NicknameListener extends Listener {
    constructor() {
        super('nickCheck', {
            emitter: 'client',
            eventName: 'guildMemberUpdate'
        });
    }
    
    exec(oldMember, newMember) {

        if(!message.guild) return;

        if(message.guild.id !== '447504770719154192' && message.guild.id !== '569556194612740115') return;

        if(/\b(\w*nigg\w*)\b/.test(newMember.nickname.toLowerCase())) {
            newMember.setNickname(oldMember.nickname).then(this.client.users.get(newMember.user.id).send('No'))
        }
    }
}

module.exports = NicknameListener