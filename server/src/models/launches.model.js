const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');
const DEFAULF_FLIGHT_NUMBER = 100;

async function exitsLaunchWithId(launchId) {
    return await launchesDatabase.findOne({
        flightNumber: launchId
    });
}

async function saveLaunches(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target
    });

    if(!planet) {
        throw new Error('No planet matches our record...');
    }

    return await launchesDatabase.findOneAndUpdate({
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
    return await launchesDatabase
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

async function abortLaunchById(launchId) {
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId
    }, {
        upcoming: false,
        success: false
    });

    return aborted.acknowledged === true && aborted.modifiedCount === 1;
}

module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    exitsLaunchWithId,
    abortLaunchById
};