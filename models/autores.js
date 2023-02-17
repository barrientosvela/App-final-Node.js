const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const autoresSchema = new Schema({
    nombre: String,
    descripcion: String
})

// Creamos el modelo
const Autor = mongoose.model('autor', autoresSchema, 'autores')

module.exports = Autor;