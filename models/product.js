const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id : number,
    name : string,
    price : number,
})

module.exports.Product = mongoose.model('Product', productSchema);