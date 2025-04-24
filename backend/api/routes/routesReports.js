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



router.get('/busqueda_denuncia_id', async(req, res) => {
    /*req: donde viaja la información de la petición*/
     /*res: donde viaja la información de la respuesta*/

     const userId= req.query.id/*Lista de personas*/

     try {
        const denunciaBuscada= await Report.find({ userId });

        if(!denunciaBuscada){
            return res.json({
                mensaje: "Denuncia no encontrada"
            })
        }

        res.json({
            lista_denuncias: denunciaBuscada,
            mensaje: "Denuncia recuperada exitosamente"

        })

     } catch (error) {
        res.json({
            mensaeje: "ocurrió un error",
            error
        })
        
     }
})







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


// POST
// Ruta para crear un nuevo reporte
router.post('/reports', async (req, res) => {

    const newReport= new Report(req.body);
    console.log(req.body);

        try {
            await newReport.save() /*Graba el aviso en la base de datos*/
            res.json({
                notice: newReport,
                mensaje: "Denuncia creado exitosamente",
                resultado: "true"
            })
        } catch (error) {
            res.json({
                mensaje: "Ocurrio un error",
                error
            })
        }
    })



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