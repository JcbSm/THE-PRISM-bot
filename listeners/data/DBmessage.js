const { Listener } = require('discord-akairo');

class DBMessageListener extends Listener {
    constructor() {
        super('DBmessage', {
            emitter: 'client',
            event: 'message'
        })
    }
    exec(message) {

        const DB = this.client.db;

        /*DB.query(`
            SELECT * FROM Users
            WHERE ID = ${message.author.id};
        `, (err, res) => {

            if(err) return console.log(err);

            if(res.rows.length == 0) {

                DB.query(`
                    INSERT INTO Users (ID, Counts)
                    VALUES (${message.author.id}, 0)
                `, (err, res) => {
                    if(err) return console.log(err)
                    console.log(`Added user ${message.author.tag} into tbl_Users with ID: ${message.author.id}`)
                })
            }
        })*/

        


    }
}

module.exports = DBMessageListener;