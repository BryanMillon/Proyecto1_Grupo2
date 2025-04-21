//Referencias al DM

///////////////////////////////////////
////Tabla administracion de Eventos////
///////////////////////////////////////

const cuerpoTablaAvisos = document.querySelector("#tableEventPending tbody")

let listaAvisos= []


function crearBotones(fila,i){
    //para la columna de acciones
    //definir la celda en donde van a ir los botones
    let celda_btn_publicar = fila.insertCell()

    //crear un boton en la celda
    let boton_publicar = document.createElement('button')
    let boton_cancelar = document.createElement('button')

    //estilos del boton editar
    boton_publicar.innerText = "Publicar"

    //asignar clase CSS al boton publicar
    boton_publicar.classList.add('btnAccept');


    //estilos del boton Cancelar
    boton_cancelar.innerText = "Cancelar"

    //asignar clase CSS al boton publicar
    boton_cancelar.classList.add('btnDeny');


    //vamos a definir a quien le pertenecen los botones
    celda_btn_publicar.appendChild(boton_publicar)
    celda_btn_publicar.appendChild(boton_cancelar)

    //agregar eventos a los botones
    boton_publicar.addEventListener("click",()=>{
        localStorage.setItem("id_mongo",listaAvisos[i]["_id"])
        let id = localStorage.getItem("id_mongo")

        console.log(listaAvisos[i]['nombre'])

        actualizarEstado(
            id
            ,listaAvisos[i]['nombre']
            ,listaAvisos[i]['fechayhora']
            ,listaAvisos[i]['categoria']
            ,listaAvisos[i]['lugar']
            ,listaAvisos[i]['descripcion']
            ,'publicado'
        )
        chargeTable()
    })

    boton_cancelar.addEventListener("click",()=>{
        localStorage.setItem("id_mongo",listaAvisos[i]["_id"])
        let id = localStorage.getItem("id_mongo")

        console.log(listaAvisos[i]['nombre'])

        actualizarEstado(
            id
            ,listaAvisos[i]['nombre']
            ,listaAvisos[i]['fechayhora']
            ,listaAvisos[i]['categoria']
            ,listaAvisos[i]['lugar']
            ,listaAvisos[i]['descripcion']
            ,'cancelado'
        )
        chargeTable()
    })
}


const chargeTable=async()=>{
    //Bring the table that was created in the html with its respective columns
    listaAvisos =  await listar_avisos_pending_BD();
    //limpiar la tabla
    
    cuerpoTablaAvisos.innerHTML=""

     for(let i=0;i<listaAvisos.length;i++){
            
        let fila = cuerpoTablaAvisos.insertRow()

        fila.insertCell().innerHTML=listaAvisos[i]['nombre']
        fila.insertCell().innerHTML=listaAvisos[i]['fechayhora']
        fila.insertCell().innerHTML=listaAvisos[i]['categoria']
        fila.insertCell().innerHTML=listaAvisos[i]['lugar']
        fila.insertCell().innerHTML=listaAvisos[i]['descripcion']

        crearBotones(fila,i)
    }

}


document.addEventListener("DOMContentLoaded", chargeTable);


/*Button functions*/
//Cancel
function actionBottonCancel(){
    Swal.fire({
        title: "Evento No Publicado",
        text: "Este evento ha sido cancelado y no se ha publicado.",
        icon: "error"
    });
}



///////////////////////////////////////////////////
////Tabla Administracion de UsuariosConcejales////
/////////////////////////////////////////////////

