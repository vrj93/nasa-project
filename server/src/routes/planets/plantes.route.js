const express = require('express');
const { httpGetAllPlantes } = require('./planets.controller');

const planetsRoute = express.Router();

planetsRoute.get('/planets', httpGetAllPlantes);

module.exports = planetsRoute;