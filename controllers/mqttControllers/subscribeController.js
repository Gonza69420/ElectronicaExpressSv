const { Machine, Product } = require('../../models/machine');
const publishController = require('../mqttControllers/publishController');
exports.soldProduct = async (message) => {
    try{
        const jsonMessage = JSON.parse(message);
        console.log("Estas vendiendo");
        // message = {
        //     machineId: number
        //     productId: number
        // }

        const machine = await Machine.findOne({customId : jsonMessage.machineId});

        if (machine == null){
            throw new Error("Machine not found");
        }

        const product = await Product.findOne({customId : jsonMessage.productId});

        if (product == null){
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
    try{
        const jsonMessage = JSON.parse(message);

        // message = {
        //     machineId: number
        // }

        const machine = await Machine.findOne({customId : jsonMessage.machineId});

        if (machine == null){
            throw new Error("Machine not found");
        }

        machine.works = true;

        await machine.save();

        console.log(`Machine broken`);
    } catch (err) {
        console.log(err);
    }
}

exports.machineConnected = async (message) => {
    try{
        const jsonMessage = JSON.parse(message);

        // message = {
        //     machineId: id
        // }

        const machine = await Machine.findOne({customId : jsonMessage.machineId});

        if (machine == null){
            throw new Error("Machine not found");
        }

        machine.works = true;

        await machine.save();

        //pub Machine
        publishController.publishMessage(`machine/Connected/${machine.customId}`, JSON.stringify(machine));
        console.log(`Machine connected`);
    } catch (err) {
        console.log(err);
    }
}
