const express = require('express');
const Libros = require('../models/libros');
const router = express.Router();

router.get('/crear', (req, res) => {
    res.render('crear'); //nueva vista que llamaremos Crear
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
    const id = req.params.id //Recordemos que en la plantilla "pokemon.ejs" le pusimos
    //a este campo pokemon.id, por eso lo llamados con params.id
    try {
        const pokemonDB = await Pokemon.findOne({ _id: id }) //_id porque así lo indica Mongo
        //Esta variable “Pokemon” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        console.log(pokemonDB) //Para probarlo por consola
        res.render('detalle', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            pokemon: pokemonDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detalle', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Pokemon no encontrado!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const pokemonDB = await Pokemon.findByIdAndDelete({ _id: id });
        console.log(pokemonDB)
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/pokemon') //Esto daría un error, tal y como podemos ver arriba
        if (!pokemonDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el Pokémon.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Pokémon eliminado.'
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
        const pokemonDB = await Pokemon.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(pokemonDB)
        res.json({
            estado: true,
            mensaje: 'Pokémon editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Pokémon'
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