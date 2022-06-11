const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const planetsRoute = require('./routes/planets/plantes.route');

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(planetsRoute);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;