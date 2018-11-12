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
const StateExecution = mongoose.model('StateExecution', StateExecutionSchema, fotocasaStateCollectionName);

// make this available to our users in our Node applications
module.exports = StateExecution;