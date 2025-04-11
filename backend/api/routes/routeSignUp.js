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
            rol
        } = req.body;

        // Buscar si ya existe un usuario con el correo
        const existsEmail = await user.findOne({ email });

        if (existsEmail) {
            // Si el correo ya está registrado pero no está verificado, permitir el registro
            if (!existsEmail.verificado) {
                return res.status(400).json({ message: 'Este correo ya está registrado pero no ha sido verificado. Por favor, revisa tu correo para completar el registro.' });
            }
            
            // Si el correo ya está registrado y verificado, bloquear el registro
            return res.status(400).json({ message: 'Este correo ya está registrado y verificado.' });
        }

        // Buscar si ya existe un usuario con la cédula (sin verificar el correo)
        const existsCedula = await user.findOne({ cedula });

        if (existsCedula) {
            // Si la cédula ya está registrada y no está verificada, permitir el registro
            if (!existsCedula.verificado) {
                return res.status(400).json({ message: 'Esta cédula ya está registrada pero no ha sido verificada. Por favor, revisa tu correo para completar el registro.' });
            }

            // Si la cédula ya está registrada y verificada, bloquear el registro
            return res.status(400).json({ message: 'Esta cédula ya está registrada y verificada.' });
        }

        // Si el correo y la cédula no están registrados o son verificables, proceder con el registro
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
            rol,
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