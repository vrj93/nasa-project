const { planets } = require('../../models/planets.model');

function getAllPlantes(req, res) {
    return res.status(200).json(planets);
}

module.exports = {
    getAllPlantes
};