const config = require('./config.js');
const server = require('./controller.js');

const hostname = config.Settings.SERVER.SERVER_IP;
const port = config.Settings.SERVER.SERVER_PORT;

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});