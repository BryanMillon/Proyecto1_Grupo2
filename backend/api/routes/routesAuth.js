const express = require('express');
const passport = require('passport');
const router = express.Router();

// Ruta para iniciar el proceso de autenticación con Google
// Callback de Google después de la autenticación
// Callback de Google después de la autenticación
router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) return next(err);
      
    if (!user) {
      return res.status(401).json({ error: info?.message || 'Autenticación fallida con Google' });
    }
      
    req.logIn(user, (err) => {
      if (err) return next(err);
      
      // Excluir campos sensibles
      const { password, codigoVerificacion, codigoRecuperacion, ...usuarioLogueado } = user.toObject();
      
      // Enviar directamente los datos al frontend en forma de JSON
      const userData = JSON.stringify(usuarioLogueado);
      
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Procesando...</title>
        </head>
        <body>
          <h2>Autenticación exitosa</h2>
          <p>Guardando información...</p>
          
          <script>
            // Datos del usuario como variable JavaScript
            const userData = ${userData};
            
            // Guardar en localStorage
            localStorage.removeItem('usuario');
            localStorage.setItem('usuario', JSON.stringify(userData));
            
            console.log('Datos del usuario guardados:', userData);
            
            // Redirigir al HomePage
            setTimeout(() => {
              window.location.href = 'http://127.0.0.1:5501/frontend/src/pages/HomePage.html';
            }, 1000);
          </script>
        </body>
        </html>
      `);
    });
  })(req, res, next);
});

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.json({ message: 'Sesión cerrada correctamente' });
  });
});

router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    // Excluir campos sensibles
    const { password, codigoVerificacion, codigoRecuperacion, ...usuarioLogueado } = req.user.toObject();
    
    return res.json({
      authenticated: true,
      user: usuarioLogueado
    });
  } else {
    return res.json({ authenticated: false });
  }
});

router.get('/validate-token/:token', async (req, res) => {
  try {
    const token = req.params.token;
    
    if (!global.authTokens || !global.authTokens[token]) {
      return res.status(401).json({ success: false, message: 'Token inválido o expirado' });
    }
    
    // Obtener el ID de usuario del token
    const userId = global.authTokens[token];
    
    // Buscar el usuario en la base de datos
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    
    // Eliminar el token (uso único)
    delete global.authTokens[token];
    
    // Excluir campos sensibles
    const { password, codigoVerificacion, codigoRecuperacion, ...usuarioLogueado } = user.toObject();
    
    return res.json({
      success: true,
      user: usuarioLogueado
    });
  } catch (error) {
    console.error('Error al validar token:', error);
    return res.status(500).json({ success: false, message: 'Error del servidor' });
  }
});

module.exports = { router };
