const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nombre: String,
    nick: String,
    password: String,
    email: String,
    admin: String
})

// Creamos el modelo
const User = mongoose.model('usuario', userSchema, 'usuario')

module.exports = User;