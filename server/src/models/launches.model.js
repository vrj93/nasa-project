const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');
const DEFAULF_FLIGHT_NUMBER = 100;

function launchExists(launchId) {
   return launches.has(launchId);
}

async function saveLaunches(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target
    });

    if(!planet) {
        throw new Error('No planet matches our record...');
    }

    return launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    });
}

async function getLatestLaunch() {
    const latestLaunch = await launchesDatabase
        .findOne()
        .sort('-flightNumber');

    if(!latestLaunch) {
        return DEFAULF_FLIGHT_NUMBER;
    } else {
        return latestLaunch.flightNumber;
    }
}

async function getAllLaunches() {
    return launchesDatabase
        .find({}, { _id: 0, __v: 0 });
}

async function scheduleNewLaunch(launch) {
    const newflightNumber = await getLatestLaunch() + 1;

    const newLaunch = Object.assign(launch, {
        flightNumber: newflightNumber,
        customers: ['Vivek', 'NASA'],
        upcoming: true,
        success: true
    });

    await saveLaunches(newLaunch);

}

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;

    return aborted;
}

module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    launchExists,
    abortLaunchById
};