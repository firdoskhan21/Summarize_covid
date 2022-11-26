const request = require('request');
const HOST = 'https://disease.sh/v3/covid-19'

module.exports.getCovidDetails = async function (params) {
    // internal api call for getting data from disease.sh
    const options = {
        url: HOST + '/' + params,
        method: 'GET',
    };
    // Return api call response as promise
    return new Promise(function (resolve, reject) {
        request.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    })
};
