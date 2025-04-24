const obtenerUsuarios = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/users'); 
      if (!respuesta.ok) {
        throw new Error('Error al obtener los usuarios');
      }
      const datos = await respuesta.json();
      return datos.lista_usuarios; 
    } catch (error) {
      console.error('Error en el servicio obtenerUsuarios:', error);
      return [];
    }
  };