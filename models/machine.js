const mongoose = require('mongoose');

const productQuantitySchema = new mongoose.Schema({
    productId : number,
    quantity : number,
})

const machineSchema = new mongoose.Schema({
    id : number,
    works : boolean,
    beingRepaired : boolean,
    income : number,
    products : [productQuantitySchema],
})

module.exports.Machine = mongoose.model('Machine', machineSchema);
