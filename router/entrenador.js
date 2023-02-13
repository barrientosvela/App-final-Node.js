const express = require('express');
const Entrenador = require('../models/entrenador');
const Pokemon = require('../models/pokemon');
const router = express.Router();

router.get('/crear-entrenador', (req, res) => {
    res.render('crear-entrenador'); //nueva vista que llamaremos Crear
})

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayPokemonDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayPokemon que tenemos EN LA VISTA
        const arrayEntrenadorDB = await Entrenador.find();
        console.log(arrayEntrenadorDB);
        res.render("entrenador", {
            arrayEntrenador: arrayEntrenadorDB
        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/:id', async (req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "pokemon.ejs" le pusimos
    //a este campo pokemon.id, por eso lo llamados con params.id
    try {
        const entrenadorDB = await Entrenador.findOne({ _id: id }) //_id porque así lo indica Mongo
        //Esta variable “Pokemon” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        console.log(entrenadorDB) //Para probarlo por consola
        res.render('detalle-entrenador', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            entrenador: entrenadorDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detalle-entrenador', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'entrenador no encontrado!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const entrenadorDB = await Entrenador.findByIdAndDelete({ _id: id });
        console.log(entrenadorDB)
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/entrenador') //Esto daría un error, tal y como podemos ver arriba
        if (!entrenadorDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el entrenador.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'entrenador eliminado.'
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
        const entrenadorDB = await Entrenador.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(entrenadorDB)
        res.json({
            estado: true,
            mensaje: 'entrenador editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el entrenador'
        })
    }
})


router.post('/', async (req, res) => {
    const body = req.body
    try {
        const entrenadorDB = new Entrenador(body)
        await entrenadorDB.save()
        res.redirect('/entrenador')
    } catch {
        console.log('error', error)
    }
})

module.exports = router;