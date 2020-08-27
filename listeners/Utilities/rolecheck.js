const { Listener } = require('discord-akairo');

class RoleCheckListener extends Listener {
    constructor() {
        super('roleCheck', {
            emitter: 'client',
            event: 'guildMemberUpdate'
        });
    }

    exec(oldMember, newMember) {

        try{

            if(newMember.guild.id !== '447504770719154192' || newMember.roles.cache.keyArray().join("") === oldMember.roles.cache.keyArray().join("")) return;

            console.log("running")

            let separatorRequired = false

            for(const [id, role] of newMember.guild.roles.cache.sort((a, b) => a.rawPosition - b.rawPosition)) {

                if(role.name.startsWith("═")) {

                    if(separatorRequired && !newMember.roles.cache.has(id)) {

                        newMember.roles.add(role)
                    } else if(!separatorRequired && newMember.roles.cache.has(id)) {

                        newMember.roles.remove(role)
                    }
                    separatorRequired = false

                } else if(id !== newMember.guild.roles.everyone.id) {

                    separatorRequired = separatorRequired || newMember.roles.cache.has(id)
                }
            }

        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = RoleCheckListener