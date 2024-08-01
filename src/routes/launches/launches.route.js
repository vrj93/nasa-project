const express = require('express');
const { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch } = require('./launches.controller');

const launchesRoute = express.Router();

launchesRoute.get('/', httpGetAllLaunches);
launchesRoute.post('/', httpAddNewLaunch);
launchesRoute.delete('/:id', httpAbortLaunch);

module.exports = launchesRoute;