/*Button functions tabla Usuarios*/
/*document.addEventListener("DOMContentLoaded", function() {
    chargeTable(); // Cargar la tabla de eventos

    // Seleccionar todos los botones de aceptar y denegar en la tabla de usuarios
    const botonesAceptar = document.querySelectorAll(".btnAccept");
    const botonesDenegar = document.querySelectorAll(".btnDeny");

    // Asignar aceptar y luego denegar
    botonesAceptar.forEach(boton => {
        boton.addEventListener("click", actionBottonAccept);
    });


    botonesDenegar.forEach(boton => {
        boton.addEventListener("click", actionBottonDenegar);
    });
});

function actionBottonAccept(){
    Swal.fire({
        title: "Aceptado Exitosamente",
        text: "Acción aceptada", // cambiar luego para el mensaje para cada tabla
        icon: "success"
     });
    }

//Cancel
function actionBottonDenegar(){
    Swal.fire({
        title: "Denegado Exitosamente",
        text: "Acción Denegada", // cambiar luego para el mensaje para cada tabla
        icon: "error"
    });
}*/


document.addEventListener("DOMContentLoaded", () => {
    chargeTable();
    cargarSolicitudesConcejales();
});

// Función para cargar los concejales pendientes en la tabla
async function cargarSolicitudesConcejales() {
    try {
        const res = await axios.get('/api/concejales/pendientes') //en esta linea traigo la peticion de front al backend 
        const usuarios = res.data;
        const tbody = document.querySelector('#tableUserPending tbody');
        tbody.innerHTML = ''; // Limpia la tabla antes de llenarla

        usuarios.forEach(usuario => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido1}</td>
                <td>${usuario.apellido2}</td>
                <td>${usuario.email}</td>
                <td>${usuario.rol}</td>
                <td>
                    <button class="btnAccept" data-id="${usuario._id}">Aceptar</button>
                    <button class="btnDeny" data-id="${usuario._id}">Denegar</button>
                </td>
            `;
            tbody.appendChild(fila);
        });

        // Asignar evento para aceptar
        document.querySelectorAll('.btnAccept').forEach(btn => {
            btn.onclick = () => {
                const id = btn.getAttribute('data-id');
                aceptarConcejal(id);
            };
        });

        // Asignar evento para rechazar
        document.querySelectorAll('.btnDeny').forEach(btn => {
            btn.onclick = () => {
                const id = btn.getAttribute('data-id');
                rechazarConcejal(id);
            };
        });
    } catch (err) {
        console.error('Error cargando solicitudes:', err);
    }
}

// Función para aceptar un concejal
function aceptarConcejal(id) {
    axios.put(`/api/concejales/${id}/aprobar`)
        .then(() => {
            Swal.fire('Concejal aceptado con éxito', '', 'success');
            cargarSolicitudesConcejales(); // recarga la tabla
        })
        .catch(() => {
            Swal.fire('No se pudo aprobar la solicitud', 'error');
        });
}

// Función para rechazar un concejal
function rechazarConcejal(id) {
    axios.put(`/api/concejales/${id}/rechazar`)
        .then(() => {
            Swal.fire('Concejal rechazado con éxito', '', 'success');
            cargarSolicitudesConcejales(); // recarga la tabla
        })
        .catch(() => {
            Swal.fire('Error', 'No se pudo rechazar', 'error');
        });
}
  

////////////////////////////////////////
////Tabla Administracion de Noticias////
////////////////////////////////////////

const cuerpoTablaNoticias = document.querySelector("#tableNewPending tbody")

let listaNoticias= []


function crearBotones(fila,i){
    //para la columna de acciones
    //definir la celda en donde van a ir los botones
    let celda_btn_publicar = fila.insertCell()

    //crear un boton en la celda
    let boton_publicar = document.createElement('button')
    let boton_cancelar = document.createElement('button')

    //estilos del boton editar
    boton_publicar.innerText = "Publicar"

    //asignar clase CSS al boton publicar
    boton_publicar.classList.add('btnAccept');


    //estilos del boton Cancelar
    boton_cancelar.innerText = "Cancelar"

    //asignar clase CSS al boton publicar
    boton_cancelar.classList.add('btnDeny');


    //vamos a definir a quien le pertenecen los botones
    celda_btn_publicar.appendChild(boton_publicar)
    celda_btn_publicar.appendChild(boton_cancelar)

    //agregar eventos a los botones
    boton_publicar.addEventListener("click",()=>{
        localStorage.setItem("id_mongo",listaNoticias[i]["_id"])
        let id = localStorage.getItem("id_mongo")

        console.log(listaNoticias[i]['titulo'])

        actualizarNoticiasEstado(
            id
            ,listaNoticias[i]['titulo']
            ,listaNoticias[i]['subtitulo']
            ,listaNoticias[i]['categoria']
            ,listaNoticias[i]['contenido']
            ,listaNoticias[i]['fechaDePublicacion']
            ,'publicado'
        )
        chargeTableNews()
    })

    boton_cancelar.addEventListener("click",()=>{
        localStorage.setItem("id_mongo",listaNoticias[i]["_id"])
        let id = localStorage.getItem("id_mongo")

        console.log(listaNoticias[i]['titulo'])

        actualizarNoticiasEstado(
            id
            ,listaNoticias[i]['titulo']
            ,listaNoticias[i]['subtitulo']
            ,listaNoticias[i]['categoria']
            ,listaNoticias[i]['contenido']
            ,listaNoticias[i]['fechaDePublicacion']
            ,'publicado'
        )
        chargeTableNews()
    })
}


const chargeTableNews=async()=>{
    //Bring the table that was created in the html with its respective columns
    listaNoticias =  await listar_noticias_pending_BD();
    //limpiar la tabla
    
    cuerpoTablaNoticias.innerHTML=""

     for(let i=0;i<listaNoticias.length;i++){
            
        let fila = cuerpoTablaNoticias.insertRow()

        fila.insertCell().innerHTML=listaNoticias[i]['titulo']
        fila.insertCell().innerHTML=listaNoticias[i]['subtitulo']
        fila.insertCell().innerHTML=listaNoticias[i]['categoria']
        fila.insertCell().innerHTML=listaNoticias[i]['contenido']
        fila.insertCell().innerHTML=listaNoticias[i]['fechaDePublicacion']

        crearBotones(fila,i)
    }

}

document.addEventListener("DOMContentLoaded", chargeTableNews);

/*Button functions tabla Usuarios*/
document.addEventListener("DOMContentLoaded", function() {
    chargeTableNews(); // Cargar la tabla de noticias

    // Seleccionar todos los botones de aceptar y denegar en la tabla de usuarios
    const botonesAceptar = document.querySelectorAll(".btnAccept");
    const botonesDenegar = document.querySelectorAll(".btnDeny");

    // Asignar aceptar y luego denegar
    botonesAceptar.forEach(boton => {
        boton.addEventListener("click", actionBottonAcceptNew);
    });


    botonesDenegar.forEach(boton => {
        boton.addEventListener("click", actionBottonDenyNew);
    });
});

function actionBottonAcceptNew(){
    Swal.fire({
        title: "Aceptado Exitosamente",
        text: "Acción aceptada", // cambiar luego para el mensaje para cada tabla
        icon: "success"
     });
    }

//Cancel
function actionBottonDenyNew(){
    Swal.fire({
        title: "Denegado Exitosamente",
        text: "Acción Denegada", // cambiar luego para el mensaje para cada tabla
        icon: "error"
    });
}


////////////////////////////////////////
////Tabla Administracion de Denuncias////
////////////////////////////////////////

const cuerpoTablaDenuncias = document.querySelector("#tableDenunciaPending tbody");

let listaDenuncias = [];

function crearBotones(fila, i) {
    // Para la columna de acciones
    let celda_btn_resolver = fila.insertCell();

    // Crear botones en la celda
    let boton_resolver = document.createElement('button');
    let boton_publicar = document.createElement('button');
    let boton_cancelar = document.createElement('button');

    // Estilos del botón Resolver
    boton_resolver.innerText = "Resolver";
    boton_resolver.classList.add('btnAccept');

    // Estilos del botón Publicar
    boton_publicar.innerText = "Publicar";
    boton_publicar.classList.add('btnPublicar');

    // Estilos del botón Cancelar
    boton_cancelar.innerText = "Cancelar";
    boton_cancelar.classList.add('btnCancel');

    // Añadir botones a la celda
    celda_btn_resolver.appendChild(boton_resolver);
    celda_btn_resolver.appendChild(boton_publicar);
    celda_btn_resolver.appendChild(boton_cancelar);

    // Eventos para cada botón
    boton_resolver.addEventListener("click", () => {
        localStorage.setItem("id_mongo", listaDenuncias[i]["_id"]);
        let id = localStorage.getItem("id_mongo");

        console.log(listaDenuncias[i]['nombre']);

        actualizarEstado(
            id,
            listaDenuncias[i]['nombre'],
            listaDenuncias[i]['fechayhora'],
            listaDenuncias[i]['categoria'],
            listaDenuncias[i]['lugar'],
            listaDenuncias[i]['descripcion'],
            'resuelto'
        );
        chargeTableDenuncias();
    });

    boton_publicar.addEventListener("click", () => {
        localStorage.setItem("id_mongo", listaDenuncias[i]["_id"]);
        let id = localStorage.getItem("id_mongo");

        console.log(listaDenuncias[i]['nombre']);

        actualizarEstado(
            id,
            listaDenuncias[i]['nombre'],
            listaDenuncias[i]['fechayhora'],
            listaDenuncias[i]['categoria'],
            listaDenuncias[i]['lugar'],
            listaDenuncias[i]['descripcion'],
            'publicado'
        );
        chargeTableDenuncias();
    });

    boton_cancelar.addEventListener("click", () => {
        localStorage.setItem("id_mongo", listaDenuncias[i]["_id"]);
        let id = localStorage.getItem("id_mongo");

        console.log(listaDenuncias[i]['nombre']);

        actualizarEstado(
            id,
            listaDenuncias[i]['nombre'],
            listaDenuncias[i]['fechayhora'],
            listaDenuncias[i]['categoria'],
            listaDenuncias[i]['lugar'],
            listaDenuncias[i]['descripcion'],
            'cancelado'
        );
        chargeTableDenuncias();
    });
}

const chargeTableDenuncias = async () => {
    // Obtener las denuncias pendientes desde la base de datos
    listaDenuncias = await listar_denuncias_pending_BD();

    // Limpiar la tabla
    cuerpoTablaDenuncias.innerHTML = "";

    for (let i = 0; i < listaDenuncias.length; i++) {
        let fila = cuerpoTablaDenuncias.insertRow();

        // Insertar datos de la denuncia
        fila.insertCell().innerHTML = listaDenuncias[i]['nombre'];
        fila.insertCell().innerHTML = listaDenuncias[i]['fechayhora'];
        fila.insertCell().innerHTML = listaDenuncias[i]['categoria'];
        fila.insertCell().innerHTML = listaDenuncias[i]['lugar'];
        fila.insertCell().innerHTML = listaDenuncias[i]['descripcion'];

        // Crear botones para cada fila
        crearBotones(fila, i);
    }
};

document.addEventListener("DOMContentLoaded", chargeTable);

/*Funciones de botones*/
// Resolver
function actionBottonResolver() {
    Swal.fire({
        title: "Denuncia Resuelta",
        text: "Esta denuncia ha sido resuelta correctamente.",
        icon: "success"
    });
}

// Publicar
function actionBottonPublicar() {
    Swal.fire({
        title: "Denuncia Publicada",
        text: "Esta denuncia ha sido publicada.",
        icon: "info"
    });
}

// Cancelar
function actionBottonCancel() {
    Swal.fire({
        title: "Denuncia Cancelada",
        text: "Esta denuncia ha sido cancelada.",
        icon: "error"
    });
}