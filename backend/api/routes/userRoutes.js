const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Ruta para ver perfil público de otro usuario 
router.get('/publico/:id', async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id).select(
      'nombre apellido1 apellido2 distrito rol imageUrl'
    );

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener perfil público:', error);
    res.status(500).json({ mensaje: 'Error del servidor', error });
  }
});

//listar todos los usuarios públicos
router.get('/publicos', async (req, res) => {
  try {
    const usuarios = await User.find().select('nombre apellido1 apellido2 distrito rol imageUrl');
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error });
  }
});

module.exports = router;