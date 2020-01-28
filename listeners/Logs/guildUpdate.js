const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
const moment = require('moment')
const color = require('../../datafiles/colors.json')
const Color = require('color')

class GuildUpdateListener extends Listener {
    constructor() {
        super('guildUpdate', {
            emitter: 'client',
            eventName: 'guildUpdate'
        })
    }
    
    async exec(oldGuild, newGuild) {

        const guild = oldGuild;
        const log = this.client.channels.get('669653850902233098');
        const time = moment(Date.now()).format('DD MMM YYYY, HH:mm')
        
        if(!guild) return;
        if(guild.id !== '447504770719154192') return;

        function rgb(inputColor) {
            return Color(inputColor).rgbNumber()
        }

        const fetchedLogs = await guild.fetchAuditLogs( {
            limit: 1,
            type: 'GUILD_UPDATE',
        });
        const updateLog = fetchedLogs.entries.first();

        console.log(updateLog)


        if(!updateLog) {
            
            await log.send({embed: {
            
                type: 'rich',
                title: null,
                description: `**Guild updated**`,
                url: null,
                color: rgb(color.purple),
                timestamp: new Date(),
                tumbnail: null,
                image: null,
                video: null,
                author: {
                    name: member.user.tag,
                    icon_url: member.user.avatarURL
                    },
                provider: null,
                footer: {
                text: `ID: ${member.user.id}`
                }
    
            }})

        } else if(updateLog) {

            const { executor, changes } = updateLog;

            //console.log(changes)

            let changesFields = []

            for(let ch of changes) {

                changesFields.push({
                    name: `**${ch.key}**`,
                    value: `Old: **${ch.old}**\n\nNew: **${ch.new}**`
                })
            }

            console.log(changesFields)
            try{

            await log.send({embed: {
            
                type: 'rich',
                title: null,
                description: `**Guild updated by ${executor}**`,
                url: null,
                color: rgb(color.purple),
                fields: changesFields,
                timestamp: new Date(),
                tumbnail: null,
                image: null,
                video: null,
                author: {
                    name: executor.tag,
                    icon_url: executor.avatarURL
                    },
                provider: null,
                footer: {
                text: `ID: ${executor.id}`
                }
    
            }})
        }catch(error){console.log(error)}
        }
    }
}

module.exports = GuildUpdateListener;