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
                userType: pUserType,
                distrito: pDistrito,
                direccion: pDireccion,
                telefono: pTelefono,
                email: pEmail,
                password: pPassword, 
                imageUrl: pImagenURL 
            }
        });

        console.log(res);

      
        if (res.data.resultado === false) {
            if (res.data.error.code === 11000) { 
                Swal.fire({
                    title: "No se completó el registro",
                    text: "La cédula ya está registrada",
                    icon: "warning"
                });
            }
           
            else if (res.data.error.code === 11001) { 
                Swal.fire({
                    title: "No se completó el registro",
                    text: "El correo electrónico ya está registrado",
                    icon: "warning"
                });
            }
        } else {
            Swal.fire({
                title: "Registro exitoso",
                text: "El usuario se registró exitosamente",
                icon: "success"
            });

            setTimeout(() => {
                window.location.href = "../pages/AccountVerificationPage.html"; 
            }, 1500);
        }
    } catch (error) {
        console.log(error);
        Swal.fire({
            title: "No se completó el registro",
            text: "Error en el registro",
            icon: "error"
        });
    }
};
