const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

// Configuración de passport
const configPassport = require('./utils/passport');

//Routes 
const { router: authRoutes } = require('./routes/routesAuth');
const routesNotices = require("./routes/routesNotices");
const routesNews = require("./routes/routesNews");
const routesReports = require("./routes/routesReports");
const routesSignUp = require("./routes/routeSignUp");
const routeAccountVerification = require("./routes/routeAccountVerification");
const routeLogin = require("./routes/routeLogin");
const iniciativasRoutes = require('./routes/iniciativasRoutes');
const routesUsers = require('./routes/routeAdminUsers');
const routeGetUsers = require('./routes/userRoutes')


//const { router: routesUsers } = require('./routes/routeAdminUsers');

//const usuariosRoutes = require('./routes/usuariosRoutes');
const routeRecoveryPassword = require('./routes/routeRecoveryPassword');


/*Establecer la conexión con Mongo */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

const app = express();
const port = process.env.PORT || 3000;

// habilitar CORS
//app.use(cors({
  //origin: ['http://localhost:3000', 'http://127.0.0.1:5501'], // Asegúrate de que tu frontend pueda acceder
  //credentials: true                // Importante para enviar cookies
//}));

app.use(cors());

//habilitar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Configuración de sesiones (necesario para passport)
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret_muy_seguro_para_sesiones',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // En desarrollo, usa `false`. En producción, usa `true` con HTTPS.
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
  }
}));

// Inicializar Passport y la sesión de Passport
app.use(passport.initialize());
app.use(passport.session());

// Ejecutar la configuración de passport
configPassport();

app.get('/', (req, res) => {
  /*req: donde viaja la información de la petición*/
  /*res: donde viaja la información de la respuesta*/
  res.send('Hola Mundo desde el proyecto!')
});


// Middleware para verificar autenticación (puedes usarlo en rutas que requieren autenticación)
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'No autorizado, inicie sesión primero' });
};

// Ruta de ejemplo protegida
app.get('/api/user', isAuthenticated, (req, res) => {
  res.json({
    id: req.user._id,
    nombre: req.user.nombre,
    email: req.user.email,
    rol: req.user.rol
  });
});


//habilitar routes
app.use('/auth', authRoutes);
app.use('/', routesNotices);
app.use('/', routesNews);
app.use('/', routesReports);
app.use('/', routesSignUp);
app.use('/', routeAccountVerification);
app.use('/', routeLogin);
app.use('/', iniciativasRoutes);
//app.use('/', usuariosRoutes);
app.use('/', routeRecoveryPassword);
app.use('/', routesUsers);
app.use('/', routeGetUsers);


// servir archivos estáticos desde la carpeta public
app.use(express.static('public'));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`)
});