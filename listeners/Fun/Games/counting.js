const { Listener } = require('discord-akairo');
const { prism } = require('../../../config');
const { linkToMessage } = require('../../../functions')

class CountingListener extends Listener {
    constructor() {
        super('counting', {
            emitter: 'client',
            event: 'message'

        })
    }

    async exec(message) {

        try{

            // The Game

            if(message.channel.id !== prism.guild.channelIDs.counting) return;
            const lastCount = (await message.channel.messages.fetch( {limit:2} )).last()
            let valid;
            if(/^[1-9]\d*$/.test(message.content)) {
                valid = true
            }
            if(Number(message.content) !== Number(lastCount.content)+1 || message.author.id === lastCount.author.id || !valid) return message.delete();


            // Count Tracker

            const DB = this.client.db;

            const res = (await DB.query(`SELECT * FROM tbl_counts WHERE user_id = ${message.author.id}`)).rows[0];

            if(!res) {
                await DB.query(`
                    INSERT INTO tbl_counts (user_id, counts)
                    VALUES (${array[i].id}, 1)
                `, (err, res) => {
                    if(err) return console.log(err)
                    console.log(`Added user ${array[i].id} into tbl_counts`)
                })
            } else {

                await DB.query(`UPDATE tbl_counts
                    SET counts = ${res.counts + 1},
                    last_count = ${Number(message.content)},
                    last_count_timestamp = ${message.createdTimestamp},
                    last_count_url = '${message.url}'
                    WHERE user_id = ${message.author.id}`)

            }




            // Top Counter
            
            const pinMessage = await linkToMessage('https://discordapp.com/channels/447504770719154192/583742663627505669/749343323793260645', this.client);
            
            const topCounter = await this.client.users.fetch('140150251213422592')
            //let currentCounts = Number(pinMessage.embeds[0].description.split('\`')[1])
            let data = (await this.client.db.query(`SELECT * FROM tbl_counts WHERE user_id = ${topCounter.id}`)).rows[0]

            pinMessage.edit({ embed: {
                title: `The ${message.guild.name} top counter`,
                description: `${topCounter} counts: \`${data.counts}\``,
                fields: [
                    {
                        name: 'Percentage of all counts',
                        value: `\`${Math.round(data.counts/Number(message.content)*10000)/100}%\``
                    },
                    {
                        name: 'Most recent count',
                        value: `\`${data.last_count}\` [Jump](${data.last_count_url})`
                    }
                ],
                timestamp: Number(data.last_count_timestamp),
                footer: {
                    text: 'Last counted'
                }
            }})
        
        } catch(e) {console.log(e)}
    }
}

module.exports = CountingListener;