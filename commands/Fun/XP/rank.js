const { Command } = require('discord-akairo');
const { prism, xpArray, colors, embeds} = require('../../../config');
const { groupDigits, pad } = require('../../../functions')
const { createCanvas, loadImage } = require('canvas')
const Discord = require('discord.js')

class RankCommand extends Command {
    constructor() {
        super('rank', {
            aliases: ['rank'],
            args: [
                {
                    id: 'member',
                    type: 'member'
                }
            ],
            category: 'stats',
            description: {
                content: 'Displays the Level and progress of the given member.',
                usage: 'rank <member>'
            }
        })
    }

    async exec(message, args) {

        const DB = this.client.db;

        try{

            const member = args.member ? args.member : message.member

            const data = (await DB.query(`SELECT * FROM tbl_users WHERE user_id = ${member.id}`)).rows[0]
            if(!data) return message.reply('No data to view')

            //Colours
            const colors = {
                bg: '#242424',
                outline: '#ffffff',
                border: '#1c1c1c',
                main: '#944ad3'
            }

            const canvas = createCanvas(640, 192)
            const ctx = canvas.getContext('2d')

            const avatar = await loadImage(member.user.displayAvatarURL({size: 128, format: 'png'}));
            let statusColor;
            switch(member.user.presence.status) {
                case 'online':
                    statusColor = '#5cb85c'
                    break;
                case 'idle':
                    statusColor = '#f0ad4e'
                    break;
                case 'dnd':
                    statusColor = '#d9454f'
                    break;
                case 'offline':
                    statusColor = '#545454'
                    break;
            }
        
            ctx.save()

            //Fill BG
            ctx.fillStyle = colors.bg
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            //Outline
            ctx.lineWidth = 10
            ctx.strokeStyle = colors.border
            ctx.strokeRect(0, 0, canvas.width, canvas.height)

            //Draw Avatar
            ctx.beginPath();
            ctx.arc(96, 96, 64, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatar, 32, 32, 128, 128)

            ctx.restore()

            //Outline Avatar
            ctx.beginPath();
            ctx.arc(96, 96, 70, 0, Math.PI * 2, true);
            ctx.strokeStyle = colors.outline
            ctx.lineWidth = 2;
            ctx.stroke();

            //Status
            ctx.beginPath();
            ctx.arc(144, 144, 18, 0, Math.PI * 2, true);
            ctx.fillStyle = statusColor;
            ctx.fill();
            ctx.strokeStyle = colors.bg
            ctx.lineWidth = 4;
            ctx.stroke();
            
            //Bar constants
            const [barX, barY, barRad, barLen] = [192, 128, 16, 400]
            const minXP = xpArray[data.level];
            const maxXP = xpArray[data.level +1];
            const currentXP = data.xp-minXP;
            const progress = (data.xp - minXP)/(maxXP - minXP)

            //Outline Bar
            ctx.beginPath();
            ctx.arc(barX, barY, (barRad+2), -Math.PI/2, Math.PI/2, true);
            ctx.lineTo(barX+barLen, barY+(barRad+2));
            ctx.arc(barX+barLen, barY, (barRad+2), Math.PI/2, -Math.PI/2, true);
            ctx.lineTo(barX, barY-(barRad+2));
            ctx.strokeStyle = colors.outline;
            ctx.lineWidth = 2;
            ctx.stroke();

            //Fill Bar
            let newBarLen = barLen * progress
            ctx.beginPath();
            ctx.arc(barX, barY, (barRad-2), -Math.PI/2, Math.PI/2, true);
            ctx.lineTo(barX+newBarLen, barY+(barRad-2));
            ctx.arc(barX+newBarLen, barY, (barRad-2), Math.PI/2, -Math.PI/2, true);
            ctx.lineTo(barX, barY-(barRad-2));
            ctx.fillStyle = colors.main;
            ctx.fill();

            //Text
            const applyText = (canvas, text, size) => {
                const ctx = canvas.getContext('2d');
                let fontSize = size;
                do {
                    ctx.font = `${fontSize -= 5}px bahnschrift`;
                } while (ctx.measureText(text).width > barLen);
                return ctx.font;
            };

            //Name
            ctx.font = applyText(canvas, member.user.tag, 32);
            ctx.fillStyle = colors.outline;
            ctx.fillText(member.user.tag, barX, barY-barRad-10)

            //Progress
            const progStr = `${groupDigits(currentXP)} / ${groupDigits(maxXP - minXP)} xp`
            ctx.font = applyText(canvas, progStr, 26);
            ctx.fillStyle = '#ababab';
            ctx.fillText(progStr, barX, barY+barRad+28)
            
            //Level
            ctx.font = '48px bahnschrift';
            const textWidth = ctx.measureText(`Level ${data.level}`).width;
            ctx.fillStyle = colors.main
            ctx.fillText(`Level ${data.level}`, 608-textWidth, 52)

            

            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'Rank-.png');

	        message.channel.send('', attachment);

        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = RankCommand