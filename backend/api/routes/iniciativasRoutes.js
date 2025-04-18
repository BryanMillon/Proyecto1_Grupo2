const express = require('express');
const router = express.Router();
const Iniciativa = require('./iniciativasModel');

// Crear una iniciativa
router.post('/', async (req, res) => {
  try {
    const nueva = new Iniciativa(req.body);
    await nueva.save();
    res.status(201).send(nueva);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Ver todas las iniciativas
router.get('/', async (req, res) => {
  const iniciativas = await Iniciativa.find();
  res.send(iniciativas);
});

// Aprobar/rechazar iniciativa
router.put('/:id', async (req, res) => {
  const { estado } = req.body;
  if (!['aprobada', 'rechazada'].includes(estado)) {
    return res.status(400).send({ mensaje: 'Estado inválido' });
  }

  try {
    const actualizada = await Iniciativa.findByIdAndUpdate(req.params.id, { estado }, { new: true });
    res.send(actualizada);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;