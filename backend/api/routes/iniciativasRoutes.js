const express = require('express');
const router = express.Router();
const Iniciativa = require('../models/iniciativasModel');

// Crear una iniciativa

// POST

router.post('/crearIniciativa', async (req, res) => {

    const newIniciatiate= new Iniciativa(req.body);

    console.log(req.body);

        try {
            await newIniciatiate.save() /*Graba el aviso en la base de datos*/
            res.json({
                iniciative: newIniciatiate,
                mensaje: "Iniciativa creado exitosamente",
                resultado: "true"
            })
        } catch (error) {
            res.json({
                mensaje: "Ocurrio un error",
                error
            })
        }
    });


// Ver todas las iniciativas
router.get('/iniciativas', async (req, res) => {
     try {
        const iniciativas= await Iniciativa.find() /*Lista de avisos*/

        res.json({
            lista_iniciativas: iniciativas,
            mensaje: "Iniciativas recuperados exitosamente"

        })

     } catch (error) {
        res.json({
            mensaje: "ocurrió un error",
            error
        })
        
     }
  
});

router.get('/IniciativasPublicadas', async(req, res) => {
     try {
        const iniciativasRecuparadaoDB= await Iniciativa.find({ estado: 'aprobada' }) /*Lista de iniciativas*/

        res.json({
            lista_iniciativas: iniciativasRecuparadaoDB,
            mensaje: "Avisos recuperados exitosamente"

        })

     } catch (error) {
        res.json({
            mensaje: "ocurrió un error",
            error
        })
        
     }
})


router.get('/IniciativasPendientes', async(req, res) => {
    try {
       const iniciativasRecuparadaoDB= await Iniciativa.find({ estado: 'pendiente' }) /*Lista de iniciativas*/

       res.json({
           lista_iniciativas: iniciativasRecuparadaoDB,
           mensaje: "Avisos recuperados exitosamente"

       })

    } catch (error) {
       res.json({
           mensaje: "ocurrió un error",
           error
       })
       
    }
})


router.put('/iniciativeUpdateStatus', async (req, res) => {
    const id_iniciativa = req.query.id;

    try {
        const iniciativeUpdated = await Iniciativa.findByIdAndUpdate(id_iniciativa, req.body, { new: true });
        if (!iniciativeUpdated) {
            return res.json({
                mensaje: "La iniciativa no existe"
            });
        }

        res.json({
            report: iniciativeUpdated,
            mensaje: "Estado de la iniciativa actualizado exitosamente"
        });
    } catch (error) {
        res.json({
            mensaje: "Ocurrió un error",
            error
        });
    }
});







module.exports = router;