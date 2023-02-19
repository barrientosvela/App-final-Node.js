const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const port = process.env.PORT

//Conexión a base de datos
const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.BD_PASSWORD}@cluster0.ccao8rx.mongodb.net/${process.env.BD_NAME}?retryWrites=true&w=majority`; //URL de conexión, que completaremos luego

mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log(e))
//Middleware
app.use(express.static(__dirname + '/public'));

//Motor de plantillas
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//Peticiones básicas HTTP
app.use('/', require('./router/rutas'))
app.use('/registro', require('./router/rutas'))
app.use('/libros', require('./router/libros'))
app.use('/autores', require('./router/autores'))
app.use('/editoriales', require('./router/editoriales'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.use((req, res) => {
  res.status(404).render("404", {
    titulo: "Página no encontrada"
  })
})
