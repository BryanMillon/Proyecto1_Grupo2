window.onload = function () {
    const userId = localStorage.getItem("id_mongo");
  
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
  };
  
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.clear();
      window.location.href = "../pages/LoginPage.html";
    });
  }