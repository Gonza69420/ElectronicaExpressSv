const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : string,
    price : number,
})

module.exports.Product = mongoose.model('Product', productSchema);