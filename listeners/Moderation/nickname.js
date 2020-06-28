const { Listener } = require('discord-akairo');
const config = require('../../config');

class NicknameListener extends Listener {
    constructor() {
        super('nick', {
            emitter: 'client',
            event: 'guildMemberUpdate'
        });
    }
    
    async exec(oldMember, newMember) {
try{
        if(!newMember.guild) return;

        if(!newMember.nickname) return;

        if(newMember.guild.id !== config.prism.guild.id && newMember.guild.id !== '569556194612740115') return;

        if(/\b(\w*nn*ii*ggg*\w*)\b/.test(newMember.nickname.toLowerCase().split(" ").join(""))) {

            let naughtyName = newMember.nickname;
            let oldNickname;

            if(!oldMember.nickname) {
                oldNickname = ""
            } else {
                oldNickname = oldMember.nickname
            }

            await newMember.setNickname(oldNickname);
            (await this.client.users.fetch(newMember.user.id)).send(`*"${naughtyName}"* is not a nice nickname is it, so I changed it back.`)
        }
    }catch(e) {console.log(e)}
    }
}

module.exports = NicknameListener