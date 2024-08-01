const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const planets = require('./planets.mongo');

function isHabitablePlanet(planet) {
    return planet[`koi_disposition`] === 'CONFIRMED'
        && planet[`koi_insol`] > 0.36 && planet[`koi_insol`] < 1.11
        && planet[`koi_prad`] < 1.6;
}

//Using "Promise" to make server wait for planets data
function loadPlanetsData() { 
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_exoplanet_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true
            }))
            .on('data', async (data) => {
                if(isHabitablePlanet(data)) {
                    await savePlanet(data);
                }
                resolve();
            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            .on('end', async () => {
                const countPlanetsFound = (await getAllPlanets()).length;
                console.log(`${countPlanetsFound} habitable planets found.`);
            });
    });
}

async function getAllPlanets() {
    // return habitablePlanets;
    return planets.find({});
}

async function savePlanet(planet) {
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name
        }, {
            keplerName: planet.kepler_name
        }, {
            upsert: true
        });
    } catch (err) {
        console.error(`Could not save planets ${err}`);
    }
}

module.exports = {
    getAllPlanets,
    loadPlanetsData
};