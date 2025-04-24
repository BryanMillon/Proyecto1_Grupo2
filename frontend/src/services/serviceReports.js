// Función para registrar denuncias
const crear_denuncia = async(pNombre, pFechaHora, pCategoria, pLugar, pDescripcion, pEstado, pUserId) => {
    try {
        // Librería para conectar el frontend con el backend
        const res = await axios({
            method: "post",
            url: "http://localhost:3000/reports",  // Ruta para las denuncias
            responseType: "json",
            data: {
                nombre: pNombre,
                fechayhora: pFechaHora,
                categoria: pCategoria,
                lugar: pLugar,
                descripcion: pDescripcion,
                estado: pEstado,
                userId: pUserId
            }
        });

        console.log(res)

        if (res.data.resultado == false) {
            if (res.data.error.code == 11000) {
                Swal.fire({
                    title: "No se completó el registro",
                    text: "La denuncia ya está registrada",
                    icon: "warning"
                });
            }
        } else {
            Swal.fire({
                title: "Denuncia registrada exitosamente",
                text: "La denuncia se registró exitosamente",
                icon: "success"
            });
            
            //setTimeout(() => {
                //window.location.href = "ReportsPage.html";  // Redirige a la página de denuncias
            //}, 1500);
        }

    } catch (error) {
        console.log(error);
        Swal.fire({
            title: "No se completó el registro",
            text: "Error en el registro",
            icon: "error"
        });
    }
}

// Función para listar todas las denuncias en la base de datos
const listar_denuncias_BD = async() => {
    let lista_denuncias = [];

    try {
        // Librería para conectar el frontend con el backend
        const res = await axios({
            method: "get",
            url: "http://localhost:3000/reports",  // Ruta para listar todas las denuncias
            responseType: "json"
        });

        lista_denuncias = res.data.lista_denuncias;
        console.log(lista_denuncias);
        
    } catch (error) {
        console.log(error);
        Swal.fire({
            title: "Error",
            text: "Error al listar denuncias",
            icon: "error"
        });
    }

    return lista_denuncias;
}


const listar_denuncias_BD_Users = async(Id_User) => {
    let lista_denuncias = [];

    try {
        // Librería para conectar el frontend con el backend
        const res = await axios({
            method: "get",
            url: "http://localhost:3000/busqueda_denuncia_id",  // Ruta para listar todas las denuncias
            params:{id:Id_User},
            responseType: "json"
        });

        lista_denuncias = res.data.lista_denuncias;
        console.log(lista_denuncias);
        
    } catch (error) {
        console.log(error);
        Swal.fire({
            title: "Error",
            text: "Error al listar denuncias",
            icon: "error"
        });
    }

    return lista_denuncias;
}





// Función para listar las denuncias pendientes en la base de datos
const listar_denuncias_pending_BD = async() => {
    let lista_denuncias = [];

    try {
        // Librería para conectar el frontend con el backend
        const res = await axios({
            method: "get",
            url: "http://localhost:3000/reportsPending",  // Ruta para las denuncias pendientes
            responseType: "json"
        });

        lista_denuncias = res.data.lista_denuncias;
    } catch (error) {
        console.log(error);
        Swal.fire({
            title: "Error",
            text: "Error al listar denuncias pendientes",
            icon: "error"
        });
    }

    return lista_denuncias;
}

// Función para listar las próximas denuncias
const listar_proximas_denuncias_BD = async() => {
    let lista_denuncias = [];

    try {
        // Librería para conectar el frontend con el backend
        const res = await axios({
            method: "get",
            url: "http://localhost:3000/Nextreports",  // Ruta para las próximas denuncias
            responseType: "json"
        });

        lista_denuncias = res.data.lista_denuncias;
    } catch (error) {
        console.log(error);
        Swal.fire({
            title: "Error",
            text: "Error al listar próximas denuncias",
            icon: "error"
        });
    }

    return lista_denuncias;
}

// Función para actualizar el estado de una denuncia
const actualizarEstadoDenuncia = async(p_id, pNombre, pFechaHora, pCategoria, pLugar, pDescripcion, pEstado) => {
    try {
        const res = await axios({
            method: 'put',
            url: 'http://localhost:3000/reportsUpdateStatus',  // Ruta para actualizar el estado de las denuncias
            params: { id: p_id },
            data: {
                nombre: pNombre,
                fechayhora: pFechaHora,
                categoria: pCategoria,
                lugar: pLugar,
                descripcion: pDescripcion,
                estado: pEstado
            },
            responseType: 'json'
        });
    } catch (error) {
        console.log(error);
        Swal.fire({
            title: "Error",
            text: "Error al actualizar el estado de la denuncia",
            icon: "error"
        });
    }
}
