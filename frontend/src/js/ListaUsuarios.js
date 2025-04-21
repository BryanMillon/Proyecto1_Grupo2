document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/api/usuarios/publicos")
      .then(res => res.json())
      .then(usuarios => {
        const tabla = document.getElementById("userTable");
        usuarios.forEach(usuario => {
          const fila = document.createElement("tr");
          fila.innerHTML = `
            <td>${usuario.nombre}</td>
            <td>${usuario.apellido1} ${usuario.apellido2}</td>
            <td>${usuario.distrito}</td>
            <td>${usuario.rol}</td>
            <td><button onclick="verPerfil('${usuario._id}')">Ver perfil</button></td>
          `;
          tabla.appendChild(fila);
        });
      })
      .catch(error => {
        console.error("Error al cargar usuarios:", error);
        const tabla = document.getElementById("userTable");
        tabla.innerHTML = "<tr><td colspan='5'>No se pudieron cargar los usuarios</td></tr>";
      });
  
    document.getElementById("search").addEventListener("input", () => {
      const filtro = document.getElementById("search").value.toLowerCase();
      const filas = document.querySelectorAll("#userTable tr");
      filas.forEach(fila => {
        const texto = fila.textContent.toLowerCase();
        fila.style.display = texto.includes(filtro) ? "" : "none";
      });
    });
  });
  
  function verPerfil(usuarioId) {
    localStorage.setItem("usuarioSeleccionado", usuarioId);
    window.location.href = "../pages/OtheruserprofilePage.html"; // Ajusta según corresponda
  }
