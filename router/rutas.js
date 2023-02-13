const express = require('express'); //Requerimos Express
const Pokemon = require('../models/pokemon');
const Entrenador = require('../models/entrenador')
const router = express.Router();


// Ahora, CORTAMOS del fichero principal 01-express.js
// las dos rutas que tenemos: la principal ( / ) y la 
// de contactos ( /contaco )
// Importante que ya no usaremos el app.get(...), ahora
//vamos a utilizar las rutas, por lo que deberemos poner:
router.get('/', (req, res) => {
    res.render("index")
})
router.get('/contacto', (req, res) => {
    res.render("contacto", { tituloContacto: "Estamos en contacto de manera dinámica!!" })
})

router.post('/', async (req, res) => {
    const body = req.body
    try {
        const pokemonDB = new Pokemon(body)
        await pokemonDB.save()
        res.redirect('/pokemon')
    } catch (error) {
        console.log('Error: ', error)
    }
})
router.post('/', async (req, res) => {
    const body = req.body
    try {
        const entrenadorDB = new Entrenador(body)
        await entrenadorDB.save()
        res.redirect('/entrenador')
    } catch (error) {
        console.log('Error: ', error)
    }
})

// Por último, vamos a exportarlo:
module.exports = router;