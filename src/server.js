const serverless = require('serverless-http');
const app = require('./app');

const { mongoConnect } = require('./services/mongo');
const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchData } = require('./models/launches.model');

let isInitialized = false;

const initialize = async () => {
  if (!isInitialized) {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();
    isInitialized = true;
  }
};

const handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    await initialize();
    const serverlessHandler = serverless(app);
    return serverlessHandler(event, context);
};

module.exports.handleNasaLaunch = handler;
