var express = require('express');
var Summary = require('../models/summary');
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
        summaryFind(res, req.query.skip, limit);
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
        summaryFind(res, skip, limit);
    });

summaryFind = (res, skip, limit) => {
    console.log("---" + skip);

    Summary.find({}).find({}).sort({ date: -1 }).limit(limit).skip(Number(skip)).exec(function (err, executions) {
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

