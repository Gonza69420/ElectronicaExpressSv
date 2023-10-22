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


//Routes
const adminRoutes = require('./routes/admin');
const mqttRoutes = require('./routes/mqtt');
const maintenanceRoutes = require('./routes/maintenance');

app.use('/admin', adminRoutes);
app.use('/mqtt', mqttRoutes);
app.use('/maintenance', maintenanceRoutes);


//iniciar MQTT
const mqttClient = mqtt.connect('mqtt://localhost:1883'); //Ejemplo hasta que sepamos cual es

mqttClient.on('connect', () => {
    console.log('Conectado al broker MQTT');
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;
