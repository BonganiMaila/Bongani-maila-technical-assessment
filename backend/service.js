const url = require('url');
const http = require('http');
const config = require('./config.js');

///
// Get Movies
///
exports.GetMovies = function(req, res) {

    const apikey = config.Settings.OM.OM_API_KEY;
    const host = config.Settings.OM.OM_API_HOSTNAME;
    const reqUrl = url.parse(req.url, true);

    let search = reqUrl.query.title || null;
    let year = reqUrl.query.year || Date.now.year;
    let type = reqUrl.query.type || 'movie';
    let data = '';
    http.get(`${host}/?s=${search}&y=${year}&type=${type}&apikey=${apikey}`, (response) => {
        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(JSON.parse(data)));
        });

    }).on("error", (err) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        console.error("Error: " + err.message);
        res.end(err.message);
    });
};
///
// Invalid Route
///
exports.invalidRequest = function(req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};