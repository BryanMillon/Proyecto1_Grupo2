
const express= require("express");
const User= require('../models/user');
const router= express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');


/*Nos traiga todos los usuarios de la base de datos*/
router.get('/users', async(req, res) => {
    /*req: donde viaja la información de la petición*/
     /*res: donde viaja la información de la respuesta*/
 
     try {
        const usuariosRecuperadosDB= await User.find() /*Lista de avisos*/

        res.json({
            lista_usuarios: usuariosRecuperadosDB,
            mensaje: "Usuarios recuperados exitosamente"

        })

     } catch (error) {
        res.json({
            mensaje: "ocurrió un error",
            error
        })
        
     }
});



router.post('/LoginUser', async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
  
      if (!email) {
        return res.json({
          resultado: false,
          message: 'Se debe proporcionar el correo electrónico'
        });
      }
  
      const usuario = await User.findOne({ email });
  
      if (!usuario) {
        return res.json({
          resultado: false,
          message: 'Usuario no encontrado'
        });
      }
  
      const passwordValida = await bcrypt.compare(password, usuario.password);
  
      if (!passwordValida) {
        return res.json({
          resultado: false,
          message: 'Contraseña incorrecta'
        });
      }
  
      // Aquí iniciamos sesión con Passport
      req.login(usuario, function(err) {
        if (err) {
          return res.json({
            resultado: false,
            message: 'Error al iniciar sesión en la sesión',
            error: err
          });
        }
  
        return res.json({
          resultado: true,
          usuario: usuario
        });
      });
  
    } catch (error) {
      res.json({
        resultado: false,
        mensaje: "Ocurrió un error",
        error
      });
    }
  });
  

/*Visible al servidor */
module.exports= router;