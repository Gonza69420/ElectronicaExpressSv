const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : String,
    price : Number,
    customId : {type : Number, unique: true}
})

const productQuantitySchema = new mongoose.Schema({
    product : productSchema,
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
    customId : {type : Number, unique: true}
})

machineSchema.pre('save', async function (next) {
    if (!this.customId) {
        const lastMachine = await this.constructor.findOne({}, { customId: 1 }).sort({ customId: -1 });
        this.customId = lastMachine ? lastMachine.customId + 1 : 1;
    }
    next();
});

productSchema.pre('save', async function (next) {
    if (!this.customId) {
        const lastProduct = await this.constructor.findOne({}, { customId: 1 }).sort({ customId: -1 });
        this.customId = lastProduct ? lastProduct.customId + 1 : 1;
    }
    next();
});

module.exports.Product = mongoose.model('Product', productSchema);
module.exports.Machine = mongoose.model('Machine', machineSchema);
