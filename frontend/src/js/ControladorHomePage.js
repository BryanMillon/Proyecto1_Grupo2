

console.log(localStorage.getItem("id_mongo"))
console.log(localStorage)

window.onload = function () {
  const userId = localStorage.getItem("id_mongo");

  if (!userId) {
    Swal.fire({
      icon: 'warning',
      title: 'Acceso denegado',
      text: 'Tienes que estar logueado para ver esta página',
      confirmButtonText: 'Iniciar Sesion'
    }).then(() => {
      // Redirigir al login después del mensaje
      window.location.href = "../pages/LoginPage.html";
    });
  }
};

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