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
    } else if (req.query.cases !== undefined || req.query.deaths !== undefined) {
        queryStr = '/all'
    }
    var temp = disease.getCovidDetails(queryStr);
    temp.then((response, err) => {
        if (req.query.cases !== undefined || req.query.deaths !== undefined) {
            var formatData = req.query.cases === 'all' ? { cases: JSON.parse(response).cases } : req.query.cases === 'today' ? { todayCases: JSON.parse(response).todayCases } : req.query.deaths === 'all' ? { deaths: JSON.parse(response).deaths } : req.query.deaths === 'today' ? { todayDeaths: JSON.parse(response).todayDeaths } : {}
        }
        res.status(200).json({
            status: 'success', data:
                req.query.cases !== undefined || req.query.deaths !== undefined ? formatData :
                    JSON.parse(response)
        });
    })
});

module.exports = {
    routes
};
