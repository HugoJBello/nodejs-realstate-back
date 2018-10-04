var express = require('express');
var Summary = require('../models/summary');
var router = express.Router();

router.get('/:limit',
    (req, res) => {
        Summary.find({}).sort({ date: -1 }).limit(req.param.limit).exec(function (err, summaries) {
            if (err) {
                console.log(err);
                throw err
            }
            if (!summaries) {
                return res.json({ error: "No page Found" })
            } else {
                return res.json(summaries);
            }
        });
    });

module.exports = router;
