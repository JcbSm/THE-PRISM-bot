const { Command } = require('discord-akairo');
const { hex } = require('../../../functions')
const { prism, colors, embeds } = require('../../../config')
const Discord = require('discord.js')

class RankCardCommand extends Command {
    constructor() {
        super('rankCard', {
            aliases: ['rankcard'],
            args: [
                {
                    id: 'option',
                },
                {
                    id: 'value',
                    match: 'rest'
                }
            ],
            description: {
                content: 'Allows you to edit the look of your rank card\nOptions: "colour", "background"',
                usage: 'rankcard <option> <value>'
            },
            category: 'stats'
        })
    }

    async exec(message, args) {

        try{

            const DB = this.client.db;

            let data = (await DB.query(`SELECT * FROM tbl_users WHERE user_id = ${message.author.id}`)).rows[0]
            //console.log(data)
            if(!data) return message.reply('You\'re not on the database.');

            switch (args.option) {

                default:
                    message.reply("Unkown option...")
                    break;

                case 'color':
                case 'colour':

                    if(!args.value) {

                        return message.reply(`Your current Rank Card colour is \`${data.rank_card_color_main}\``)
                    }

                    try {

                        let hexVal;

                        if(args.value.toLowerCase() === 'default' || args.value.toLowerCase() === 'reset') {
                            hexVal = '#944AD3'
                        } else {
                            hexVal = hex(args.value)
                        }
                        
                        await DB.query(`UPDATE tbl_users SET rank_card_color_main = '${hexVal}' WHERE user_id = ${message.author.id}`)
                        message.channel.send(`***Changed your rank card's main colour to \`${hexVal}\`***`)
                        
                    } catch(e) {
                        message.reply('Unable to resolve a colour.')
                    }

                    break;

                case 'bg':
                case 'background':

                    const items = prism.guild.shop.categories.find(c => c.id === 'backgrounds').items
                    const current = items.find(i => i.id === data.rank_card_background_id)
                    const attachment = current.id > 0 ? new Discord.MessageAttachment(`./assets/images/backgrounds/${current.file}`, current.file) : null

                    if(!args.value) {
                        try{
                        const embed = {
                            title: 'Available backgrounds',
                            description: items.map(i => `**ID: \`${i.id}\`** • **NAME:** *"${i.name}"*`).join("\n"),
                            fields: [
                                {
                                    name: 'Current Background',
                                    value: `**ID: \`${current.id}\`** • **NAME:** *"${current.name}"*`
                                }
                            ],
                            color: colors.purple
                        }

                        if(current.id > 0) {

                            embed.image = {url: `attachment://${current.file}`}
                            message.channel.send({ files: [attachment], embed: embed})
                        } else {

                            message.channel.send({embed: embed})
                        }
                    } catch(e){console.log(e)}
                    } else if(args.value.startsWith('view')) {

                        const first = args.value.split(" ")[1] ? Number(args.value.split(" ")[1]) : 1;
                        const initImg = items.find(i => i.id === first)
                        
                        await message.channel.send({files: [new Discord.MessageAttachment(`./assets/images/backgrounds/${initImg.file}`, initImg.file)], embed: {
                            title: 'Background Preview',
                            description: `"${initImg.name.toUpperCase()}"`,
                            image: {
                                url: `attachment://${initImg.file}`
                            },
                            color: colors.purple,
                        }})

                    } else {

                        if(items.map(i => i.id).includes(Number(args.value))) {

                            const newBg = items.find(i => i.id == args.value)
                            await DB.query(`UPDATE tbl_users SET rank_card_background_id = ${newBg.id} WHERE user_id = ${message.author.id}`);

                            if(newBg.id > 0) {

                                const newBgImg = new Discord.MessageAttachment(`./assets/images/backgrounds/${newBg.file}`, newBg.file)
                                message.channel.send(`***Changed your rank card's background to \`${newBg.name.toUpperCase()}\`***`, newBgImg)
                            } else {

                                message.channel.send(`***Changed your rank card's background to \`${newBg.name.toUpperCase()}\`***`)
                            }

                        } else {

                            message.reply('No bacgkround found with that ID.')
                        }

                    }
                    break;
            }

        } catch(e) {console.log(e)}
    }
}

module.exports = RankCardCommand;