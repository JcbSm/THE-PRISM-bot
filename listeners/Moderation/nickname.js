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

        if(/nigg/i.test(newMember.nickname.split(" ").join("").split(/\W/).join("").split("_").join("").split(/1/).join("i").split(/l/).join("i").split(/4/).join("a").split(/3/).join("e").split(/\d/).join(""))) {

            const oldNickname = oldMember.nickname ? oldMember.nickname : null

            await newMember.setNickname(oldNickname);
            (await this.client.users.fetch(newMember.user.id)).send(`*"${newMember.nickname}"* is not a nice nickname is it, so I changed it back.`)
        }
    }catch(e) {console.log(e)}
    }
}

module.exports = NicknameListener