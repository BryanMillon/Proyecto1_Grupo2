document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("usuarioSeleccionado");

  if (!userId) {
    Swal.fire("Error", "No se seleccionó ningún usuario", "error");
    return;
  }

  fetch(`http://localhost:3000/api/usuarios/publico/${userId}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("user-name").textContent = `${data.nombre} ${data.apellido1} ${data.apellido2}`;
      document.getElementById("first-name").textContent = data.nombre;
      document.getElementById("last-name").textContent = `${data.apellido1} ${data.apellido2}`;
      document.getElementById("district").textContent = data.distrito;
      document.getElementById("rol").textContent = data.rol;
      document.getElementById("profile-pic").src = data.imageUrl || "../../public/images/Perfil-logo.svg";
    })
    .catch(error => {
      console.error("Error al obtener perfil público:", error);
      Swal.fire("Error", "No se pudo cargar la información del usuario", "error");
    });
});