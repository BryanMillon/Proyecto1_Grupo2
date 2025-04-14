const LoginUser = async (pEmail, pPassword) => {

    try {
        // Conexión con el backend usando Axios
        const res = await axios({
            method: "post",
            url: "http://localhost:3000/LoginUser",
            responseType: "json",
            data: {
                email: pEmail,
                password: pPassword,
            }
        });
        
        console.log(res.data.resultado)

        if (res.data.resultado){
        // Registro exitoso
        await Swal.fire({
            title: "Inicio de sesión exitoso",
            text: "Ha iniciado sesión éxitosamente",
            icon: "success"
        });
        setTimeout(() => {
            window.location.href = "../pages/HomePage.html";
        }, 1500);
        }
        
        if (!res.data.resultado){{
            await Swal.fire({
                title: "No se puede iniciar sesión",
                text: "Correo o contraseña invalida",
                icon: "error"
            });
        }
        }
    } catch (error) {
        console.log(error)
        await Swal.fire({
            title: "Error en iniciar sesión",
            text: "Ocurrió un error inesperado",
            icon: "error"
        });
        
    }

};