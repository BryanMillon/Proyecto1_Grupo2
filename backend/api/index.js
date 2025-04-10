const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

//Routes
const routesNotices= require("./routes/routesNotices");
const routesReports= require("./routes/routesReports");
const routesSignUp = require("./routes/routeSignUp")
const routeAccountVerification = require("./routes/routeAccountVerification")


/*Establecer la conexión con Mongo */
mongoose.connect(process.env.MONGO_URI)

const app = express();
const port = 3000;

// habilitar CORS
app.use(cors());

//habilitar body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => {
  /*req: donde viaja la información de la petición*/
   /*res: donde viaja la información de la respuesta*/
res.send('Hola Mundo desde el proyecto!')
});

//habilitar routes
app.use('/',routesNotices);
app.use('/',routesReports);
app.use('/',routesSignUp);
app.use('/',routeAccountVerification);




// servir archivos estáticos desde la carpeta public
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`)
  })




