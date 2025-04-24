const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user')

// Configuración de la estrategia de Google
module.exports = function() {
  // Serialización del usuario para la sesión
  passport.serializeUser((user, done) => {
    done(null, user.id); // Aquí se guarda el id del usuario en la sesión
  });

  // Deserialización del usuario desde la sesión
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id); // Aquí se recupera el usuario desde la base de datos
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  // Configurar estrategia de Google
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ['profile', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const existingUser = await User.findOne({ email });
        
        if (!existingUser) {
          return done(null, false, { message: 'El correo electrónico no está registrado en el sistema' });
        }

        return done(null, existingUser); // El usuario existe, se pasa a la siguiente parte de la autenticación
      } catch (err) {
        return done(err, null);
      }
    }
  ));
};
