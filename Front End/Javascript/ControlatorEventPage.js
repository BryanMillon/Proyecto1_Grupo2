//Get all references to the DOM to the Form
const inputNameEvent = document.getElementById("textNombreAviso");
const inputDateEvent = document.getElementById("dateTimePicker");
const inputCategoryEvent= document.getElementById("eventCategory");
const inputPlaceEvent = document.getElementById("textPlace");
const inputDescriptionEvent = document.getElementById("textDescription");

//Validate that there are no empty fields
function validateEmphyFields() {
    let error = false;
    let ListInputsRequired = document.querySelectorAll("#formNewEvent [required]");
    for(let i=0; i<ListInputsRequired.length;i++){
        if(ListInputsRequired[i].value == ""){
            ListInputsRequired[i].classList.add('error');
            error=true;
        }else{
            ListInputsRequired[i].classList.remove('error');
        }
    }
    return error;
}

function sendData(){
    let errorCamposVacios = validateEmphyFields();

    if(errorCamposVacios){
        Swal.fire({
            title: "Campos vacios",
            text: "Revisa los campos marcados en rojo",
            icon: "warning"
          });
    }else{
        Swal.fire({
            title: "Exito",
            text: "Su evento se ha enviado exitosamente",
            icon: "success"
          });
    }
}

btnBotonPublicar.addEventListener("click",sendData);
btnBotonCrear.addEventListener("click",sendData);


/*CONTROL THE EVENTS */

/*AFTER THEY COMES FROM THE DATABASE */

const events = [
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
    },
    { 
        nombre: "Suspensión de agua",
        categoria: "Aviso importante",
        lugar: "Toda la instalación",
        fechaHora: "2025-03-15 8:00 AM",
        descripcion: "El servicio de agua potable será suspendido temporalmente por mantenimiento."
    },
    { 
        nombre: "Suspensión de agua",
        categoria: "Aviso importante",
        lugar: "Toda la instalación",
        fechaHora: "2022-03-15 8:00 AM",
        descripcion: "El servicio de agua potable será suspendido temporalmente por mantenimiento."
    },
    { 
        nombre: "Suspensión de agua",
        categoria: "Aviso importante",
        lugar: "Toda la instalación",
        fechaHora: "2025-03-15 8:00 AM",
        descripcion: "El servicio de agua potable será suspendido temporalmente por mantenimiento."
    },
    { 
        nombre: "Suspensión de agua",
        categoria: "Aviso importante",
        lugar: "Toda la instalación",
        fechaHora: "2025-03-15 8:00 AM",
        descripcion: "El servicio de agua potable será suspendido temporalmente por mantenimiento."
    },
    { 
        nombre: "Suspensión de agua",
        categoria: "Aviso importante",
        lugar: "Toda la instalación",
        fechaHora: "2023-03-15 8:00 AM",
        descripcion: "El servicio de agua potable será suspendido temporalmente por mantenimiento."
    },
    { 
        nombre: "Suspensión de agua",
        categoria: "Aviso importante",
        lugar: "Toda la instalación",
        fechaHora: "2025-03-15 8:00 AM",
        descripcion: "El servicio de agua potable será suspendido temporalmente por mantenimiento."
    }
];

// Function to sort events by date
function sortEvents() {
    /*events.sort: is a JavaScript method used to sort the elements of an array. This method modifies the original array and returns the sorted array.*/
    /*comparate by fechaHora to order*/
    return events.sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora));
}

// Show events 
function showEvents() {
    const eventsContainer = document.getElementById('eventContainer');
    sortEvents().forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('eventCard');
        
        eventCard.innerHTML = `
            <div class="eventHeader">${event.nombre}</div>
            <div class="eventDetail"><strong>Fecha y Hora:</strong> ${event.fechaHora}</div>
            <div class="eventDetail"><strong>Categoría:</strong> ${event.categoria}</div>
            <div class="eventDetail"><strong>Lugar:</strong> ${event.lugar}</div>
            <div class="eventDetail"><strong>Descripción:</strong> ${event.descripcion}</div>
        `;

        eventsContainer.appendChild(eventCard);
    });
}

// Execute the function to display events when the page loads
window.onload = showEvents;