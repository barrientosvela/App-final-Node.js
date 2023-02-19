const express = require('express');
const Autor = require('../models/autores');
const router = express.Router();

router.get('/crear-autor', (req, res) => {
    res.render('crud/crear-autor'); //nueva vista que llamaremos Crear
})

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayPokemonDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayPokemon que tenemos EN LA VISTA
        const arrayAutorDB = await Autor.find();
        res.render("autores", {
            arrayAutor: arrayAutorDB
        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/:id', async (req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "pokemon.ejs" le pusimos
    //a este campo pokemon.id, por eso lo llamados con params.id
    try {
        const autorDB = await Autor.findOne({ _id: id }) //_id porque así lo indica Mongo
        //Esta variable “Pokemon” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        console.log(autorDB) //Para probarlo por consola
        res.render('crud/editar-autor', { //Para mostrar el objeto en la vista "editar", que tenemos que crear
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
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const autorDB = await Autor.findByIdAndDelete({ _id: id });
        console.log(autorDB)
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/autor') //Esto daría un error, tal y como podemos ver arriba
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