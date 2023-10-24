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
    try{
        const jsonMessage = JSON.parse(message);

        // message = {
        //     machine: <Machine>
        // }

        const machine = await Machine.findOne({_id : jsonMessage.machine.id});

        if (!machine){
            throw new Error("Machine not found");
        }

        machine.works = true;

        await machine.save();

        console.log(`Machine broken`);
    } catch (err) {
        console.log(err);
    }
}

exports.machineWorking = async (message) => {
    try{
        const jsonMessage = JSON.parse(message);

        // message = {
        //     machine: <Machine>
        // }

        const machine = await Machine.findOne({_id : jsonMessage.machine.id});

        if (!machine){
            throw new Error("Machine not found");
        }

        machine.works = true;

        await machine.save();

        console.log(`Machine working`);
    } catch (err) {
        console.log(err);
    }
}

exports.machineReady = async (message) => {
    try{
        const jsonMessage = JSON.parse(message);

        // message = {
        //     machine: <Machine>
        // }

        const machine = await Machine.findOne({_id : jsonMessage.machine.id});

        if (!machine){
            throw new Error("Machine not found");
        }

        machine.works = false;

        await machine.save();

        console.log(`Machine ready`);
    } catch (err) {
        console.log(err);
    }
}

exports.machineConnected = async (message) => {
    try{
        const jsonMessage = JSON.parse(message);

        // message = {
        //     machine: id
        // }

        const machine = await Machine.findOne({_id : jsonMessage.machineId});

        if (!machine){
            throw new Error("Machine not found");
        }

        machine.works = true;

        await machine.save();

        //pub Machine

        console.log(`Machine connected`);
    } catch (err) {
        console.log(err);
    }
}
