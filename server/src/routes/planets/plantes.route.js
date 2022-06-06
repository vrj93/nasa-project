const express = require('express');
const { getAllPlantes } = require('./planets.controller');

const planetsRoute = express.Router();

planetsRoute.get('/planets', getAllPlantes);

module.exports = planetsRoute;