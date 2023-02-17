const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const libroSchema = new Schema({
    titulo: String,
    autor: String,
    genero: String,
    paginas: String
})

// Creamos el modelo
const Libros = mongoose.model('libros', libroSchema, 'libros')

module.exports = Libros;