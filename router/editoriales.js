const express = require('express');
const Editorial = require('../models/editoriales');
const router = express.Router();

router.get('/crear-editorial', (req, res) => {
    res.render('crud/crear-editorial'); 
})

router.get('/', async (req, res) => {
    try {
        const arrayEditoriaDB = await Editorial.find();
        res.render("editoriales", {
            arrayEditoria: arrayEditoriaDB
        })
    } catch (error) {
        console.error(error)
    }
})
router.get('/:id', async (req, res) => { 
    try {
        const editorialDB = await Editorial.findOne({ _id: id }) 
        console.log(editorialDB) //Para probarlo por consola
        res.render('crud/editar-editorial', { 
            editorial: editorialDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('crud/editar-editorial', { 
            error: true,
            mensaje: 'La editorial no encontrado!'
        })
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        //siguiente función para eliminar
        const editorialDB = await Editorial.findByIdAndDelete({ _id: id });
        console.log(editorialDB)
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