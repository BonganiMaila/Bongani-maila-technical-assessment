const { exception } = require('console');
const http = require('http');
const url = require('url');
var service = require('./service.js');

module.exports = http.createServer((req, res) => {
    try {
        const reqUrl = url.parse(req.url, true);
        // GET Endpoints
        if (reqUrl.pathname == '/api/movies' && req.method === 'GET') {
            console.log('Request Type: ' + req.method + ' Endpoint: ' + reqUrl.pathname);
            service.GetMovies(req, res);
        } else {
            console.log('Request Type: ' + req.method + ' Invalid Endpoint: ' + reqUrl.pathname);
            service.invalidRequest(req, res);
        }
    } catch (error) {
        throw new exception(error);
    }
});