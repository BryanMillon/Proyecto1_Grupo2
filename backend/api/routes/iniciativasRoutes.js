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