const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const planetsRoute = require('./routes/planets/plantes.route');
const launchesRoute = require('./routes/launches/launches.route');

app.use(cors({
    origin: process.env.FRONT_ORIGIN,
}));

app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/planets', planetsRoute);
app.use('/launches', launchesRoute);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;