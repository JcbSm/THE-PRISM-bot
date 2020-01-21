const { Listener } = require('discord-akairo');


class NicknameListener extends Listener {
    constructor() {
        super('nickCheck', {
            emitter: 'client',
            eventName: 'guildMemberUpdate'
        });
    }
    
    exec(oldMember, newMember) {

        if(!newMember.guild) return;

        if(!newMember.nickname) return;

        if(newMember.guild.id !== '447504770719154192' && newMember.guild.id !== '569556194612740115') return;

        if(/\b(\w*nigg\w*)\b/.test(newMember.nickname.toLowerCase())) {

            let oldNickname;

            if(!oldMember.nickname) {
                oldNickname = ""
            } else {
                oldNickname = oldMember.nickname
            }

            newMember.setNickname(oldNickname).then(this.client.users.get(newMember.user.id).send('No'))
        }
    }
}

module.exports = NicknameListener