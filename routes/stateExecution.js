var express = require('express');
var StateExecutionFotocasa = require('../models/stateExecution').StateExecutionFotocasa;
var StateExecutionAirbnb = require('../models/stateExecution').StateExecutionAirbnb;

var router = express.Router();

//http://localhost:3001/stateExecution/state-execution-airbnb-scraping/?skip=0&limit=2
router.get('/:db',
    function (req, res) {
        let skip;
        let limit;
        let order = -1;
        let db = req.params.db;
        if (req.query.skip) skip = parseInt(req.query.skip, 10)
        if (req.query.limit) limit = parseInt(req.query.limit)
        if (req.query.roder) order = parseInt(req.query.order);
        console.log("------> mongo limit " + limit + " skip " + skip + " order " + order);
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
    let dbSchema;

    if (db.indexOf("fotocasa") > -1) {
        dbSchema = StateExecutionFotocasa;
    } else {
        dbSchema = StateExecutionAirbnb;
    }

    dbSchema.find({}).sort({ date: -1 }).limit(limit).skip(skip).exec(function (err, executions) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (!executions) {
            return res.json({ error: "No page Found" })
        } else {
            return res.json(executions);
        }
    });
}
module.exports = router;

