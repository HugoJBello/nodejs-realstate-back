var express = require('express');
var StateExecution = require('../models/stateExecution');
var router = express.Router();

//http://localhost:3001/stateExecution/state-execution-airbnb-scraping/skip=0&limit=2
router.get('/:db/skip=:skip&limit=:limit',
    function (req, res) {
        let skip;
        let limit;
        let db = req.params.db;
        if (req.params.skip) skip = parseInt(req.params.skip, 10)
        if (req.params.limit) limit = parseInt(req.params.limit, 10)
        stateExecutionFind(res, skip, limit);
    });

router.get('/limit=:limit',
    function (req, res) {
        let skip;
        let limit;
        if (req.params.skip) skip = parseInt(req.params.skip, 10)
        if (req.params.limit) limit = parseInt(req.params.limit, 10)
        stateExecutionFind(res, undefined, limit);
    });

stateExecutionFind = (res, skip, limit) => {
    StateExecution.find({}).sort({ date: -1 }).limit(limit).skip(skip).exec(function (err, executions) {
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

