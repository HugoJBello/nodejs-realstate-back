const fs = require('fs');
const mysql = require('mysql');

module.exports = class MysqlDataAccess {
    constructor(mysqlHost, mysqlUser, mysqlPassword, mysqlDatabase) {
        this.mysqlHost = mysqlHost;
        this.mysqlUser = mysqlUser;
        this.mysqlPassword = mysqlPassword;
        this.mysqlDatabase = mysqlDatabase;
        this.multipleStatements = true;

        this.connection = null;
        this.createConnection();
    }

    createConnection() {
        console.log("creating connection " + this.mysqlHost + " " + this.mysqlUser + " " + this.mysqlPassword + " " + this.mysqlDatabase)
        this.connection = mysql.createConnection({
            host: this.mysqlHost,
            user: this.mysqlUser,
            password: this.mysqlPassword,
            database: this.mysqlDatabase,
            multipleStatements: this.multipleStatements
        });
    }
    

    async runQuery(script) {
        const connection = this.connection;
        return new Promise((resolve, reject) => {
            connection.query(script, function (err, rows, fields) {
                if (!err) {
                    resolve(rows);
                } else {
                    reject(err);
                    console.log('Error while performing Query.');
                    console.log(err);
                }
            });
        });
    }

    async getNextPieceToScrap() {
        const sql = "select * from scraping_pieces_index where scraped = false order by piece_id asc limit 1;";
        const result = await this.runQuery(sql);
        return result[0];
    }

    async countIndexEntries(){
        const sql = "select count(*) from scraping_pieces_index";
        let result;
        try{
            result = await this.runQuery(sql);
            return parseInt(result[0]["count(*)"]);
        } catch (err){
            return null;
        }

    }
}