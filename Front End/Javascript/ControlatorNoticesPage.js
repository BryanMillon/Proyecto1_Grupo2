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


window.onload = function() {
    showEvents();
    addFooter()
};