const express = require('express');
const MysqlDataAccess = require("../models/MysqlDataAccess");
require('dotenv').load();

const db = new MysqlDataAccess(process.env["MYSQL_HOST"], process.env["MYSQL_USER"], process.env["MYSQL_PASSWORD"], process.env["MYSQL_DATABASE"]);

const router = express.Router();

//http://localhost:3001/mysql-scraping-log/state-execution-airbnb-scraping/?skip=0&limit=2
router.get('/:db',
    function (req, res) {
        let skip;
        let limit;
        let order;
        let db = req.params.db;
        if (req.query.skip) skip = parseInt(req.query.skip, 10)
        if (req.query.limit) limit = parseInt(req.query.limit)
        if (req.query.roder) order = parseInt(req.query.order);
        console.log("----> limit " + limit + " skip " + skip + " order " + order);
        stateExecutionFindMysql(res, skip, limit, order, db);
    });

router.get('/',
    function (req, res) {
        let skip;
        let limit;
        let order;
        if (req.query.skip) skip = parseInt(req.query.skip, 10)
        if (req.query.limit) limit = parseInt(req.query.limit)
        if (req.query.roder) order = parseInt(req.query.order);
        stateExecutionFindMysql(res, undefined, limit, order, undefined);
    });

stateExecutionFindMysql = (res, skip, limit, order = -1, db) => {
    return res.json({});
}


/*

select * from scraping_results left join scraping_pieces_index on scraping_results.piece_id = scraping_pieces_index.piece_id
order by date_scraped asc
limit 10
offset 0;

select  t.last_piece,t.city_name, r.scraping_id, r.app_id, r.device_id, r.date_scraped,  r.average_prize_buy, r.number_of_ads_buy, r.average_prize_rent, r.number_of_ads_rent from (select * from scraping_execution_log left join  scraping_pieces_index on scraping_execution_log.last_piece = scraping_pieces_index.piece_id) t left join scraping_results r on t.last_piece = r.piece_id
order by r.date_scraped asc
limit 10
offset 0;

*/

module.exports = router;

