const mongoose = require('mongoose');

//montaje del esquema proveedor
const proveedorSchema = mongoose.Schema({

    empresa: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
},{versionkey:false});

module.exports = mongoose.model('Proveedor',proveedorSchema);