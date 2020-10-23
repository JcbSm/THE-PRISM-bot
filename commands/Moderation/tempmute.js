const { Command } = require('discord-akairo');
const { parseTime } = require('../../functions');
const { colors, prism } = require('../../config')

class TempMuteCommand extends Command {
    constructor() {
        super('tempMute', {
            aliases: ['tempmute'],
            args: [
                {
                    id: 'member',
                    type: 'member'
                },
                {
                    id: 'time',
                    type: 'string',
                    match: 'rest'
                }
            ],
            description: {
                content: 'Mute a member for a specified time',
                usage: 'tempmute <member> <time>'
            },
            category: 'moderation',
            userPermissions: 'MANAGE_ROLES'
        })
    }

    async exec(message, args) {

        if(message.guild.id !== prism.guild.id) return message.reply('That command is only available in PRISM.')

        const member = args.member
        if(!member) return message.reply('No user found');

        const DB = this.client.db;
        const data = (await DB.query(`SELECT temp_mute_timestamp FROM tbl_users WHERE user_id = ${member.id}`)).rows[0];

        if(!data) return message.reply('Cannot mute someone who isn\'t on the database')

        if(data.temp_mute_timestamp > Date.now()) return message.reply('This user is already temp muted.');

        let milli = 0;
        const time = parseTime(args.time);
        const str = [`${time.d}d`, `${time.h}h`, `${time.m}m`]
        milli += time.m*1000*60
        milli += time.h*1000*60*60
        milli += time.d*1000*60*60*24

        if(milli == 0) return message.reply('Please specify a valid time to mute the member.')

        await DB.query(`UPDATE tbl_users SET temp_mute_timestamp = ${message.createdTimestamp+milli} WHERE user_id = ${member.id}`, (err, res) => {

            if(err) return message.reply('An error occurred.');

            this.client.emit('tempMute', member, message.createdTimestamp+milli)

            message.channel.send({ embed: {
    
                title: 'Member Muted',
                description: `${member} was muted by ${message.author}`,
                fields: [
                    {
                        name: 'Time Period',
                        value: `\`${str.join(" ")}\``
                    }
                ],
                footer: {
                    text: 'They will be unmuted'
                },
                thumbnail: {
                    url: member.user.displayAvatarURL()
                },
                color: colors.bad,
                timestamp: message.createdTimestamp + milli
            }})
        })
    }
}

module.exports = TempMuteCommand