const registerUser = async (pNombre, pApellido1, pApellido2, pCedula, pUserType, pDistrito, pDireccion, pTelefono, pEmail, pPassword, pImagenURL) => {
    try {
        // Conexión con el backend usando Axios
        const res = await axios({
            method: "post",
            url: "http://localhost:3000/register",
            responseType: "json",
            data: {
                nombre: pNombre,
                apellido1: pApellido1,
                apellido2: pApellido2,
                cedula: pCedula,
                rol: pUserType,
                distrito: pDistrito,
                direccion: pDireccion,
                telefono: pTelefono,
                email: pEmail,
                password: pPassword,
                imageUrl: pImagenURL 
            }
        });
        
        console.log(res);
        
        // Registro exitoso
        await Swal.fire({
            title: "Registro exitoso",
            text: "Te hemos enviado un correo de verificación",
            icon: "success"
        });
        
       
        setTimeout(() => {
            window.location.href = "../pages/AccountVerificationPage.html";
        }, 1500);
        
        return { success: true };
        
    } catch (error) {
        console.log(error);
        
      
        if (error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            
            if (errorMessage.includes("Cédula ya está registrado")) {
                await Swal.fire({
                    title: "No se completó el registro",
                    text: "La cédula ya está registrada",
                    icon: "warning"
                });
                return { success: false, error: 'cedula_duplicada' };
            } 
            else if (errorMessage.includes("Correo electrónico ya está registrado")) {
                await Swal.fire({
                    title: "No se completó el registro",
                    text: "El correo electrónico ya está registrado",
                    icon: "warning"
                });
                return { success: false, error: 'email_duplicado' };
            } 
            else {
                await Swal.fire({
                    title: "No se completó el registro",
                    text: errorMessage || "Error en el registro",
                    icon: "error"
                });
                return { success: false, error: 'error_general' };
            }
        } else {
            await Swal.fire({
                title: "No se completó el registro",
                text: "Error de conexión con el servidor",
                icon: "error"
            });
            return { success: false, error: 'error_conexion' };
        }
    }
};