const {Machine, Product} = require('../models/machine');
const publishController = require('./mqttControllers/publishController');

exports.refillMachine = async (req, res) => {
    try {
        const { machineId } = req.params;
        const { newQuantity, productId } = req.body;

        const machine = await Machine.findOne({ customId: machineId });

        if (machine == null) {
            return res.status(404).json({ error: 'Machine not found' });
        }

        const product = Product.findOne({customId : productId});

        if (product == null) {
            return res.status(404).json({ error: 'Product not found' });
        }

        //const product = machine.products.find(product => product.customId === productId);
        const productInsideMachine = machine.products.find(product => product.product.customId.toString() === productId);

        if (productInsideMachine == null) {
            // If the product is not found, add it to the machine
            const productToAdd = await Product.findOne({ customId: productId });

            if (!productToAdd) {
                return res.status(404).json({ error: 'Product not found' });
            }

            machine.products.push({
                product: productToAdd,
                quantity: newQuantity,
            });
        } else {
            // If the product is found, update its quantity
            productInsideMachine.quantity = newQuantity;
        }

        // Ensure to await the save operation
        await machine.save();

        // Use a more structured message payload with machine products
        const messagePayload = {
            machineId,
            products: machine.products.map(productInfo => ({
                productId: productInfo.product.customId,
                productName: productInfo.product.name,
                quantity: productInfo.quantity,
            })),
        };

        // Publish the message with the updated payload
        publishController.publishMessage(`machine/refill/${machineId}`, JSON.stringify(messagePayload));

        // Success response
        res.status(200).json({ message: 'Machine refilled successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.workingInMachine = async (req, res) => {
    try{
        const {machineId} = req.params;

        const machine = await Machine.findOne({customId : machineId});

        if (machine == null){
            return res.status(404).json({error : "Machine not found"});
        }

        machine.works = false;
        machine.beingRepaired = true;

        await machine.save();

        publishController.publishMessage(`machine/working/${machineId}`, { message: 'Machine working' });


        res.status(200).json({message : "Machine working successfully"});
    } catch(err){
        res.status(500).json({error : err.message});
    }
}

exports.machineReady = async (req, res) => {
    try {
        const { machineId } = req.params;

        const machine = await Machine.findOne({ customId: machineId });

        if (machine == null) {
            return res.status(404).json({ error: 'Machine not found' });
        }

        machine.works = true;
        machine.beingRepaired = false;

        // Ensure to await the save operation
        await machine.save();

        // Publish message
        publishController.publishMessage(`machine/ready/${machineId}`, { message: 'Machine ready' });

        // Success response
        res.status(200).json({ message: 'Machine ready successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.eliminateProductFromMachine = async (req, res) => {
    try{
        const { machineId , productId} = req.params;

        const machine = await Machine.findOne({customId : machineId});

        if (machine == null){
            return res.status(404).json({error : "Machine not found"});
        }

        const product = machine.products.find(product => product.product.customId.toString() === productId);

        if (product == null){
            return res.status(404).json({error : "Product not found"});
        }

        const index = machine.products.findIndex(product => product.product.customId.toString() === productId);

        machine.products.splice(index, 1);

        await machine.save();

        //publish message

        res.status(200).json({message : "Product eliminated successfully"});

    } catch(err){
        res.status(500).json({error : err.message});
    }
}
