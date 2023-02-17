const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const editorialSchema = new Schema({
    nombre: String,
    descripcion: String
})

// Creamos el modelo
const Editorial = mongoose.model('editorial', editorialSchema, 'editoriales')

module.exports = Editorial;