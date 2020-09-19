const { Listener } = require('discord-akairo');
const { colors, prism } = require('../../config')

class LevelUpListener extends Listener {
    constructor() {
        super('levelUp', {
            emitter: 'client',
            event: 'levelUp'
        })
    }

    async exec(member, level) {
        
        try{

            const DB = this.client.db;

            // Update Level

            await DB.query(`UPDATE tbl_users SET level = ${level + 1} WHERE user_id = ${member.id}`);

            // Send Message

            (await this.client.channels.fetch(prism.guild.channelIDs.levelUps)).send({
                embed: {
                    title: 'LEVEL UP!',
                    description: `${member} you reached level ${level + 1}! <:pogchamp:519201541274730496>`,
                    timestamp: new Date(),
                    footer: {
                        text: member.user.tag
                    },
                    color: colors.purple
                }
            })

            // Sort Roles

            const guild = await this.client.guilds.fetch(prism.guild.id);

            const levelRoles = guild.roles.cache.filter(r => r.name.match(/^Level \d{1,}$/i)).sort((a, b) => a.rawPosition - b.rawPosition)
            
            for(const [id, role] of levelRoles) {

                const roleLevel = Number(role.name.split(" ")[1])

                if(level + 1 >= roleLevel && !member.roles.cache.has(id)) {

                    member.roles.add(id)
                    
                } else if(level + 1 < roleLevel && member.roles.cache.has(id)) {

                    member.roles.remove(id)
                }
            }

        } catch(err) {
            console.log(err)
        }
    }
}

module.exports = LevelUpListener;