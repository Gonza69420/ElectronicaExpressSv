const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : String,
    price : Number,
})

module.exports.Product = mongoose.model('Product', productSchema);