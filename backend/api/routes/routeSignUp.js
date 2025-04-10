const express = require('express');
require('dotenv').config();
const user = require('../models/signUp'); 
const bcrypt = require('bcryptjs');
const { enviarCorreoVerificacion, generarCodigoVerificacion } = require('../utils/nodemailer');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const {
            nombre,
            apellido1,
            apellido2,
            cedula,
            direccion,
            telefono,
            distrito,
            imageUrl,
            email,
            password,
            userType: rol
        } = req.body;

        const exists = await user.findOne({ $or: [{ email }, { cedula }] });
        if (exists) {
            return res.status(400).json({ message: 'El usuario ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new user({
            nombre,
            apellido1,
            apellido2,
            cedula,
            direccion,
            telefono,
            distrito,
            email,
            password: hashedPassword,
            imageUrl,
            userType: rol,
            estadoConcejal: rol === 'concejal' ? 'pendiente' : 'ninguno',
            verificado: false,
            codigoVerificacion: generarCodigoVerificacion()
        });

        await newUser.save();

        await enviarCorreoVerificacion(email, newUser.codigoVerificacion);

        res.status(201).json({ message: 'Usuario registrado correctamente. Revisa tu correo para verificar tu cuenta.' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error del servidor al registrar' });
    }
});

module.exports = router;