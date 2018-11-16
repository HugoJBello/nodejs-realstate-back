var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var SummarySchema = new Schema(
    {
        _id: { type: String, required: true },
        date: Date,
        url_scrapped: String,
        number_of_items: Number,
        cusecs: Object
    });
SummarySchema.index({ '$**': 'text' });

// the schema is useless so far
// we need to create a model using it
const fotocasaSummaryCollectionName = "summaries-fotocasa-scraping";
var Summary = mongoose.model('Summary', SummarySchema, fotocasaSummaryCollectionName);

// make this available to our users in our Node applications
module.exports = Summary;