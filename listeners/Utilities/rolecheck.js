const { Listener } = require('discord-akairo');
const roles = require('../../datafiles/roles')

class RoleCheckListener extends Listener {
    constructor() {
        super('roleCheck', {
            emitter: 'client',
            eventName: 'guildMemberUpdate'
        });
    }

    exec(guildMember, newMember) {

        if(guildMember.guild.id !== '447504770719154192') return;

        //Games
        if(roles.filter(r => r.category == 'Games').map(r => r.id).some(id => newMember.roles.has(id))) {
            guildMember.addRole('614511709339779103')
        } else {
            guildMember.removeRole('614511709339779103')
        }

        //Levels
        if(roles.filter(r => r.category == 'Levels').map(r => r.id).some(id => newMember.roles.has(id))) {
            guildMember.addRole('578622055487111189')
        } else {
            guildMember.removeRole('578622055487111189')
        }

        //Economy
        if(roles.filter(r => r.category == 'Economy').map(r => r.id).some(id => newMember.roles.has(id))) {
            guildMember.addRole('578622178979872778')
        } else {
            guildMember.removeRole('578622178979872778')
        }

        //Special
        if(roles.filter(r => r.category == 'Special').map(r => r.id).some(id => newMember.roles.has(id))) {
            guildMember.addRole('578622430386454528')
        } else {
            guildMember.removeRole('578622430386454528')
        }

        //Other
        if(roles.filter(r => r.category == null).map(r => r.id).some(id => newMember.roles.has(id))) {
            guildMember.addRole('578286642670993428')
        } else {
            guildMember.removeRole('578286642670993428')
        }
    }
}

module.exports = RoleCheckListener