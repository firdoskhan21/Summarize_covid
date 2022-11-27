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

// route for getting historical data of all and specific countries along with cases and death records
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
            var formatData = req.query.cases === 'all' ? { cases: response.data.cases } : req.query.cases === 'today' ? { todayCases: response.data.todayCases } : req.query.deaths === 'all' ? { deaths: response.data.deaths } : req.query.deaths === 'today' ? { todayDeaths: response.data.todayDeaths } : {}
        }
        res.status(response.status == 200 ? 200 : response.status).json({
            status: response.status == 200 ? 'success' : 'error', data:
                req.query.cases !== undefined || req.query.deaths !== undefined ? formatData :
                    response
        });
    })
});

module.exports = {
    routes
};
