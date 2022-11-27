const request = require('request');
const HOST = 'https://disease.sh/v3/covid-19'

module.exports.getCovidDetails = async function (params) {
    // internal api call for getting data from disease.sh
    const options = {
        url: HOST + params,
        method: 'GET',
    };
    // Return api call response as promise
    return new Promise(function (resolve, reject) {
        request.get(options, function (err, resp, body) {
            if (err && resp['statusCode'] !== 200) {
                reject(err !== null ? err : { status: resp['statusCode'], message: resp['statusMessage'] });
            } else {
                if (resp['statusCode'] == 200)
                    resolve({ status: resp['statusCode'], data: JSON.parse(body) });
                else
                    resolve({ status: resp['statusCode'], data: body })
            }
        })
    }).catch(function (error) {
        throw error
    });
};
