

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

document.getElementById("logoutBtn").addEventListener("click", function () {

  localStorage.clear();
 
  window.location.href = "../pages/LoginPage.html";
});