const express = require('express');
const router = express.Router();
const Usuario = require('./usuariosModel');

// Obtener perfil por ID
router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).send({ mensaje: 'Usuario no encontrado' });
    res.send(usuario);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Actualizar perfil
router.put('/:id', async (req, res) => {
  try {
    const actualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(actualizado);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;