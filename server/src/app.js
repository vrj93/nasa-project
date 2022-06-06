const express = require('express');
const cors = require('cors');
const app = express();
const planetsRoute = require('./routes/planets/plantes.route');

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json());
app.use(planetsRoute);

module.exports = app;