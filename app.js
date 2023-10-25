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
const adminRoutes = require('./routes/adminRoute');
const maintenanceRoutes = require('./routes/maintenanceRoute');

app.use('/admin', adminRoutes);
app.use('/maintenance', maintenanceRoutes);

module.exports = app;
