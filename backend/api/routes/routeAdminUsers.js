const express= require("express");
const User= require('../models/user');
const router= express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const adminRoutes = require('../routes/AdminUsers'); 


// Obtener solicitudes pendientes de concejales
router.get('/concejalesPendientes', async (req, res) => {
    try {
      const concejalesPendientes = await User.find({ rol: 'concejal', estadoConcejal: 'pendiente' });
      res.json(concejalesPendientes);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener solicitudes', error: err });
    }
  });


  

// Aprobar concejal
router.put('/concejalesPendientes/:id/aprobar', async (req, res) => {
    try {
      const usuario = await User.findById(req.params.id);
      if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
      // Solo si es concejal en estado pendiente
      if (usuario.rol !== 'concejal' || usuario.estadoConcejal !== 'pendiente') {
        return res.status(400).json({ message: 'El usuario no está pendiente' });
      }
      usuario.estadoConcejal = 'aprobado';
      await usuario.save();
      res.json({ message: 'Concejal aprobado' });
    } catch (err) {
      res.status(500).json({ message: 'Error al aprobar', error: err });
    }
  });
  
  // Rechazar concejal
  router.put('/concejalesPendientes/:id/rechazar', async (req, res) => {
    try {
      const usuario = await User.findById(req.params.id);
      if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
      if (usuario.rol !== 'concejal' || usuario.estadoConcejal !== 'pendiente') {
        return res.status(400).json({ message: 'El usuario no está pendiente' });
      }
      usuario.estadoConcejal = 'rechazado';
      await usuario.save();
      res.json({ message: 'Concejal rechazado' });
    } catch (err) {
      res.status(500).json({ message: 'Error al rechazar', error: err });
    }
  });
  

  module.exports = router;
