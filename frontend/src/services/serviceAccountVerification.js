function authenticateUser(pEmailOrCedula, pCodigo) {
    try {
        const data = { codigoVerificacion: pCodigo };

     
        if (pEmailOrCedula.includes('@')) {
            data.email = pEmailOrCedula;
        } else {
            data.cedula = pEmailOrCedula;
        }

        return axios({
            method: 'post',
            url: 'http://localhost:3000/accountVerification',
            responseType: 'json',
            data: data
        })
        .then(async (res) => {
            console.log(res);
            await Swal.fire({
                title: 'Verificación exitosa',
                text: 'Tu cuenta ha sido verificada',
                icon: 'success'
            });

            setTimeout(() => {
                window.location.href = '../pages/LoginPage.html';
            }, 1500);

            return { success: true };
        })
        .catch(async (error) => {
            console.log(error);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message;

                if (errorMessage.includes('Usuario no encontrado')) {
                    await Swal.fire({
                        title: 'Verificación fallida',
                        text: 'El correo electrónico o la cédula no están registrados',
                        icon: 'warning'
                    });
                    return { success: false, error: 'usuario_no_encontrado' };
                }
                else if (errorMessage.includes('Código de verificación incorrecto')) {
                    await Swal.fire({
                        title: 'Verificación fallida',
                        text: 'El código es incorrecto',
                        icon: 'warning'
                    });
                    return { success: false, error: 'codigo_incorrecto' };
                }
                else {
                    await Swal.fire({
                        title: 'Verificación fallida',
                        text: errorMessage || 'Error al intentar verificar',
                        icon: 'error'
                    });
                    return { success: false, error: 'error_general' };
                }
            } else {
                await Swal.fire({
                    title: 'Verificación fallida',
                    text: 'Error de conexión con el servidor',
                    icon: 'error'
                });
                return { success: false, error: 'error_conexion' };
            }
        });
    } catch (error) {
        console.log(error);
        return { success: false, error: 'error_inesperado' };
    }
}


function resendVerificationCode(pEmailOrCedula) {
    try {
        const data = {};

      
        if (pEmailOrCedula.includes('@')) {
            data.email = pEmailOrCedula;
        } else {
            data.cedula = pEmailOrCedula;
        }

        return axios({
            method: 'post',
            url: 'http://localhost:3000/resendCode',
            responseType: 'json',
            data: data
        })
        .then(async (res) => {
            console.log(res);
            await Swal.fire({
                title: 'Código reenviado',
                text: 'Revisa tu correo para ver el nuevo código de verificación',
                icon: 'success'
            });
            return { success: true };
        })
        .catch(async (error) => {
            console.log(error);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message;

                if (errorMessage.includes('Usuario no encontrado')) {
                    await Swal.fire({
                        title: 'Reenvío fallido',
                        text: 'No se encontró un usuario con ese correo o cédula',
                        icon: 'warning'
                    });
                    return { success: false, error: 'usuario_no_encontrado' };
                }
                else if (errorMessage.includes('ya está verificado')) {
                    await Swal.fire({
                        title: 'Reenvío no necesario',
                        text: 'Este usuario ya está verificado',
                        icon: 'info'
                    });
                    return { success: false, error: 'usuario_ya_verificado' };
                }
                else {
                    await Swal.fire({
                        title: 'Error',
                        text: errorMessage || 'Ocurrió un error al reenviar el código',
                        icon: 'error'
                    });
                    return { success: false, error: 'error_general' };
                }
            } else {
                await Swal.fire({
                    title: 'Error de conexión',
                    text: 'No se pudo contactar al servidor',
                    icon: 'error'
                });
                return { success: false, error: 'error_conexion' };
            }
        });
    } catch (error) {
        console.log(error);
        return { success: false, error: 'error_inesperado' };
    }
}