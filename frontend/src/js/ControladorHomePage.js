

document.addEventListener("DOMContentLoaded", function () {
  const tipoUsuario = localStorage.getItem("rolLogIn");

  if (!tipoUsuario) {
    Swal.fire({
      icon: "warning",
      title: "Debes estar logueado",
      text: "Inicia sesión para acceder a esta página",
      confirmButtonText: "Ir al Login"
    }).then(() => {
      window.location.href = "../pages/LoginPage.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
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