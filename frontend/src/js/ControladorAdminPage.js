//Referencias al DM

///////////////////////////////////////
////Tabla administracion de Eventos////
///////////////////////////////////////

const cuerpoTablaAvisos = document.querySelector("#tableEventPending tbody")

let listaAvisos= []


function crearBotonesAvisos(fila,i){
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
        actionBottonAcceptEvent()
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
        actionBottonCancelEvent()
    })
}


const chargeTable=async()=>{
    //Bring the table that was created in the html with its respective columns
    listaAvisos =  await listar_avisos_pending_BD();
    //limpiar la tabla
    
    cuerpoTablaAvisos.innerHTML=""

     for(let i=0;i<listaAvisos.length;i++){

        const dateTime = new Date(listaAvisos[i]['fechayhora']);
        
        // Create a formatted date string
        const formattedDate = dateTime.toLocaleDateString('es-CR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Create a formatted time string
        const formattedTime = dateTime.toLocaleTimeString('es-CR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Combine date and time
        const formattedDateTime = `${formattedDate} a las ${formattedTime}`;
            
        let fila = cuerpoTablaAvisos.insertRow()

        fila.insertCell().innerHTML=listaAvisos[i]['nombre']
        fila.insertCell().innerHTML= formattedDateTime
        fila.insertCell().innerHTML=listaAvisos[i]['categoria']
        fila.insertCell().innerHTML=listaAvisos[i]['lugar']
        fila.insertCell().innerHTML=listaAvisos[i]['descripcion']

        crearBotonesAvisos(fila,i)
    }

}

document.addEventListener("DOMContentLoaded", chargeTable);


/*Button functions*/
//Cancel

function actionBottonAcceptEvent(){
    Swal.fire({
        title: "Evento Publicado",
        text: "Este evento ha sido publicado.",
        icon: "success"
    });
}

function actionBottonCancelEvent(){
    Swal.fire({
        title: "Evento No Publicado",
        text: "Este evento ha sido cancelado y no se ha publicado.",
        icon: "error"
    });
}



///////////////////////////////////////////////////
////Tabla Administracion de UsuariosConcejales////
/////////////////////////////////////////////////

const cuerpoTablaConcejales = document.querySelector("#tableUserPending  tbody")

let listaConcejales= []


function crearBotonesConcejales(fila,i){
    //para la columna de acciones
    //definir la celda en donde van a ir los botones
    let celda_btn_publicar = fila.insertCell()

    //crear un boton en la celda
    let boton_publicar = document.createElement('button')
    let boton_cancelar = document.createElement('button')

    //estilos del boton editar
    boton_publicar.innerText = "Aceptar"

    //asignar clase CSS al boton publicar
    boton_publicar.classList.add('btnAccept');


    //estilos del boton Cancelar
    boton_cancelar.innerText = "Rechazar"

    //asignar clase CSS al boton publicar
    boton_cancelar.classList.add('btnDeny');


    //vamos a definir a quien le pertenecen los botones
    celda_btn_publicar.appendChild(boton_publicar)
    celda_btn_publicar.appendChild(boton_cancelar)

    //agregar eventos a los botones
    boton_publicar.addEventListener("click",()=>{
        localStorage.setItem("id_mongo",listaConcejales[i]["_id"])
        let id = localStorage.getItem("id_mongo")

        console.log(listaConcejales[i]['nombre'])

        actualizarEstadoUsuario(
            id
            ,'aprobado'
           
        )
        chargeTableConcejales()
        actionBottonAcceptCon()
    })

    boton_cancelar.addEventListener("click",()=>{
        localStorage.setItem("id_mongo",listaConcejales[i]["_id"])
        let id = localStorage.getItem("id_mongo")

        console.log(listaConcejales[i]['nombre'])

        actualizarEstadoUsuario(
            id
            ,'rechazado'
        )
        chargeTableConcejales()
        actionBottonCancelCon()
    })
}


const chargeTableConcejales=async()=>{
    //Bring the table that was created in the html with its respective columns
    listaConcejales =  await listar_usuarios_pending_BD();
    //limpiar la tabla
    
    cuerpoTablaConcejales.innerHTML=""

     for(let i=0;i<listaConcejales.length;i++){
            
        let fila = cuerpoTablaConcejales.insertRow()

        fila.insertCell().innerHTML=listaConcejales[i]['nombre']
        fila.insertCell().innerHTML=listaConcejales[i]['apellido1']
        fila.insertCell().innerHTML=listaConcejales[i]['apellido2']
        fila.insertCell().innerHTML=listaConcejales[i]['email']
        fila.insertCell().innerHTML=listaConcejales[i]['rol']

        crearBotonesConcejales(fila,i)
    }

}

document.addEventListener("DOMContentLoaded", chargeTableConcejales);


/*Button functions*/
//Cancel
function actionBottonAcceptCon(){
    Swal.fire({
        title: "Concejal aceptado",
        text: "El usuario ha sido aceptado y ahora es concejal",
        icon: "success"
    });
}




/*Button functions*/
//Cancel
function actionBottonCancelCon(){
    Swal.fire({
        title: "Concejal Rechazado",
        text: "El usuario no ha sido aceptado",
        icon: "error"
    });
}




////////////////////////////////////////
////Tabla Administracion de Noticias////
////////////////////////////////////////

const cuerpoTablaNoticias = document.querySelector("#tableNewPending tbody")

let listaNoticias= []


function crearBotonesNoticias(fila,i){
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
        actionBottonAcceptNews()
    })

    boton_cancelar.addEventListener("click",()=>{
        localStorage.setItem("id_mongo",listaNoticias[i]["_id"])
        let id = localStorage.getItem("id_mongo")

        actualizarNoticiasEstado(
            id
            ,listaNoticias[i]['titulo']
            ,listaNoticias[i]['subtitulo']
            ,listaNoticias[i]['categoria']
            ,listaNoticias[i]['contenido']
            ,listaNoticias[i]['fechaDePublicacion']
            ,'cancelado'
        )
        chargeTableNews()
        actionBottonCancelNews()
    })
}
function actionBottonAcceptNews(){
    Swal.fire({
        title: "Noticia publicada",
        text: "La noticia ha sido aceptada y publicada",
        icon: "success"
    });
}




