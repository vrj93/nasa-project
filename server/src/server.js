/*.env file requires Absolute path
"path.resolve" indicates the path where "path" module is installed. (Server folder)*/

const path = require('path');
const http = require('http');
const app = require('./app');

const { mongoConnect } = require('./services/mongo');
const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchData } = require('./models/launches.model');

require('dotenv').config({path: path.resolve('../.env')});
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

//This function will wait till planets data are not loaded
async function startServer() {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

startServer();
