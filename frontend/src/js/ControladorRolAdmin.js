window.onload = function () {
    const userId = localStorage.getItem("id_mongo");
    const userRol = localStorage.getItem("rolLogIn");
  
    if (!userId || userRol !== "administrador") {
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'No tienes permisos para acceder a esta página',
        confirmButtonText: 'Volver al inicio'
      }).then(() => {
        window.location.href = "../pages/HomePage.html"; // Redirige a una página pública
      });
    }
  };
  
  document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "../pages/LoginPage.html";
  });