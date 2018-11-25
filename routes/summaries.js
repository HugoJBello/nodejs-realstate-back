var express = require('express');
var SummaryFotocasa = require('../models/summary').SummaryFotocasa;
var SummaryAirbnb = require('../models/summary').SummaryAirbnb;

var router = express.Router();

//http://localhost:3001/summaries/summaries-fotocasa-scraping/?skip=0&limit=2
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
        summaryFind(res, req.query.skip, limit, db);
    });

router.get('/',
    function (req, res) {
        let skip;
        let limit;
        let order
        if (req.query.skip) skip = parseInt(req.query.skip, 10)
        if (req.query.limit) limit = parseInt(req.query.limit)
        if (req.query.roder) order = parseInt(req.query.order);
        console.log("----> limit " + limit + " skip " + skip + " order " + order);
        summaryFind(res, skip, limit, undefined);
    });

summaryFind = (res, skip, limit, db) => {
    console.log("---" + skip);

    if (db.indexOf("fotocasa") > -1) {
        dbSchema = SummaryFotocasa;
    } else {
        dbSchema = SummaryAirbnb;
    }
    dbSchema.find({}).find({}).sort({ date: -1 }).limit(limit).skip(Number(skip)).exec(function (err, executions) {
        if (err) {
            console.log(err);
            //throw err;
        }
        if (!executions) {
            return res.json({ error: "No page Found" })
        } else {
            return res.json(executions);
        }
    });
}
module.exports = router;

