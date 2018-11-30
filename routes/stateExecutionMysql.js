const express = require('express');
const MysqlDataAccess = require("../models/MysqlDataAccess");
require('dotenv').load();

const db = new MysqlDataAccess(process.env["MYSQL_HOST"], process.env["MYSQL_USER"], process.env["MYSQL_PASSWORD"], process.env["MYSQL_DATABASE"]);

const router = express.Router();
//http://localhost:3001/mysql-scraping-log?skip=0&limit=2
router.get('/',
    function (req, res) {
        let skip;
        let limit;
        let order;
        if (req.query.skip) skip = parseInt(req.query.skip, 10)
        if (req.query.limit) limit = parseInt(req.query.limit)
        if (req.query.roder) order = parseInt(req.query.order);
        stateExecutionFindMysql(res, skip, limit, order, undefined);
    });

stateExecutionFindMysql = async (res, skip, limit, order = "asc") => {
    const result = await db.getScrapingExecutionLog(limit,skip);
    return res.json(result);
}

module.exports = router;

