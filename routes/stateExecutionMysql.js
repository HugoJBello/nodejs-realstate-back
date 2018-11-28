const express = require('express');
const MysqlDataAccess = require("../models/MysqlDataAccess");
require('dotenv').load();

const db = new MysqlDataAccess(process.env["MYSQL_HOST"], process.env["MYSQL_USER"], process.env["MYSQL_PASSWORD"], process.env["MYSQL_DATABASE"]);

const router = express.Router();

//http://localhost:3001/mysql/stateExecution/state-execution-airbnb-scraping/?skip=0&limit=2
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
        stateExecutionFind(res, skip, limit, order, db);
    });

router.get('/',
    function (req, res) {
        let skip;
        let limit;
        let order;
        if (req.query.skip) skip = parseInt(req.query.skip, 10)
        if (req.query.limit) limit = parseInt(req.query.limit)
        if (req.query.roder) order = parseInt(req.query.order);
        stateExecutionFind(res, undefined, limit, order, undefined);
    });

stateExecutionFind = (res, skip, limit, order = -1, db) => {
    return res.json({});
}
module.exports = router;

