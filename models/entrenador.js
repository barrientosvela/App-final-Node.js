const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrenadorSchema = new Schema({
    nombre: String,
    edad: Number,
    biografia: String,
    ciudad: String,
    listaPokemon: String
})

// Creamos el modelo
const Entrenador = mongoose.model('entrenador', entrenadorSchema, 'entrenador')

module.exports = Entrenador;