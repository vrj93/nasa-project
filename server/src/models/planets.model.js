const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const habitablePlanets = [];

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
            .on('data', (data) => {
                if(isHabitablePlanet(data)) {
                    habitablePlanets.push(data);
                }
                resolve();
            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            .on('end', () => {
                console.log(habitablePlanets.map((planet) => {
                    return planet[`kepler_name`];
                }));
                console.log(`There are ${habitablePlanets.length} habitable planets in our Milkyway!`);
            });
    });
}

module.exports = {
    planets: habitablePlanets,
    loadPlanetsData
};