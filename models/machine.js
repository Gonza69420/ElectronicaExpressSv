const mongoose = require('mongoose');

const productQuantitySchema = new mongoose.Schema({
    productId : Number,
    quantity : Number,
})

const machineSchema = new mongoose.Schema({
    works : {
        type : Boolean,
        default: false
    },
    beingRepaired : {
        type : Boolean,
        default : false,
    },
    income : {
        type : Number,
        default : 0,
    },
    products : {
        type : [productQuantitySchema],
        default : [],
    },
})

module.exports.Machine = mongoose.model('Machine', machineSchema);
