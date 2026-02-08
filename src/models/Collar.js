const mongoose = require('mongoose');

const collarSchema = new mongoose.Schema({
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
    imagen: {
        type: String,
        required: true
    }
},
{ timestamps: true }

);

const Collar = mongoose.model('Collar', collarSchema);

module.exports = Collar;