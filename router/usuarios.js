const express = require('express');
const User = require('../models/usuarios');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayPokemonDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayPokemon que tenemos EN LA VISTA
        const arrayUsuarioDB = await Usuario.find();
        res.render("cabecera", {
            arrayUsuario: arrayUsuarioDB
        })
    } catch (error) {
        console.error(error)
    }
})

router.post('/', async (req, res) => {
    const body = req.body
    try {
        const usuariosDB = new User(body)
        await usuariosDB.save()
        res.redirect('/cabecera')
    } catch {
        console.log('error', error)
    }
})

module.exports = router;