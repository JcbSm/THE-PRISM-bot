const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
const moment = require('moment')
const color = require('../../datafiles/colors.json')
const Color = require('color')

class MemberUpdateListener extends Listener {
    constructor() {
        super('guildMemberUpdate', {
            emitter: 'client',
            eventName: 'guildMemberUpdate'
        })
    }
    
    async exec(oldMember, newMember) {

        if(!oldMember.guild) return;

        const log = this.client.channels.get('669653850902233098');
        const time = moment(Date.now()).format('DD MMM YYYY, HH:mm')
        const guild = oldMember.guild

        function rgb(inputColor) {
            return Color(inputColor).rgbNumber()
        }

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
                color: rgb(color.purple),
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

            if(oldMember.roles.keyArray().length < newMember.roles.keyArray().length) {

                const addedRoleID = newMember.roles.keyArray().find(r => !oldMember.roles.keyArray().includes(r));
                const addedRole = guild.roles.get(addedRoleID)

                await log.send({embed: {
                
                    type: 'rich',
                    title: null,
                    description: `**Given ${addedRole} to ${oldMember}**`,
                    url: null,
                    color: rgb(color.purple),
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

            if(oldMember.roles.keyArray().length > newMember.roles.keyArray().length) {
                console.log("Role removed")

                const removedRoleID = oldMember.roles.keyArray().find(r => !newMember.roles.keyArray().includes(r));
                const removedRole = guild.roles.get(removedRoleID)

                await log.send({embed: {
                
                    type: 'rich',
                    title: null,
                    description: `**Removed ${removedRole} from ${oldMember}**`,
                    url: null,
                    color: rgb(color.purple),
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
    }
}

module.exports = MemberUpdateListener;