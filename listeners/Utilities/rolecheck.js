const { Listener } = require('discord-akairo');
const config = require('../../config');

class RoleCheckListener extends Listener {
    constructor() {
        super('roleCheck', {
            emitter: 'client',
            event: 'guildMemberUpdate'
        });
    }

    exec(oldMember, newMember) {

        try{

            if(newMember.guild.id !== '447504770719154192') return;

            const [guildRoles, memberRoles, everyone] = [
                newMember.guild.roles.cache.sort((a, b) => a.rawPosition - b.rawPosition).filter(r => r !== newMember.guild.roles.everyone),
                newMember.roles.cache.sort((a, b) => a.rawPosition - b.rawPosition).filter(r => r !== newMember.guild.roles.everyone),
                newMember.guild.roles.everyone
            ];

            let arr = [{position: everyone.rawPosition, role: everyone, required: false}];

            for(const [id, role] of guildRoles) {

                role.name.startsWith('═') ? arr.push({position: role.rawPosition, role: role, required: false}) : ''
            }

            for(const [id, role] of memberRoles) {

                for(let i = 1; i < arr.length; i++) {

                    if(role.rawPosition < arr[i].position && role.rawPosition > arr[i-1].position) {
                        arr[i].required = true
                    }
                }
            }

            arr.shift()

            for(const seperator of arr) {

                if(seperator.required && !newMember.roles.cache.has(seperator.role.id)) {

                    newMember.roles.add(seperator.role.id)
                } else if(!seperator.required && newMember.roles.cache.has(seperator.role.id)) {

                    newMember.roles.remove(seperator.role.id)
                }
            }

        } catch(e) {console.log(e)}
    }
}

module.exports = RoleCheckListener