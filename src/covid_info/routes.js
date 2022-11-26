const express = require('express');
const disease = require('../services/disease')

const routes = express.Router({
    mergeParams: true
});

routes.get('/covid_info', (req, res) => {

    var temp = disease.getCovidDetails('historical/all');
    temp.then((response) => {
        res.status(200).json({ status: 'success', data: JSON.parse(response) });
    })
});
module.exports = {
    routes
};
