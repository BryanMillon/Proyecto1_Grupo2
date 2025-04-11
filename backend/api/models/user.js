const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  apellido1: {
    type: String,
    required: true,
    trim: true
  },
  apellido2: {
    type: String,
    required: true,
    trim: true
  },
  cedula: {
    type: String,
    required: true,
    unique: true
  },
  direccion: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  distrito: {
    type: String,
    enum: ["sanPedro", "sabanilla", "mercedes", "sanRafael"],
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: ""
  },
  rol: {
    type: String,
    enum: ["vecino", "concejal", "administrador"],
    default: "vecino"
  },
  estadoConcejal: {
    type: String,
    enum: ["ninguno", "pendiente", "aprobado", "rechazado"],
    default: "ninguno"
  },
  verificado: {
    type: Boolean,
    default: false
  },
  codigoVerificacion: {
    type: String 
  },
  creadoEn: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('User', userSchema);