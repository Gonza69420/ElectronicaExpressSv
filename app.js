const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const config = require('./.config.js');

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

        // Now, you can create a user with the "Admin" role
        const adminUser = new User({
            username: 'admin',
            password: 'admin123',
            name: 'Admin User',
            role: adminRole,
        });

        await adminUser.save();

        res.status(201).json(adminUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user.');
    }
})


module.exports = app;
