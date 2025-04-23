const express= require("express");
const User= require('../models/user');
const router= express.Router();


  router.get('/concejalesPendientes', async(req, res) => {
      /*req: donde viaja la información de la petición*/
       /*res: donde viaja la información de la respuesta*/
   
  
       try {
          const concejalesRecuparadaoDB= await User.find({estadoConcejal: 'pendiente', rol: 'concejal'  }) /*Lista de avisos*/
  
          res.json({
            lista_usuarios: concejalesRecuparadaoDB,
              mensaje: "Usuarios recuperados exitosamente"
  
          })
  
       } catch (error) {
          res.json({
              mensaje: "ocurrió un error",
              error
          })
          
       }
  })


  

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


router.put('/user/usersUpdateStatus',async(req,res)=>{
    //proporcionar un parametro de busqueda
    const id_user= req.query.id;

    try {

        const usuarioPublicado = await User.findByIdAndUpdate(id_user, req.body, { new: true });
        if(!usuarioPublicado){
            return res.json({
                mensaje:"El usuario no existe"
            })
        }

        res.json({
            usuario:usuarioPublicado,
            mensaje:"Estado actualizado exitosamente"
        })
        
    } catch (error) {
        res.json({
            mensaje:"Ocurrio un error",
            error
        })
    }
  })

module.exports= router;
