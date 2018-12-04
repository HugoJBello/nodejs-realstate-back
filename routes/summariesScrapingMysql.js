const express = require('express');
const MysqlDataAccess = require("../scraperDataProcess/MysqlDataAccess");
const GeoJsonGeneratorFromResult = require("../scraperDataProcess/GeoJsonGeneratorFromResult");
const geoJsonGenerator = new GeoJsonGeneratorFromResult();

require('dotenv').load();

const db = new MysqlDataAccess(process.env["MYSQL_HOST"], process.env["MYSQL_USER"], process.env["MYSQL_PASSWORD"], process.env["MYSQL_DATABASE"]);

const router = express.Router();
//http://localhost:3001/mysql-summary-scraping/geoJson/?city=Alcalá de Henares&scraping_id=scraping-airbnb-gCloud--2018-11-29_14_04_43
router.get('/geoJson/',
    (req, res) => {
        let scrapingId;
        let city;
        if (req.query.city) city = req.query.city;
        if (req.query.scraping_id) scrapingId = req.query.scraping_id;
        getGeoJson(city, scrapingId, res);
    });

getGeoJson = async (city, scrapingId, res) => {
    console.log("----> city " + city + " id " + scrapingId);
    const result = await db.getScrapingResultsCity(city, scrapingId);
    const geoJson = geoJsonGenerator.generateGeoJsonFromResult(result);

    return res.json(geoJson);
}

module.exports = router;

