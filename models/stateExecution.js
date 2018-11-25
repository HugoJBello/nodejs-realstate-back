var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var StateExecutionSchema = new Schema(
    {
        _id: { type: String, required: true },
        scrapingId: String,
        date: Date,
        active: Boolean,
        lastNmun: String
    });

// the schema is useless so far
// we need to create a model using it
const fotocasaStateCollectionName = "state-execution-fotocasa-scraping";
const airbnbStateCollectionName = "state-execution-airbnb-scraping";

const fotocasaDbName = "fotocasa-db";
const airbnbDbName = "airbnb-db";

const dbFotocasa = mongoose.connection.useDb(fotocasaDbName);
const dbAirbnb = mongoose.connection.useDb(airbnbDbName);


const StateExecutionFotocasa = dbFotocasa.model('StateExecutionFotocasa', StateExecutionSchema, fotocasaStateCollectionName);
const StateExecutionAirbnb = dbAirbnb.model('StateExecutionAirbnb', StateExecutionSchema, airbnbStateCollectionName);


// make this available to our users in our Node applications
module.exports = { StateExecutionFotocasa, StateExecutionAirbnb };
//module.exports = StateExecutionAirbnb;
