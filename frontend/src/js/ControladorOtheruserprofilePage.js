document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
  
    if (!userId) {
      alert('No se proporcionó un ID de usuario.');
      return;
    }
  
    try {
      const usuario = await obtenerUsuarioPorId(userId);
  
      // Mostrar en el DOM
      document.getElementById('user-name').textContent = `${capitalizar(usuario.nombre)} ${capitalizar(usuario.apellido1)} ${capitalizar(usuario.apellido2)}`;
      document.getElementById('first-name').textContent = capitalizar(usuario.nombre);
      document.getElementById('last-name').textContent = `${capitalizar(usuario.apellido1)} ${capitalizar(usuario.apellido2)}`;
      document.getElementById('district').textContent = formatearDistrito(usuario.distrito);
      document.getElementById('email').textContent = capitalizar(usuario.email);
      document.getElementById('address').textContent = capitalizar(usuario.direccion);
      document.getElementById('cedula').textContent = usuario.cedula;
      document.getElementById('rol').textContent = capitalizar(usuario.rol);
      document.getElementById('phone').textContent = usuario.telefono;

  
      if (usuario.imageUrl) {
        document.getElementById('profile-pic').src = usuario.imageUrl;
      }
    } catch (error) {
      console.error('Error cargando usuario:', error);
      alert('Error al cargar el perfil del usuario.');
    }
  });
  
  // Helpers
  function capitalizar(texto) {
    if (!texto) return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }
  
  function formatearDistrito(distrito) {
    if (!distrito) return '';
    
    // Insertar espacio entre minúscula y mayúscula (por si viene en camelCase)
    const conEspacios = distrito.replace(/([a-z])([A-Z])/g, '$1 $2');
  
    // Capitalizar la primera letra de cada palabra
    return conEspacios
      .split(' ')
      .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
      .join(' ');
  }