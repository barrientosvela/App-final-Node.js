const express = require('express');
const Editorial = require('../models/editoriales');
const router = express.Router();

router.get('/crear-editorial', (req, res) => {
    res.render('crud/crear-editorial'); //nueva vista que llamaremos Crear
})

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayPokemonDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayPokemon que tenemos EN LA VISTA
        const arrayEditoriaDB = await Editorial.find();
        res.render("editoriales", {
            arrayEditoria: arrayEditoriaDB
        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/:id', async (req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "pokemon.ejs" le pusimos
    //a este campo pokemon.id, por eso lo llamados con params.id
    try {
        const editorialDB = await Editorial.findOne({ _id: id }) //_id porque así lo indica Mongo
        //Esta variable “Pokemon” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        console.log(editorialDB) //Para probarlo por consola
        res.render('crud/editar-editorial', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            editorial: editorialDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('crud/editar-editorial', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'La editorial no encontrado!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const editorialDB = await Editorial.findByIdAndDelete({ _id: id });
        console.log(editorialDB)
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/editorial') //Esto daría un error, tal y como podemos ver arriba
        if (!editorialDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar la editorial.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Editorial eliminada.'
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
        const editorialDB = await Editorial.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(editorialDB)
        res.json({
            estado: true,
            mensaje: 'Editorial editada'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar la editorial'
        })
    }
})


router.post('/', async (req, res) => {
    const body = req.body
    try {
        const editorialesDB = new Editorial(body)
        await editorialesDB.save()
        res.redirect('/editoriales')
    } catch {
        console.log('error', error)
    }
})

module.exports = router;