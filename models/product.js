const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : String,
    price : Number,
    customId : {type : Number, unique: true}
})

productSchema.pre('save', async function (next) {
    if (!this.customId) {
        const lastProduct = await this.constructor.findOne({}, { customId: 1 }).sort({ customId: -1 });
        this.customId = lastProduct ? lastProduct.customId + 1 : 1;
    }
    next();
});

module.exports.Product = mongoose.model('Product', productSchema);