const API_URL = 'http://localhost:3000';

// Obtener un usuario por su ID
const obtenerUsuarioPorId = async (usuarioId) => {
   
  try {
    const res = await axios({
      method: 'get',
      url: `${API_URL}/user/${usuarioId}`,
      responseType: 'json'
    });
    return res.data;
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    throw error;
  }
};

// Actualizar información de un usuario
const actualizarUsuario = async (usuarioId, datosActualizados) => {
  try {
    const res = await axios({
      method: 'put',
      url: `${API_URL}/user/${usuarioId}`,
      data: datosActualizados,
      responseType: 'json'
    });
    return res.data;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }
};

// Obtener todos los usuarios
const obtenerTodosUsuarios = async () => {
  try {
    const res = await axios({
      method: 'get',
      url: `${API_URL}/users`,
      responseType: 'json'
    });
    return res.data;
  } catch (error) {
    console.error('Error al obtener todos los usuarios:', error);
    throw error;
  }
};

// Subir imagen a Cloudinary y actualizar el perfil del usuario
const subirImagenPerfil = async (usuarioId, archivo) => {
  try {
    // Primero subimos la imagen a Cloudinary
    const imagenUrl = await subirImagenCloudinary(archivo);
    
    // Luego actualizamos el perfil del usuario con la URL de la imagen
    const res = await axios({
      method: 'put',
      url: `${API_URL}/user/${usuarioId}`,
      data: {
        imageUrl: imagenUrl
      },
      responseType: 'json'
    });
    
    return res.data;
  } catch (error) {
    console.error('Error al subir imagen de perfil:', error);
    throw error;
  }
};

// Subir imagen a Cloudinary
const subirImagenCloudinary = async (archivo) => {
    try {
      // Crear un objeto FormData para enviar el archivo
      const formData = new FormData();
      formData.append('file', archivo);
      formData.append('upload_preset', 'municipalidad_preset'); // Tu preset de Cloudinary
      
      // Realizar la petición a Cloudinary
      const res = await axios({
        method: 'post',
        url: 'https://api.cloudinary.com/v1_1/tu-cloud-name/image/upload', // Reemplaza con tu cloud_name
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Retornar la URL de la imagen subida
      return res.data.secure_url;
    } catch (error) {
      console.error('Error al subir imagen a Cloudinary:', error);
      await Swal.fire({
        title: "Error",
        text: "No se pudo subir la imagen",
        icon: "error"
      });
      throw error;
    }
  };
  
  // Subir imagen desde una URL base64
  async function subirImagenBase64Cloudinary(base64Image) {
    const cloudName = "dvye3vyj4"; 
    const uploadPreset = "proyecto1Grupo2";
  
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  
    const formData = new FormData();
    formData.append("file", base64Image);
    formData.append("upload_preset", uploadPreset);
  
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
  
      if (!data.secure_url) {
        throw new Error("No se recibió URL segura desde Cloudinary");
      }
  
      return data.secure_url;
    } catch (error) {
      console.error("Error al subir imagen a Cloudinary:", error);
      throw error;
    }
  }