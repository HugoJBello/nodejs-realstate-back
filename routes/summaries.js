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
        summariesFind(res, req.query.skip, limit, db);
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
        summariesFind(res, skip, limit, undefined);
    });

//http://localhost:3001/summaries/summaries-fotocasa-scraping/scraping-fotocasa-raspberry2--2018-11-24_15_28_34?cityName=Madrid
router.get('/:db/:scrapingId',
    function (req, res) {
        let cityName;
        let db = req.params.db;
        let scrapingId = req.params.scrapingId;
        if (req.query.cityName) cityName = req.query.cityName;
        console.log("---->" + "scrapingId " + scrapingId + "city " + cityName);
        summaryFind(res, db, scrapingId, cityName);
    });

summariesFind = (res, skip, limit, db) => {
    console.log("---" + skip);

    if (db.indexOf("fotocasa") > -1) {
        dbSchema = SummaryFotocasa;
    } else {
        dbSchema = SummaryAirbnb;
    }
    dbSchema.find({}).sort({ date: -1 }).limit(limit).skip(Number(skip)).exec(function (err, executions) {
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

summaryFind = (res, db, scrapingId, city) => {

    if (db.indexOf("fotocasa") > -1) {
        dbSchema = SummaryFotocasa;
    } else {
        dbSchema = SummaryAirbnb;
    }
    dbSchema.findOne({ scrapingId, cityName: city }).exec(function (err, executions) {
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

