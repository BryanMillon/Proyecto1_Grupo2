const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  apellidos: String,
  direccion: String,
  senas: String,
  telefono: String,
  correo: String,
  fotoPerfil: String, // puede almacenar una URL base64 por ahora
});

module.exports = mongoose.model('Usuario', usuarioSchema);