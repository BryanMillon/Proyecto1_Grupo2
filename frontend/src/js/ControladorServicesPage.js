document.addEventListener("DOMContentLoaded", function () {
    const tipoUsuario = localStorage.getItem("rolLogIn"); 
    const adminItemHeader = document.getElementById("adminNavItemHeader");
    const adminItemFooter = document.getElementById("adminNavItemFooter");
    const crearAviso = document.getElementById("crearAviso");
    const crearNoticia = document.getElementById("crearNoticia");
    const dropdowns = document.querySelectorAll(".dropdown");


    console.log(tipoUsuario)

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