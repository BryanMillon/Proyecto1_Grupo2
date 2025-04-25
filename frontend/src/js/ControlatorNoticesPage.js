

/*CONTROL THE EVENTS */

/*AFTER THEY COMES FROM THE DATABASE */

let events = []

const showEvents = async () => {
    events = await listar_proximos_avisos_BD();
    
    events.sort((a, b) => new Date(a.fechayhora) - new Date(b.fechayhora));
    
    const eventsContainer = document.getElementById('eventContainer');
    
    for(let i = 0; i < events.length; i++) {
        // Format the date and time
        const dateTime = new Date(events[i]['fechayhora']);
        
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
        
        const eventCard = document.createElement('div');
        eventCard.classList.add('eventCard');
        
        eventCard.innerHTML = `
            <div class="eventHeader"> ${events[i]['nombre']}</div>
            <div class="eventDetail"><strong>Fecha y Hora:</strong> ${formattedDateTime}</div>
            <div class="eventDetail"><strong>Categoría:</strong>  ${events[i]['categoria']}</div>
            <div class="eventDetail"><strong>Lugar:</strong> ${events[i]['lugar']}</div>
            <div class="eventDetail"><strong>Descripción:</strong> ${events[i]['descripcion']}</div>
        `;
        
        eventsContainer.appendChild(eventCard);
    };
}
document.addEventListener("DOMContentLoaded", function () {
    // Supongamos que el tipo de usuario está almacenado así:
    const tipoUsuario = localStorage.getItem("rolLogIn"); 
    const adminItemHeader = document.getElementById("adminNavItemHeader");
    const adminItemFooter = document.getElementById("adminNavItemFooter");
    const crearAviso = document.getElementById("crearAviso");
    const crearNoticia = document.getElementById("crearNoticia");
    const dropdowns = document.querySelectorAll(".dropdown");


    const btnLogin = document.getElementById("btnLogin")
  
    if(tipoUsuario){
      if(btnLogin){
        btnLogin.style.display = "none";
      }
    }

    if (!tipoUsuario) {
        dropdowns.forEach((dropdown) => {
          dropdown.style.display = "none";
        })
    }

    // Ocultar la opción de ADMINISTRADOR si no es administrador
    if (tipoUsuario !== "administrador") {
        if (adminItemHeader) {
            adminItemHeader.style.display = "none";
        }
    }

    // Ocultar la opción de ADMINISTRADOR si no es administrador
    if (tipoUsuario !== "administrador") {
        if (adminItemFooter) {
            adminItemFooter.style.display = "none";
        }
    }

    if (tipoUsuario == "vecino") {
        if (crearAviso) {
            crearAviso.style.display = "none";
        }
    }

    if (tipoUsuario == "vecino") {
        if (crearNoticia) {
            crearNoticia.style.display = "none";
        }
    }

    const estadoConcejal = localStorage.getItem("estadoConcejal"); 

    const btnVerUsuarios = document.getElementById("btnVerUsuarios")
    
    if (tipoUsuario == "vecino") {
        if (btnVerUsuarios) {
            btnVerUsuarios.style.display = "none";
        }
    }

      if (tipoUsuario == "concejal" && estadoConcejal !== "aprobado") {
        if (crearNoticia) {
            crearNoticia.style.display = "none";
        }
      }
  
      if (tipoUsuario == "concejal" && estadoConcejal !== "aprobado") {
        if (crearAviso) {
            crearAviso.style.display = "none";
        }
      }
  
      if (tipoUsuario == "concejal" && estadoConcejal !== "aprobado") {
        if (btnVerUsuarios) {
            btnVerUsuarios.style.display = "none";
        }
      }

});

window.onload = function() {
    showEvents();
    
};

// Funcionalidad del botón Cerrar Sesión
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.clear();
    Swal.fire({
      icon: "success",
      title: "Sesión cerrada",
      showConfirmButton: false,
      timer: 1000
    }).then(() => {
        window.location.href = "../pages/HomeUser.html";
    });
  });
}