/*Button functions*/
//Cancel
function actionBottonCancelNews(){
    Swal.fire({
        title: "Noticia Rechazada",
        text: "La noticia no ha sido aceptada",
        icon: "error"
    });
}

const chargeTableNews = async () => {
    //Bring the table that was created in the html with its respective columns
    listaNoticias = await listar_noticias_pending_BD();
    //limpiar la tabla
    cuerpoTablaNoticias.innerHTML = "";
    
    for(let i = 0; i < listaNoticias.length; i++) {
     
        const dateTime = new Date(listaNoticias[i]['fechaDePublicacion']);
        
       
        const formattedDate = dateTime.toLocaleDateString('es-CR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
   
        const formattedTime = dateTime.toLocaleTimeString('es-CR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        
        const formattedDateTime = `${formattedDate} a las ${formattedTime}`;
        
        let fila = cuerpoTablaNoticias.insertRow();
        fila.insertCell().innerHTML = listaNoticias[i]['titulo'];
        fila.insertCell().innerHTML = listaNoticias[i]['subtitulo'];
        fila.insertCell().innerHTML = listaNoticias[i]['categoria'];
        fila.insertCell().innerHTML = listaNoticias[i]['contenido'];
        fila.insertCell().innerHTML = formattedDateTime; 
        
        crearBotonesNoticias(fila, i);
    }
}
document.addEventListener("DOMContentLoaded", chargeTableNews);





////////////////////////////////////////
////Tabla Administracion de Denuncias////
////////////////////////////////////////

const cuerpoTablaDenuncias = document.querySelector("#tablePendingReport tbody");

let listaDenuncias = [];

function crearBotonesDenuncias(fila, i) {
    // Celda para los botones de acciones
    let celda_btn_resolver = fila.insertCell();

    // Botón Resolver
    let boton_resolver = document.createElement('button');
    boton_resolver.innerText = "Resolver";
    boton_resolver.classList.add('btnAccept');
    boton_resolver.addEventListener("click", () => {
        localStorage.setItem("id_mongo", listaDenuncias[i]["_id"]);
        let id = localStorage.getItem("id_mongo");

        console.log(listaDenuncias[i]['nombre']);

        actualizarEstadoDenuncia(
            id,
            listaDenuncias[i]['nombre'],
            listaDenuncias[i]['fechayhora'],
            listaDenuncias[i]['categoria'],
            listaDenuncias[i]['lugar'],
            listaDenuncias[i]['descripcion'],
            'resuelto'
        );
        chargeTableDenuncias();
        actionBottonResolver()
    });
    celda_btn_resolver.appendChild(boton_resolver);

    // Botón Ver Archivo
    // if (listaDenuncias[i]['archivoUrl']) {
    //     let boton_ver_archivo = document.createElement('button');
    //     boton_ver_archivo.innerText = "Ver Archivo";
    //     boton_ver_archivo.classList.add('btnView');
    //     boton_ver_archivo.style.marginLeft = "10px";

    //     boton_ver_archivo.addEventListener("click", () => {
    //         window.open(listaDenuncias[i]['archivoUrl'], '_blank');
    //     });

    //     celda_btn_resolver.appendChild(boton_ver_archivo);
    // }
}

const chargeTableDenuncias = async () => {
    listaDenuncias = await listar_denuncias_pending_BD();
    cuerpoTablaDenuncias.innerHTML = "";
    
    for (let i = 0; i < listaDenuncias.length; i++) {
        // Format the date and time
        const dateTime = new Date(listaDenuncias[i]['fechayhora']);
        
        // Create a formatted date string
        const formattedDate = dateTime.toLocaleDateString('es-CR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Create a formatted time string
        const formattedTime = dateTime.toLocaleTimeString('es-CR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Combine date and time
        const formattedDateTime = `${formattedDate} a las ${formattedTime}`;
        
        let fila = cuerpoTablaDenuncias.insertRow();
        
        fila.insertCell().innerHTML = listaDenuncias[i]['nombre'];
        fila.insertCell().innerHTML = listaDenuncias[i]['categoria'];
        fila.insertCell().innerHTML = listaDenuncias[i]['lugar'];
        fila.insertCell().innerHTML = formattedDateTime; // Using the formatted date and time
        
        crearBotonesDenuncias(fila, i);
    }
};

document.addEventListener("DOMContentLoaded", chargeTableDenuncias);

/*Funciones de botones*/
function actionBottonResolver() {
    Swal.fire({
        title: "Denuncia Resuelta",
        text: "Esta denuncia ha sido resuelta correctamente.",
        icon: "success"
    });
}








////////////////////////////////////////
////Tabla Administracion de Iniciativas////
////////////////////////////////////////

const cuerpoTablaIniciativas = document.querySelector("#tableIniciativesPending tbody");

let listaIniciativas = [];

function crearBotonesIniciativas(fila, i) {
    // Para la columna de acciones
    let celda_btn_resolver = fila.insertCell();

    // Crear botones en la celda
    let boton_resolver = document.createElement('button');


    // Estilos del botón Resolver
    boton_resolver.innerText = "Resolver";
    boton_resolver.classList.add('btnAccept');


    // Añadir botones a la celda
    celda_btn_resolver.appendChild(boton_resolver);

    // Eventos para cada botón
    boton_resolver.addEventListener("click", () => {
        localStorage.setItem("id_mongo", listaIniciativas[i]["_id"]);
        let id = localStorage.getItem("id_mongo");

        console.log(listaIniciativas[i]['nombre']);

        actualizarEstadoIniciativa(
            id,
            'aprobada'
        );
        chargeTableIniciativas();
        actionBottonResolverIniciativas()
    });
}


const chargeTableIniciativas = async () => {
    // Obtener las denuncias pendientes desde la base de datos
    listaIniciativas = await listar_iniciativas_pendientesBD();

    // Limpiar la tabla
    cuerpoTablaIniciativas.innerHTML = "";

    for (let i = 0; i < listaIniciativas.length; i++) {
        let fila = cuerpoTablaIniciativas.insertRow();

        // Insertar datos de la denuncia
        fila.insertCell().innerHTML = listaIniciativas[i]['categoria'];
        fila.insertCell().innerHTML = listaIniciativas[i]['distrito'];
        fila.insertCell().innerHTML = listaIniciativas[i]['descripcion'];

        // Crear botones para cada fila
        crearBotonesIniciativas(fila, i);
    }
};

function actionBottonResolverIniciativas() {
    Swal.fire({
        title: "Iniciativa Resuelta",
        text: "Esta iniciativa ha sido resuelta correctamente.",
        icon: "success"
    });
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.clear();
    Swal.fire({
      icon: "success",
      title: "Sesión cerrada",
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
        window.location.href = "../pages/HomeUser.html";
    });
  });
}


document.addEventListener("DOMContentLoaded", chargeTableIniciativas);




