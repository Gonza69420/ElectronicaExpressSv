const {Machine} = require("../models/machine");
const { User , Role } = require("../models/user");
const {Product } = require("../models/product");
const publishController = require('./mqttControllers/publishController');
const bcrypt = require('bcrypt');
const {authenticateJWT} = require('../JWT/protectRoutes');

exports.addMachine = async (req, res) => {
    try{
        const newMachine = new Machine();

        const savedMachine = await newMachine.save();

        res.status(201).json({message : "Machine added successfully"}, savedMachine);
    } catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.deleteMachine = async (req, res) => {
    try{
        const {machineId } = req.params;

        const result = await Machine.findOneAndRemove({_id : machineId});

        if (!result){
            return res.status(404).json({error : "Machine not found"});
        }

        res.status(200).json({message : "Machine deleted successfully"});

        publishController.publishMessage(`machine/delete/${machineId}` , `delete`);
    } catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.getIncome = async (req, res) => {
    try{
        const {machineId} = req.params;

        const machine = await Machine.findOne({_id : machineId});

        if (!machine){
            return res.status(404).json({error : "Machine not found"});
        }

        const income = machine.income;

        res.status(200).json({ income});
    } catch(err){
        res.status(500).json({error : err.message});
    }
}

exports.getAllMachines = async (req, res) => {
    try{
        const machines = await Machine.find({});

        res.status(200).json({machines});
    } catch(err){
        res.status(500).json({error : err.message});
    }
}

exports.addMaintenanceStaff = async (req, res) => {
    try {
        const { username, password , name} = req.body;

        const role = await Role.findOne({ name : 'Maintenance' });

        if (!role) {
            return res.status(400).json({ message: 'Role not found' });
        }


        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, async (err, hash) => {
              if (err) {
                  res.status(500).json({ message: 'Error creating the user', err });
              } else {
                  const user = new User({
                      username,
                      hash,
                      name,
                      role: role._id,
                  });

                  await user.save();
              }
          })
        })

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating the user', error });
    }
}


exports.deleteMaintenanceStaff = async (req, res) => {
    try{
        const {maintenanceId } = req.params

        const result = await User.findOneAndRemove({_id : maintenanceId});

        if (!result){
            return res.status(404).json({error : "Maintenance not found"});
        }

        res.status(200).json({message : "Maintenance deleted successfully"});
    } catch(err){
        res.status(500).json({error : err.message});
    }
}


exports.getMachine = async (req, res) => {
    try{
        const {machineId} = req.params;

        const machine = await Machine.findOne({_id : machineId});

        if (!machine){
            return res.status(404).json({error : "Machine not found"});
        }

        res.status(200).json({machine});

    } catch(err){
        res.status(500).json({error : err.message});
    }
}

exports.getTotalIncome = async (req, res) => {
    try {
        // Utiliza la función `find` para obtener todos los documentos de Machine
        const machines = await Machine.find({}, 'income'); // Proyecta solo el campo 'income'

        const totalIncome = machines.reduce((total, machine) => total + machine.income, 0);

        res.status(200).json({ totalIncome });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el ingreso de las máquinas', error });
    }
}

exports.adjustProductPrice = async (req, res) => {
    try{
        const {productId} = req.params;
        const {newPrice} = req.body;

        const product = await Product.findOne({_id : productId});

        if (!product){
            return res.status(404).json({error : "Product not found"});
        }

        product.price = newPrice;

        await product.save();

        res.status(200).json({message : "Product price adjusted successfully"});

        publishController.publishMessage(`product/adjustPrice/` , `{newPrice}`);
    } catch(err){
        res.status(500).json({error : err.message});
    }
}

exports.addProduct = async (req, res) => {
    try{
        const {name , price} = req.body;

        const newProduct = new Product({
            name,
            price
        });

        const savedProduct = await newProduct.save();

        publishController.publishMessage(`product/add` , JSON.stringify(savedProduct));

        res.status(201).json({message : "Product added successfully"}, savedProduct);
    } catch(err){
        res.status(500).json({error : err.message});
    }
}

exports.deleteProduct = async (req, res) => {
    try{
        const {productId } = req.params;

        const product = await Product.findByIdAndDelete(productId);

        if (!product){
            return res.status(404).json({error : "Product not found"});
        }

        publishController.publishMessage(`product/delete` , `${productId}`);

        res.status(200).json({message : "Product deleted successfully"});
    } catch(err){
        res.status(500).json({error : err.message});
    }
}
