document.addEventListener("DOMContentLoaded", function () {
  const rol = localStorage.getItem("rolLogIn");
  const userId = localStorage.getItem("id_mongo");

  // Seguridad: si no está logueado, redirigir
  if (!userId || !rol) {
    window.location.href = "../pages/LoginPage.html";
    return;
  }

  // Redirigir si alguien no administrador entra a AdminPage.html
  if (window.location.href.includes("AdminPage.html") && rol !== "administrador") {
    Swal.fire({
      icon: "error",
      title: "Acceso restringido",
      text: "No tienes permisos para acceder al panel de administrador"
    }).then(() => {
      window.location.href = "../pages/HomePage.html";
    });
    return;
  }

  // Ocultar botones Crear Aviso y Crear Noticia si es vecino
  if (rol === "vecino") {
    const crearAviso = document.getElementById("crearAviso");
    const crearNoticia = document.getElementById("crearNoticia");

    if (crearAviso) crearAviso.style.display = "none";
    if (crearNoticia) crearNoticia.style.display = "none";
  }

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
        window.location.href = "../pages/LoginPage.html";
      });
    });
  }
});