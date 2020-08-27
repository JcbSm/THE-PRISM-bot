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

            if(newMember.guild.id !== '447504770719154192') return;

            const everyone = newMember.guild.roles.everyone;

            function sortRoles(roleManager) {

                return roleManager.cache.filter(r => r !== everyone).sort((a, b) => a.rawPosition - b.rawPosition);
            }

            const [guildRoles, memberRoles] = [sortRoles(newMember.guild.roles), sortRoles(newMember.roles)]

            let arr = [{role: everyone, required: false}];

            for(const [id, role] of guildRoles) {

                role.name.startsWith('═') && arr.push({role: role, required: false})
            }

            for(const [id, role] of memberRoles) {

                for(let i = 1; i < arr.length; i++) {

                    if(role.rawPosition < arr[i].role.rawPosition && role.rawPosition > arr[i-1].role.rawPosition) {
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