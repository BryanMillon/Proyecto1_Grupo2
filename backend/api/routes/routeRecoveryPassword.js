// POST /api/solicitar-cambio-password
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const { enviarCorreoVerificacion, generarCodigoVerificacion } = require('../utils/nodemailer.js');
const bcrypt = require('bcryptjs');

router.post('/request-change-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    const codigo = generarCodigoVerificacion();
    user.codigoVerificacion = codigo;
    await user.save();

    await enviarCorreoVerificacion(email, codigo, 'recuperacion');

    res.json({ msg: 'Código de verificación enviado al correo' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
});


// POST /api/verificar-codigo
router.post('/code-verification', async (req, res) => {
    const { email, codigo } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user || user.codigoVerificacion !== codigo) {
        return res.status(400).json({ msg: 'Código inválido' });
      }
  
      res.json({ msg: 'Código verificado correctamente' }); // Puedes enviar un token temporal aquí si quieres más seguridad
    } catch (err) {
      res.status(500).json({ msg: 'Error del servidor' });
    }
  });

  
// POST /api/cambiar-password
router.post('/change-password', async (req, res) => {
    const { email, codigo, nuevaPassword } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user || user.codigoVerificacion !== codigo) {
        return res.status(400).json({ msg: 'Código inválido' });
      }
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(nuevaPassword, salt);
      user.codigoVerificacion = null; // Limpiar el código
      await user.save();
  
      res.json({ msg: 'Contraseña actualizada exitosamente' });
    } catch (err) {
      res.status(500).json({ msg: 'Error del servidor' });
    }
  });
  
  module.exports = router; 