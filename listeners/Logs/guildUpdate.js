const { Listener } = require('discord-akairo');
const config = require('../../config');
const { rgb } = require('../../functions');

class GuildUpdateListener extends Listener {
    constructor() {
        super('guildUpdate', {
            emitter: 'client',
            event: 'guildUpdate'
        })
    }
    
    async exec(oldGuild, newGuild) {
try{
        const guild = oldGuild;
        const log = await this.client.channels.fetch(config.prism.guild.channelIDs.log);
        
        if(!guild) return;
        if(guild.id !== config.prism.guild.id) return;

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
                color: rgb(config.colors.purple),
                timestamp: new Date(),
                tumbnail: null,
                image: null,
                video: null,
                author: {
                    name: member.user.tag,
                    icon_url: member.user.avatarURL()
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
    }catch(e){console.log(e)}
    }
}

module.exports = GuildUpdateListener;