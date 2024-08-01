const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({path: path.resolve('./.env')});

const MONGO_URL = process.env.MONGO_URL;

mongoose.set('strictQuery', false);

mongoose.connection.once('open', () => {
    console.log('MongoDB Connected!');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function mongoConnect () {
    mongoose.connect(MONGO_URL);
}

module.exports = {
    mongoConnect,
}