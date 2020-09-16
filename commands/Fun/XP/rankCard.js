const { Command } = require('discord-akairo');
const { hex } = require('../../../functions')
const { prism } = require('../../../config')
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
                content: 'Allows you to edit the look of your rank card\nOptions: "colour"',
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

                    if(!args.value) {

                        message.channel.send({embed: {
                            title: 'Available backgrounds',
                            description: items.map(i => `**ID: \`${i.id}\`** • **NAME:** *"${i.name}"*`).join("\n"),
                            fields: [
                                {
                                    name: 'Current Background',
                                    value: `**ID: \`${current.id}\`** • **NAME:** *"${current.name}"*`
                                }
                            ]
                        }})
                    } else if(args.value === 'view') {
                        try{
                            const attachment = new Discord.MessageAttachment(`./assets/images/backgrounds/${current.file}`, 'Rank.png');
                            message.channel.send('', attachment);
                        } catch(e) {console.log(e)}
                    } else {

                        if(items.map(i => i.id).includes(Number(args.value))) {

                            await DB.query(`UPDATE tbl_users SET rank_card_background_id = ${args.value} WHERE user_id = ${message.author.id}`)
                            message.channel.send(`***Changed your rank card's main colour to \`${args.value}\`***`)

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