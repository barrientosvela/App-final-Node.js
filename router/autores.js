const express = require('express');
const Autor = require('../models/autores');
const router = express.Router();

router.get('/crear-autor', (req, res) => {
    res.render('crud/crear-autor');
})

router.get('/', async (req, res) => {
    try {
        // Array de campos en la DB para usarlo en la vista
        const arrayAutorDB = await Autor.find();
        res.render("autores", {
            arrayAutor: arrayAutorDB
        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/:id', async (req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id
    try {
        const autorDB = await Autor.findOne({ _id: id })
        console.log(autorDB) //Para probarlo por consola
        res.render('crud/editar-autor', { //Para mostrar el objeto en la vista "editar"
            autor: autorDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('crud/editar-autor', { //Mostraremos el error en la vista "editar"
            error: true,
            mensaje: 'autor no encontrado!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        // Siguiente función para eliminar
        const autorDB = await Autor.findByIdAndDelete({ _id: id });
        console.log(autorDB)
        if (!autorDB) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar el autor.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'autor eliminado.'
            })
        }
    } catch (error) {
        console.log(error)
    }
})
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const autorDB = await Autor.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(autorDB)
        res.json({
            estado: true,
            mensaje: 'autor editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el autor'
        })
    }
})


router.post('/', async (req, res) => {
    const body = req.body
    try {
        const autorDB = new Autor(body)
        await autorDB.save()
        res.redirect('/autores')
    } catch {
        console.log('error', error)
    }
})

module.exports = router;