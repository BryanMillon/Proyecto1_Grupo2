function verificarSesion() {
  const userId = localStorage.getItem("id_mongo");
  const estadoConcejal = localStorage.getItem("estadoConcejal"); 
  const tipoUsuario = localStorage.getItem("rolLogIn");

  if (!userId) {
    Swal.fire({
      icon: 'warning',
      title: 'Acceso restringido',
      text: 'Debes iniciar sesión para acceder a esta página',
      confirmButtonText: 'Ir al login'
    }).then(() => {
      window.location.href = "../pages/LoginPage.html";
    });
  } 

  if (tipoUsuario == "concejal" && estadoConcejal !== "aprobado"){
    Swal.fire({
      icon: 'warning',
      title: 'Acceso restringido',
      text: 'No tienes permiso para acceder a esta página',
      confirmButtonText: 'Ir a la página de inicio'
    }).then(() => {
      window.location.href = "../pages/HomePage.html";
    });
  }

  if (tipoUsuario == "vecino"){
    Swal.fire({
      icon: 'warning',
      title: 'Acceso restringido',
      text: 'No tienes permiso para acceder a esta página',
      confirmButtonText: 'Ir a la página de inicio'
    }).then(() => {
      window.location.href = "../pages/HomePage.html";
    });
  }
}

window.onload = verificarSesion;
  
  // const logoutBtn = document.getElementById("logoutBtn");
  // if (logoutBtn) {
  //   logoutBtn.addEventListener("click", function () {
  //     localStorage.clear();
  //     window.location.href = "../pages/LoginPage.html";
  //   });
  // }