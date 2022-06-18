const { getAllLaunches, scheduleNewLaunch, exitsLaunchWithId, abortLaunchById } = require('../../models/launches.model');

async function httpGetAllLaunches(req, res) {
    return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
    const launch = req.body;

    launch.launchDate = new Date(launch.launchDate);

    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        res.status(400).json({
            error: 'Launch property is missing'
        });
    }

    if(isNaN(launch.launchDate)) {
        res.status(400).json({
            error: 'Launch date is not valid'
        });
    }

    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);

    const existsLaunch = await exitsLaunchWithId(launchId);

    if(!existsLaunch) {
        return res.status(404).json({
            error: 'Launch not found'
        });
    }

    const aborted = await abortLaunchById(launchId);

    if(!aborted) {
        return res.status(400).json({
            error: 'Launch not aborted!'
        });
    }

    return res.status(200).json({
        ok: true
    });
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
};