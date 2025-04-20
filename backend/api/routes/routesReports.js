const express = require("express");
const Report = require('../models/reports');
const router = express.Router();
const User = require('../models/user');

// GET

// http://localhost:3000/reports
/* Nos trae todas las denuncias de la base de datos */
router.get('/reports', async (req, res) => {
    try {
        const reports = await Report.find(); // Lista de denuncias
        res.json({
            lista_denuncias: reports,
            mensaje: "Denuncias recuperadas exitosamente"
        });
    } catch (error) {
        res.json({
            mensaje: "Ocurrió un error",
            error
        });
    }
});

/* Nos trae todas las denuncias en estado pendiente */
router.get('/reportsPending', async (req, res) => {
    try {
        const reports = await Report.find({ estado: 'pendiente' }); // Lista de denuncias pendientes
        res.json({
            lista_denuncias: reports,
            mensaje: "Denuncias recuperadas exitosamente"
        });
    } catch (error) {
        res.json({
            mensaje: "Ocurrió un error",
            error
        });
    }
});

/* Nos trae todas las denuncias en estado publicado */
router.get('/NextReports', async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Obtener la fecha de hoy sin la hora

    try {
        const reports = await Report.find({ estado: 'publicado', fechayhora: { $gte: today } }); // Lista de denuncias publicadas
        res.json({
            lista_denuncias: reports,
            mensaje: "Denuncias recuperadas exitosamente"
        });
    } catch (error) {
        res.json({
            mensaje: "Ocurrió un error",
            error
        });
    }
});

// POST
// Ruta para crear un nuevo reporte
router.post('/reports', async (req, res) => {
    try {
        const { userId, categoria, lugar, descripcion } = req.body;

        // Buscar al usuario por ID
        const usuario = await User.findById(userId);

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado",
                resultado: "false"
            });
        }

        // Armar nombre completo
        const nombreCompleto = `${usuario.nombre} ${usuario.apellido1} ${usuario.apellido2}`;

        // Crear nuevo reporte
        const newReport = new Report({
            nombre: nombreCompleto,
            fechayhora: new Date(),
            categoria,
            lugar,
            descripcion,
            estado: "pendiente"
        });

        await newReport.save();

        res.status(201).json({
            report: newReport,
            mensaje: "Reporte creado exitosamente",
            resultado: "true"
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Ocurrió un error al crear el reporte",
            error: error.message
        });
    }
});

// DELETE
// http://localhost:3000/reports
router.delete('/reports', async (req, res) => {
    const id = req.query.id;

    try {
        const reportDeleted = await Report.findByIdAndDelete(id);

        if (!reportDeleted) {
            return res.json({
                mensaje: "La denuncia no existe"
            });
        }

        res.json({
            report: reportDeleted,
            mensaje: "Denuncia eliminada exitosamente"
        });
    } catch (error) {
        res.json({
            mensaje: "Ocurrió un error",
            error
        });
    }
});

// PUT

// ACTUALIZAR EL ESTADO

router.put('/reportsUpdateStatus', async (req, res) => {
    const id_report = req.query.id;

    try {
        const reportUpdated = await Report.findByIdAndUpdate(id_report, req.body, { new: true });
        if (!reportUpdated) {
            return res.json({
                mensaje: "La denuncia no existe"
            });
        }

        res.json({
            report: reportUpdated,
            mensaje: "Estado de la denuncia actualizado exitosamente"
        });
    } catch (error) {
        res.json({
            mensaje: "Ocurrió un error",
            error
        });
    }
});

/* Visible al servidor */
module.exports = router;