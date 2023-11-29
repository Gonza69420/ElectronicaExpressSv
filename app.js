const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const config = require('./.config.js');
const bcrypt = require('bcrypt');
const mqttRoutes = require('./routes/mqttRoutes');

// Connect to MongoDB
mongoose.connect(config.mongodbURL, {
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
const adminRoutes = require('./routes/adminRoute.js');
const maintenanceRoutes = require('./routes/maintenanceRoute');
const userRoute = require('./routes/userRoute');
const {Role, User} = require("./models/user");

app.use('/admin', adminRoutes);
app.use('/maintenance', maintenanceRoutes);
app.use('/user', userRoute);


app.post('/createAdmin', async (req, res) => {
    try {
        const adminRole = await Role.findOne({ name: 'Admin' });

        if (!adminRole) {
            // If the "Admin" role does not exist, you can create it first
            const newAdminRole = new Role({ name: 'Admin' });
            await newAdminRole.save();
        }

	    const username = "admin";
	    const name= "Senor Admin";
        // Now, you can create a user with the "Admin" role
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash('admin123', salt, async (err, hash) => {
                if (err) {
                    res.status(500).json({message: 'Error creating the user', err});
                } else {
                    const user = new User({
                        username,
                        password: hash,
                        name,
                        role: adminRole,
                    });

                    await user.save();
                }
            })
        })

        res.status(201).json("");
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user.');
    }
})

module.exports = app;
