var express = require('express');
const mongoose = require('mongoose');
const mqtt = require('mqtt');
const bodyParser = require('body-parser');


var app = express();

//Conexion
mongoose.connect('mongodb://localhost:27017/Electronica', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
    console.log('Conectado a la base de datos MongoDB');
});

//Middleware
app.use(bodyParser.json());


//Routes
const apiRoutes = require('./routes/api');
const mqttRoutes = require('./routes/mqtt');

app.use('/api', apiRoutes);
app.use('/mqtt', mqttRoutes);


//iniciar MQTT
const mqttClient = mqtt.connect('mqtt://localhost:1883'); //Ejemplo hasta que sepamos cual es

mqttClient.on('connect', () => {
    console.log('Conectado al broker MQTT');
})

app.get('/' , (req, res) => {
    res.send('Hello World!');
});


module.exports = app;
