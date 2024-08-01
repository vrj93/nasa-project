const express = require('express');

const planetsRoute = require('./planets/plantes.route');
const launchesRoute = require('./launches/launches.route');

const api = express.Router();

api.use('/planets', planetsRoute);
api.use('/launches', launchesRoute);

module.exports = api;