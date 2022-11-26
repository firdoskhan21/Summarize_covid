const express = require('express');
const disease = require('../services/disease')

const routes = express.Router({
    mergeParams: true
});

// health check route
routes.get('/healthcheck', async (_req, res, _next) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };
    try {
        res.send(healthcheck);
    } catch (e) {
        healthcheck.message = e;
        res.status(503).send(healthcheck.message);
    }
});

// route for getting historical data of all and specific countries
routes.get('/covid_info/:id/:type', (req, res) => {
    var queryStr = '/' + req.params.id + '/' + req.params.type;
    if (req.query.lastdays !== undefined) {
        queryStr += '?lastdays=' + req.query.lastdays
    }
    var temp = disease.getCovidDetails(queryStr);
    temp.then((response, err) => {
        res.status(200).json({
            status: 'success', data:


                JSON.parse(response)
        });
    })
});

// route for getting summarize information of specified country
// routes.get('/covid_info/country_overview/:id', (req, res) => {
//     var queryStr = '/countries/' + req.params.id;
//     var temp = disease.getCovidDetails(queryStr);
//     temp.then((response, err) => {
//         console.log(err)
//         res.status(200).json({ status: 'success', data: JSON.parse(response) });
//     })
// });

module.exports = {
    routes
};
