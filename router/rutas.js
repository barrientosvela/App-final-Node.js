const express = require('express'); //Requerimos Express
const Libro = require('../models/libros');
const Autor = require('../models/autores');
const Editorial = require('../models/editoriales');
const router = express.Router();


// Ahora, CORTAMOS del fichero principal 01-express.js
// las dos rutas que tenemos: la principal ( / ) y la 
// de contactos ( /contaco )
// Importante que ya no usaremos el app.get(...), ahora
//vamos a utilizar las rutas, por lo que deberemos poner:
router.get('/', (req, res) => {
    res.render("inicio")
})
router.get('/registro', (req, res) => {
    res.render("registro")
})
router.get('/contacto', (req, res) => {
    res.render("contacto", { tituloContacto: "Estamos en contacto de manera dinámica!!" })
})

router.post('/', async (req, res) => {
    const body = req.body
    try {
        const librosDB = new Libro(body)
        await librosDB.save()
        res.redirect('/libros')
    } catch (error) {
        console.log('Error: ', error)
    }
})
router.post('/', async (req, res) => {
    const body = req.body
    try {
        const autorDB = new Autor(body)
        await autorDB.save()
        res.redirect('/autores')
    } catch (error) {
        console.log('Error: ', error)
    }
})
router.post('/', async (req, res) => {
    const body = req.body
    try {
        const editorialDB = new Editorial(body)
        await editorialDB.save()
        res.redirect('/editoriales')
    } catch (error) {
        console.log('Error: ', error)
    }
})
// Por último, vamos a exportarlo:
module.exports = router;