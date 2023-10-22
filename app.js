const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
    console.log('Conectado a la base de datos MongoDB');
});

// Middleware
app.use(bodyParser.json());

// Routes
const apiRoutes = require('./controllers/apiController');
const mqttRoutes = require('./controllers/mqttController');

app.use('/api', apiRoutes);

// Import the MQTT controller
const mqttController = require('./controllers/mqttController');
app.use('/mqtt', mqttRoutes(mqttController));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;
