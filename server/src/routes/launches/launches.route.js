const express = require('express');
const { httpGetAllLaunches } = require('./launches.controller');

const launchesRoute = express.Router();

launchesRoute.get('/launches', httpGetAllLaunches);

module.exports = launchesRoute;
