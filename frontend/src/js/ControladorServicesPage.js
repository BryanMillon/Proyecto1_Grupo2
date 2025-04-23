document.addEventListener("DOMContentLoaded", function () {
    // Supongamos que el tipo de usuario está almacenado así:
    const tipoUsuario = localStorage.getItem("rolLogIn"); 
    const adminItemHeader = document.getElementById("adminNavItemHeader");
    const adminItemFooter = document.getElementById("adminNavItemFooter");
    const crearAviso = document.getElementById("crearAviso");
    const crearNoticia = document.getElementById("crearNoticia");


    console.log(tipoUsuario)

    // Ocultar la opción de ADMINISTRADOR si no es administrador
    if (tipoUsuario !== "administrador") {
        if (adminItemHeader) {
            adminItemHeader.style.display = "none";
        }
    }

    if (tipoUsuario == "vecino") {
        if (crearAviso) {
            crearAviso.style.display = "none";
        }
    }

    if (tipoUsuario == "concejal") {
        if (crearNoticia) {
            crearNoticia.style.display = "none";
        }
    }
});

window.onload = function() {
    showNews();
};
