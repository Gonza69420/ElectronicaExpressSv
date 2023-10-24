const {Machine} = require('../models/machine');
const publishController = require('./mqttControllers/publishController');

exports.refillMachine = async (req, res) => {
    try{
        const {machineId} = req.params;
        const {newQuantity , productId } = req.body;

        const machine = await Machine.findById(machineId);

        if (!machine){
            return res.status(404).json({error : "Machine not found"});
        }

        const product = machine.products.find(product => product.productId === productId);

        if (!product){
            return res.status(404).json({error : "Product not found"});
        }

        product.quantity = newQuantity;

        await machine.save();

        publishController.publishMessage(`machine/refill/${machineId}` , JSON.stringify({productId , newQuantity}));

        res.status(200).json({message : "Machine refilled successfully"});
    } catch(err){
        res.status(500).json({error : err.message});
    }
}

exports.workingInMachine = async (req, res) => {
    try{
        const {machineId} = req.params;

        const machine = await Machine.findById(machineId);

        if (!machine){
            return res.status(404).json({error : "Machine not found"});
        }

        machine.working = true;

        await machine.save();

        res.status(200).json({message : "Machine working successfully"});
    } catch(err){
        res.status(500).json({error : err.message});
    }
}

exports.machineReady = async (req, res) => {
    try {
        const {machineId} = req.params;

        const machine = await Machine.findById(machineId);

        if (!machine) {
            return res.status(404).json({error: "Machine not found"});
        }

        machine.working = false;

        await machine.save();

        res.status(200).json({message: "Machine ready successfully"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}