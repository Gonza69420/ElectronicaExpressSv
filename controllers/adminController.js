const {Machine , Product} = require("../models/machine");
const {User, Role} = require("../models/user");
const publishController = require('./mqttControllers/publishController');
const bcrypt = require('bcrypt');
const authenticateJWT = require('../JWT/protectRoutes.js');


exports.addMachine = async (req, res) => {
    try {
        const newMachine = new Machine();

        const savedMachine = await newMachine.save();

        res.status(201).json({ message: "Machine added successfully", machine: savedMachine });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

exports.deleteMachine = async (req, res) => {
    try {
        const {machineId} = req.params;

        const result = await Machine.findOneAndRemove({customId: machineId});

        if (result == null) {
            return res.status(404).json({error: "Machine not found"});
        }

        publishController.publishMessage(`machine/delete/${machineId}`, `delete`);

        res.status(200).json({message: "Machine deleted successfully"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

exports.getIncome = async (req, res) => {
    try {
        const {machineId} = req.params;

        const machine = await Machine.findOne({customId: machineId});

        if (machine == null) {
            return res.status(404).json({error: "Machine not found"});
        }

        const income = machine.income;

        res.status(200).json({data : income});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.getAllMachines = async (req, res) => {
    try {
        const machines = await Machine.find({});

        res.status(200).json({ data: { machines } });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.addMaintenanceStaff = async (req, res) => {
    try {
        const { username, password, name } = req.body;

        let role = await Role.findOne({ name: 'Maintenance' });

        if (role == null) {
            const newRole = new Role({
                name: 'Maintenance',
            });
            await newRole.save();
        }

        role = await Role.findOne({ name: 'Maintenance' });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            password: hash,
            name,
            role: role,
        });

        await user.save();

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating the user' });
    }
};


exports.deleteMaintenanceStaff = async (req, res) => {
    try {
        const { maintenanceId } = req.params;

        // Get the user based on maintenanceId
        const user = await User.findOne({ customId: maintenanceId });

        if (user == null) {
            return res.status(404).json({ error: 'Maintenance not found' });
        }

        // Check if the user has the role "Maintenance"
        if (user.role.name !== 'Maintenance') {
            return res.status(403).json({ error: 'Access denied. User does not have the required role.' });
        }

        // If the user has the correct role, proceed with deletion
        const result = await User.deleteOne({ customId: maintenanceId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Maintenance not found' });
        }

        res.status(200).json({ message: 'Maintenance deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




exports.getMachine = async (req, res) => {
    try {
        const { machineId } = req.params;

        const machine = await Machine.findOne({ customId: machineId });

        if (machine == null) {
            return res.status(404).json({ error: 'Machine not found' });
        }

        // Success response
        res.status(200).json({ data: { machine } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getTotalIncome = async (req, res) => {
    try {
        const machines = await Machine.find({}, 'income');

        const totalIncome = machines.reduce((total, machine) => total + (machine.income || 0), 0);

        // Success response
        res.status(200).json({ data: { totalIncome } });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el ingreso de las máquinas', details: error.message });
    }
};


exports.adjustProductPrice = async (req, res) => {
    try {
        const {productId} = req.params;
        const {newPrice} = req.body;

        const product = await Product.findOne({customId: productId});

        if (product == null) {
            return res.status(404).json({error: "Product not found"});
        }

        product.price = newPrice;

        await product.save();

        publishController.publishMessage(`product/adjustPrice`, JSON.stringify(product));

        res.status(200).json({message: "Product price adjusted successfully"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.addProduct = async (req, res) => {
    try {
        const {name, price} = req.body;

        const newProduct = new Product({
            name,
            price
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({message: "Product added successfully", data: savedProduct});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findOne({ customId: productId });

        if (product == null) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Publish Message with more details
        publishController.publishMessage('product/delete', JSON.stringify({ productId }));

        // Success response
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findOne({ customId: productId });

        if (product == null) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Success response
        res.status(200).json({ data: { product } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});

        res.status(200).json({ data: { products } });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.getMaintenanceStaff = async (req, res) => {
    try {
        const { maintenanceId } = req.params;

        const role = await Role.find({ name: 'Maintenance' });
        const user = await User.find({ role: role, customId: maintenanceId });

        if (user == null ) {
            return res.status(404).json({ error: 'Maintenance not found' });
        }

        // Success response
        res.status(200).json({ data: { user } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.allMaintenanceStaff = async (req, res) => {
    try {
        const role = await Role.find({ name: 'Maintenance' });
        const users = await User.find({ role: role });

        // Success response
        res.status(200).json({ data: { users } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
