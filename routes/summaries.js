var express = require('express');
var Summary = require('../models/summary');
var router = express.Router();

router.get('/skip=:skip&limit=:limit',
    function (req, res) {
        let skip;
        let limit;
        if (req.params.skip) skip = parseInt(req.params.skip, 10)
        if (req.params.limit) limit = parseInt(req.params.limit, 10)
        summaryFind(res, skip, limit);
    });

router.get('/limit=:limit',
    function (req, res) {
        let skip;
        let limit;
        if (req.params.skip) skip = parseInt(req.params.skip, 10)
        if (req.params.limit) limit = parseInt(req.params.limit, 10)
        summaryFind(res, undefined, limit);
    });

summaryFind = (res, skip, limit) => {
    Summary.find({}).sort({ date: -1 }).limit(limit).skip(skip).exec(function (err, summaries) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (!summaries) {
            return res.json({ error: "No page Found" })
        } else {
            return res.json(summaries);
        }
    });
}
module.exports = router;

