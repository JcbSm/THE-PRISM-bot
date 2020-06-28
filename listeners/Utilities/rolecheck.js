const { Listener } = require('discord-akairo');
const config = require('../../config');

class RoleCheckListener extends Listener {
    constructor() {
        super('roleCheck', {
            emitter: 'client',
            event: 'guildMemberUpdate'
        });
    }

    exec(guildMember, newMember) {

        const roles = config.prism.guild.roles;

        if(guildMember.guild.id !== '447504770719154192') return;

        //Games
        if(roles.filter(r => r.category == 'Games').map(r => r.id).some(id => newMember.roles.cache.has(id))) {
            guildMember.roles.add('614511709339779103')
        } else {
            guildMember.roles.remove('614511709339779103')
        }

        //Levels
        if(roles.filter(r => r.category == 'Levels').map(r => r.id).some(id => newMember.roles.cache.has(id))) {
            guildMember.roles.add('578622055487111189')
        } else {
            guildMember.roles.remove('578622055487111189')
        }

        //Special
        if(roles.filter(r => r.category == 'Special').map(r => r.id).some(id => newMember.roles.cache.has(id))) {
            guildMember.roles.add('578622430386454528')
        } else {
            guildMember.roles.remove('578622430386454528')
        }

        //Other
        if(roles.filter(r => r.category == null).map(r => r.id).some(id => newMember.roles.cache.has(id))) {
            guildMember.roles.add('578286642670993428')
        } else {
            guildMember.roles.remove('578286642670993428')
        }
    }
}

module.exports = RoleCheckListener