function loginWithGoogle() {
    try {
        // Redirige al usuario a la ruta de autenticación de Google en el backend
        window.location.href = 'http://localhost:3000/auth/google/callback';
    } catch (error) {
        console.log(error);
        return { success: false, error: 'error_inesperado' };
    }
}

function checkAuthStatus() {
    try {
      console.log("Verificando estado de autenticación...");
      return axios({
        method: 'get',
        url: 'http://localhost:3000/auth/status',
        responseType: 'json',
        withCredentials: true
      })
      .then((res) => {
        console.log("Respuesta recibida:", res);
        
        if (res.data.authenticated) {
          console.log("Usuario autenticado");
          
          // Guardar usuario en localStorage si no existe
          if (!localStorage.getItem('user')) {
            localStorage.setItem('user', JSON.stringify(res.data.user));
          }
          
          return {
            success: true,
            authenticated: true,
            user: res.data.user
          };
        } else {
          console.log("Usuario no autenticado");
          return {
            success: true,
            authenticated: false
          };
        }
      })
      .catch((error) => {
        console.error("Error al verificar autenticación:", error);
        return { success: false, error: 'error_auth_status', message: error.message };
      });
    } catch (error) {
      console.error("Error inesperado:", error);
      return { success: false, error: 'error_inesperado' };
    }
  }

function logoutUser() {
    try {
        return axios({
            method: 'get',
            url: 'http://localhost:3000/auth/logout',
            responseType: 'json',
            withCredentials: true
        })
        .then(async (res) => {
            console.log(res);
            await Swal.fire({
                title: 'Sesión cerrada',
                text: 'Has cerrado sesión correctamente',
                icon: 'success'
            });

            setTimeout(() => {
                window.location.href = '../pages/LoginPage.html';
            }, 1500);

            return { success: true };
        })
        .catch(async (error) => {
            console.log(error);
            await Swal.fire({
                title: 'Error',
                text: 'No se pudo cerrar la sesión',
                icon: 'error'
            });
            return { success: false, error: 'error_logout' };
        });
    } catch (error) {
        console.log(error);
        return { success: false, error: 'error_inesperado' };
    }
}
