const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()


mongoose.connect(process.env.MONGO_URI)


const app = express();


const port = 3000;

// habilitar CORS
app.use(cors());

//habilitar body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// servir archivos estáticos desde la carpeta public
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`)
  })