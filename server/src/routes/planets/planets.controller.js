const { getAllPlanets } = require('../../models/planets.model');

function httpGetAllPlantes(req, res) {
    return res.status(200).json(getAllPlanets());
}

module.exports = {
    httpGetAllPlantes
};