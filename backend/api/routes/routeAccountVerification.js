const express = require('express');
require('dotenv').config();
const user = require('../models/signUp'); 
const router = express.Router();

router.post('/accountVerification', async (req, res) => {
    const { email, codigoVerificacion } = req.body;

    try {
        const usuario = await user.findOne({ email });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (usuario.verificado) {
            return res.status(400).json({ message: 'El usuario ya está verificado' });
        }

        if (usuario.codigoVerificacion !== codigoVerificacion) {
            return res.status(400).json({ message: 'Código de verificación incorrecto' });
        }

        usuario.verificado = true;
        usuario.codigoVerificacion = null; 
        await usuario.save();

        res.status(200).json({ message: 'Correo verificado con éxito' });

    } catch (error) {
        console.error('Error al verificar código:', error);
        res.status(500).json({ message: 'Error al verificar código', error });
    }
});

module.exports = router;