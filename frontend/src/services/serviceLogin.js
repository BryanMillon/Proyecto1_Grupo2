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
        

        if (res.data.resultado){
        localStorage.setItem("id_mongo", res.data.usuario._id)

        localStorage.setItem("rolLogIn", res.data.usuario.rol)
   

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



const listar_usuarios_pending_BD= async()=>{

    let lista_usuarios = []
    
    try {
        //Libreria para conectar el fronend del backend
        const res= await axios({
            method: "get",
            url: "http://localhost:3000/concejalesPendientes",
            responseType: "json"
        })

        lista_usuarios = res.data.lista_usuarios;
    }

    catch (error) {
            console.log(error)
            Swal.fire({
                title: "Error",
                text: "Error al listar usuarios",
                icon: "error"
            });
            
        }

    return lista_usuarios

    }


const actualizarEstadoUsuario= async(p_id,pestadoConcejal)=>{

    try {
        const res = await axios({
            method:'put',
            url:'http://localhost:3000/user/usersUpdateStatus',
            params:{id:p_id},
            data:{
                estadoConcejal:pestadoConcejal
            },
            responseType:'json'
        })
    }

    catch (error) {
            console.log(error)
            Swal.fire({
                title: "Error",
                text: "Error al listar usuarios",
                icon: "error"
            });
            
        }


    }
