/*.env file requires Absolute path
"path.resolve" indicates the path where "path" module is installed. (Server folder)*/

const path = require('path');
require('dotenv').config({path: path.resolve('../.env')});

const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

const MONGO_URL = process.env.MONGO_URL;

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDB Connected!');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

//This function will wait till planets data are not loaded
async function startServer() {
    await mongoose.connect(MONGO_URL);

    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

startServer();
