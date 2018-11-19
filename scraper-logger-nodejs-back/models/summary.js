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
const airbnbSummaryCollectionName = "summaries-airbnb-scraping";

const fotocasaDbName = "fotocasa-db";
const airbnbDbName = "airbnb-db";

const dbFotocasa = mongoose.connection.useDb(fotocasaDbName);
const dbAirbnb = mongoose.connection.useDb(airbnbDbName);


const SummaryFotocasa = dbFotocasa.model('SummaryFotocasa', SummarySchema, fotocasaSummaryCollectionName);
const SummaryAirbnb = dbAirbnb.model('SummaryAirbnb', SummarySchema, airbnbSummaryCollectionName);


// make this available to our users in our Node applications
module.exports = { SummaryFotocasa, SummaryAirbnb };
//module.exports = StateExecutionAirbnb;