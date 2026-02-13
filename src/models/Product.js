const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    idProd: {
        type: String,
        required: true,
        unique: true
    },
    priceID: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }, 
    slug: {
        type: String,
        required: true,
        unique: true
    }
},
{ timestamps: true }

);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;