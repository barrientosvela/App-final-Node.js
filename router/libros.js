const express = require('express');
const Libros = require('../models/libros');
const router = express.Router();

router.get('/crear', (req, res) => {
    res.render('crud/crear-libro'); //nueva vista que llamaremos Crear
})


router.get('/', async (req, res) => {
    try {
        const arrayLibroDB = await Libros.find();
        console.log(arrayLibroDB);
        res.render("libros", {
            arrayLibro: arrayLibroDB
        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/:id', async (req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "Libro.ejs" le pusimos
    //a este campo Libro.id, por eso lo llamados con params.id
    try {
        const LibroDB = await Libros.findOne({ _id: id }) //_id porque así lo indica Mongo
        //Esta variable “Libro” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        console.log(LibroDB) //Para probarlo por consola
        res.render('crud/editar-libro', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            libro: LibroDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('crud/editar-libro', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Libro no encontrado!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const LibroDB = await Libros.findByIdAndDelete({ _id: id });
        if (!LibroDB) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar el Libro.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Libro eliminado.'
            })
        }
    } catch (error) {
        console.log(error)
    }
})
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const LibroDB = await Libros.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(LibroDB)
        res.json({
            estado: true,
            mensaje: 'Libro editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Libro'
        })
    }
})

router.post('/', async (req, res) => {
    const body = req.body
    try {
        const librosDB = new Libros(body)
        await librosDB.save()
        res.redirect('/libros')
    } catch {
        console.log('error', error)
    }
})

module.exports = router;