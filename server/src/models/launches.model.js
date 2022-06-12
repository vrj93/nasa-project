const launches = new Map();

let flightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['Vivek', 'NASA'],
    upcoming: true,
    success: true
};

launches.set(launch.flightNumber, launch);

function launchExists(launchId) {
   return launches.has(launchId);
}

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(newLaunch) {
    flightNumber++;

    launches.set(
        flightNumber,
        Object.assign(newLaunch, {
            flightNumber: flightNumber,
            customers: ['Vivek', 'NASA'],
            upcoming: true,
            success: true
        })
    );
}

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;

    return aborted;
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    launchExists,
    abortLaunchById
};