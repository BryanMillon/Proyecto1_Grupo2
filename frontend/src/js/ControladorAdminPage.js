//Referencias al DM
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


/*Button functions*/

//Publish
function actionbtnAccept(){
    Swal.fire({
        title: "Denuncia Procesada",
        text: "Esta denuncia se procesará",
        icon: "success"
     });
    }

//Cancel
function actionbtnDeny(){
    Swal.fire({
        title: "Denuncia Rechazada",
        text: "Esta denuncia no se procesará",
        icon: "error"
    });
}

/*Button functions tabla Usuarios*/
document.addEventListener("DOMContentLoaded", function() {
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
}

