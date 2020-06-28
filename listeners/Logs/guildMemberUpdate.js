const { Listener } = require('discord-akairo');
const config = require('../../config');
const { rgb } = require('../../functions');

class MemberUpdateListener extends Listener {
    constructor() {
        super('guildMemberUpdate', {
            emitter: 'client',
            event: 'guildMemberUpdate'
        })
    }
    
    async exec(oldMember, newMember) {
try{
        const log = await this.client.channels.fetch(config.prism.guild.channelIDs.log);
        const guild = oldMember.guild;

        if(!guild) return;
        if(guild.id !== config.prism.guild.id) return;


        //Change Nickname
        if(oldMember.nickname !== newMember.nickname) {

            let oldNick;
            if(!oldMember.nickname) {
                oldNick = "null"
            } else {
                oldNick = oldMember.nickname
            }

            let newNick;
            if(!newMember.nickname) {
                newNick = "null"
            } else {
                newNick = newMember.nickname
            }

            await log.send({embed: {
                
                type: 'rich',
                title: null,
                description: `**${oldMember} changed their nickname**`,
                url: null,
                color: rgb(config.colors.purple),
                fields: [
                    {
                        name: '**Before:**',
                        value: oldNick
                    },
                    {
                        name: '**After:**',
                        value: newNick
                    }
                ],
                timestamp: new Date(),
                tumbnail: null,
                image: null,
                video: null,
                author: {
                    name: newMember.user.tag,
                    icon_url: newMember.user.avatarURL
                    },
                provider: null,
                footer: {
                    text: `ID: ${newMember.user.id}`
                }

            }})
                    }

        //Roles updated
        if(oldMember.roles !== newMember.roles) {

            if(oldMember.roles.cache.keyArray().length < newMember.roles.cache.keyArray().length) {

                const addedRoleID = newMember.roles.cache.keyArray().find(r => !oldMember.roles.cache.keyArray().includes(r));
                const addedRole = await guild.roles.fetch(addedRoleID);

                await log.send({embed: {
                
                    type: 'rich',
                    title: null,
                    description: `**Given ${addedRole} to ${oldMember}**`,
                    url: null,
                    color: rgb(config.colors.purple),
                    fields: [],
                    timestamp: new Date(),
                    tumbnail: null,
                    image: null,
                    video: null,
                    author: {
                        name: newMember.user.tag,
                        icon_url: newMember.user.avatarURL
                        },
                    provider: null,
                    footer: {
                        text: `ID: ${newMember.user.id}`
                    }
    
                }})
            }

            if(oldMember.roles.cache.keyArray().length > newMember.roles.cache.keyArray().length) {

                const removedRoleID = oldMember.roles.cache.keyArray().find(r => !newMember.roles.cache.keyArray().includes(r));
                const removedRole = await guild.roles.fetch(removedRoleID);

                await log.send({embed: {
                
                    type: 'rich',
                    title: null,
                    description: `**Removed ${removedRole} from ${oldMember}**`,
                    url: null,
                    color: rgb(config.colors.purple),
                    fields: [],
                    timestamp: new Date(),
                    tumbnail: null,
                    image: null,
                    video: null,
                    author: {
                        name: newMember.user.tag,
                        icon_url: newMember.user.avatarURL
                        },
                    provider: null,
                    footer: {
                        text: `ID: ${newMember.user.id}`
                    }
    
                }})
            }
        }
}catch(e){console.log(e)}
    }
}

module.exports = MemberUpdateListener;