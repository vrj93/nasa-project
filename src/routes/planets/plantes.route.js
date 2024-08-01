const express = require('express');
const { httpGetAllPlantes } = require('./planets.controller');

const planetsRoute = express.Router();

planetsRoute.get('/', httpGetAllPlantes);

module.exports = planetsRoute;