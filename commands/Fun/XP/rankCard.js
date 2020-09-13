const { Command } = require('discord-akairo');
const { hex } = require('../../../functions')

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
                            hexVal = '#944ad3'
                        } else {
                            hexVal = hex(args.value)
                        }
                        
                        await DB.query(`UPDATE tbl_users SET rank_card_color_main = '${hexVal}' WHERE user_id = ${message.author.id}`)
                        message.channel.send(`***Changed your rank card's main colour to \`${hexVal}\`***`)
                        
                    } catch(e) {
                        message.reply('Unable to resolve a colour.')
                    }

                    break;
            }

        } catch(e) {console.log(e)}
    }
}

module.exports = RankCardCommand;