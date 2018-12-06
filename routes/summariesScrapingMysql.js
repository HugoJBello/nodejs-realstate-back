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

//http://localhost:3001/mysql-summary-scraping/results/?city=Alcalá de Henares&scraping_id=scraping-airbnb-gCloud--2018-11-29_14_04_43
router.get('/results/',
    (req, res) => {
        let scrapingId;
        let city;
        if (req.query.city) city = req.query.city;
        if (req.query.scraping_id) scrapingId = req.query.scraping_id;
        getResults(city, scrapingId, res);
    });

//http://localhost:3001/mysql-summary-scraping/scraped_cities/?scraping_id=scraping-airbnb-gCloud--2018-11-29_14_04_43
router.get('/scraped_cities/',
    (req, res) => {
        let city;
        let scrapingId;
        if (req.query.scraping_id) scrapingId = req.query.scraping_id;
        getScrapedCities(scrapingId, res);
    });

//http://localhost:3001/mysql-summary-scraping/processInfo/?device_id=raspberryOld&scraping_id=scraping-airbnb-gCloud--2018-11-29_14_04_43
router.get('/processInfo/',
    async (req, res) => {
        let scrapingId;
        let device_id;
        if (req.query.scraping_id) scrapingId = req.query.scraping_id;
        if (req.query.device_id) device_id = req.query.device_id;
        await getProcessInfo(device_id, scrapingId, res);
    });

//http://localhost:3001/mysql-summary-scraping/scrapingRemaining/?device_id=raspberryOld
router.get('/scrapingRemaining/',
async (req, res) => {
    let device_id;
    if (req.query.device_id) device_id = req.query.device_id;
    await getScrapingRemaining(device_id, res);
});

getGeoJson = async (city, scrapingId, res) => {
    console.log("----> city " + city + " id " + scrapingId);
    const result = await db.getScrapingResultsCity(city, scrapingId);
    const geoJson = geoJsonGenerator.generateGeoJsonFromResult(result);

    return res.json(geoJson);
}

getResults = async (city, scrapingId, res) => {
    console.log("----> city " + city + " id " + scrapingId);
    const result = await db.getScrapingResultsCity(city, scrapingId);
    return res.json(result);
}

getScrapedCities = async (scrapingId, res) => {
    console.log("----> id " + scrapingId);
    const result = await db.getScrapedCities(scrapingId);
    return res.json(result);
}

getProcessInfo = async (device_id, scrapingId, res) => {
    console.log("----> id " + device_id);
    const result ={};
    const scrapedNum = await db.getScrapedCount(device_id, true);
    const scrapedRemaning = await db.getScrapedCount(device_id, false);
    const lastPiece = await db.getLastPiece(scrapingId);
    result["scraped_pieces"] = scrapedNum;
    result["scraped_remaining"]= scrapedRemaning;
    result["scraped_pieces_percent"] = scrapedNum / (scrapedNum + scrapedRemaning) * 100;
    result["last_piece"] =lastPiece[0]["scraping_id"];
    console.log(result);
    return res.json(result);
}

getScrapingRemaining = async (device_id, res) => {
    console.log("----> id " + device_id);
    const result ={};
    const scrapedNum = await db.getScrapedCount(device_id, true);
    const scrapedRemaning = await db.getScrapedCount(device_id, false);
    result["scraped_pieces"] = scrapedNum;
    result["scraped_remaining"]= scrapedRemaning;
    result["scraped_pieces_percent"] = scrapedNum / (scrapedNum + scrapedRemaning) * 100;
    console.log(result);
    return res.json(result);
}


module.exports = router;

