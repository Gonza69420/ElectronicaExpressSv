const mongoose = require('mongoose');

const productQuantitySchema = new mongoose.Schema({
    productId : number,
    quantity : number,
})

const machineSchema = new mongoose.Schema({
    works : {
        type : boolean,
        default: false
    },
    beingRepaired : {
        type : boolean,
        default : false,
    },
    income : {
        type : number,
        default : 0,
    },
    products : {
        type : [productQuantitySchema],
        default : [],
    },
})

module.exports.Machine = mongoose.model('Machine', machineSchema);
