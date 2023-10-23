const { Machine } = require('../../models/machine');
const { Product } = require('../../models/product');

exports.soldProduct = async (message) => {
    try{
        const jsonMessage = JSON.parse(message);

        // message = {
        //     machine: <Machine>
        //     productId: number
        // }

        const machine = await Machine.findOne({_id : jsonMessage.machine.id});

        if (!machine){
            throw new Error("Machine not found");
        }

        const product = await Product.findOne({_id : jsonMessage.productId});

        if (!product){
            throw new Error("Product not found");
        }

        machine.income += product.price;

        const index = machine.products.findIndex((product) => product.productId === jsonMessage.productId);

        if (index === -1){
            throw new Error("Product not found in machine");
        }

        machine.products[index].quantity -= 1;

        if (machine.products[index].quantity === 0){
            machine.products.splice(index, 1);
        }

        await machine.save();


        console.log(`Sold product`);
    } catch (err) {
        console.log(err);
    }
}

exports.machineBroken = async (message) => {
    console.log(`Machine broke: ${message}`);
}

exports.machineWorking = async (message) => {
    console.log(`Machine working: ${message}`);
}

exports.machineReady = async (message) => {
    console.log(`Machine ready: ${message}`);
}

exports.machineConnected = async (message) => {
    console.log(`Machine connected: ${message}`);
}
