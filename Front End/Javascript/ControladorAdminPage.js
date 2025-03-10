
/*ESTO MAS ADELANTE LO VOY A SACAR DE LA TABLA DE LA BASE DE DATOS, ES SOLAMENTE POR EL MOMENTO*/
const lista = [
    { 
        nombre: "Mantenimiento eléctrico",
        categoria: "Mantenimiento",
        lugar: "Edificio A",
        fechaHora: "2025-03-10 10:00 AM",
        descripcion: "Se realizará un mantenimiento eléctrico en el Edificio A. Se recomienda tomar precauciones."
    },
    { 
        nombre: "Reunión de seguridad",
        categoria: "Reunión",
        lugar: "Sala de conferencias",
        fechaHora: "2025-03-12 3:00 PM",
        descripcion: "Reunión para discutir temas de seguridad en la empresa."
    },
    { 
        nombre: "Suspensión de agua",
        categoria: "Aviso importante",
        lugar: "Toda la instalación",
        fechaHora: "2025-03-15 8:00 AM",
        descripcion: "El servicio de agua potable será suspendido temporalmente por mantenimiento."
    }
];

function chargeTable() {
    //Bring the table that was created in the html with its respective columns
    const tbody = document.querySelector("#tableEventPending tbody");

     // Clear table before loading data
    tbody.innerHTML = "";

    //Here we are going to grab each element of the list that was created above for the moment fixed
    lista.forEach((item, index) => {

        //Create the row
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td id= "tdCustom">${item.nombre}</td>
            <td id= "tdCustom">${item.fechaHora}</td>
            <td id= "tdCustom">${item.categoria}</td>
            <td id= "tdCustom">${item.lugar}</td>
            <td id= "tdCustom">${item.descripcion}</td>
            <td  id= "tdCustom">
                <!-index is inserting the value of the index variable into the text string.
                As a result, an onclick attribute is created on each of the buttons that when clicked calls the actionBottonPublish or actionBottonCancel() function-->
                <button id="btnPublish" onclick="actionBottonPublish(${index})">Publicar</button>
                <button id="btnCancel" onclick="actionBottonCancel(${index})">Cancelar</button>
            </td>
        `;

        //Add the row to the table
        tbody.appendChild(fila);
    });
}

document.addEventListener("DOMContentLoaded", chargeTable);

/*Button functions*/

//Publish
function actionBottonPublish(){
    Swal.fire({
        title: "Evento Publicado Exitosamente",
        text: "Este evento ahora va a ser visible para todos los usuarios",
        icon: "success"
     });
    }

//Cancel
function actionBottonCancel(){
    Swal.fire({
        title: "Evento No Publicado",
        text: "Este evento ha sido cancelado y no se ha publicado.",
        icon: "error"
    });
}

