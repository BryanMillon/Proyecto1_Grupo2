export async function solicitarCodigoVerificacion(email) {
    try {
      const response = await fetch("http://localhost:3000/request-change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
      return { success: response.ok, data };
    } catch (error) {
      console.error("Error en solicitud:", error);
      return { success: false, data: { msg: "Error en el servidor" } };
    }
  }
  

  export async function cambiarPassword(email, codigo, nuevaPassword) {
    try {
      const response = await axios.post('http://localhost:3000/change-password', {
        email,
        codigo,
        nuevaPassword
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.msg || 'Ocurrió un error al cambiar la contraseña';
    }
  }