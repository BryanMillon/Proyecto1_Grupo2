
document.addEventListener('DOMContentLoaded', async () => {
  const tablaUsuarios = document.getElementById('userTable');
  const inputBuscar = document.getElementById('search');

  let usuarios = [];

  verificarSesion()
  
  // Cargar usuarios al iniciar
  try {
    usuarios = await obtenerUsuarios();
    renderizarTabla(usuarios);
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudieron cargar los usuarios.',
    });
  }

  // Filtrar en tiempo real
  inputBuscar.addEventListener('input', () => {
    const termino = inputBuscar.value.toLowerCase();
    const filtrados = usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(termino) ||
      usuario.apellido1.toLowerCase().includes(termino) ||
      usuario.apellido2.toLowerCase().includes(termino) ||
      usuario.rol.toLowerCase().includes(termino) ||
      usuario.distrito.toLowerCase().includes(termino)
    );
    renderizarTabla(filtrados);
  });

  function renderizarTabla(usuarios) {
    const tabla = document.getElementById('userTable');
    tabla.innerHTML = '';
  
    usuarios.forEach(usuario => {
      const fila = document.createElement('tr');
  
      const celdaNombre = document.createElement('td');
      celdaNombre.textContent = `${capitalizarPrimeraLetra(usuario.nombre)} ${capitalizarPrimeraLetra(usuario.apellido1)} ${capitalizarPrimeraLetra(usuario.apellido2)}`;
      fila.appendChild(celdaNombre);
  
      const celdaDistrito = document.createElement('td');
      celdaDistrito.textContent = formatearDistrito(usuario.distrito);
      fila.appendChild(celdaDistrito);
  
      const celdaRol = document.createElement('td');
      celdaRol.textContent = capitalizarPrimeraLetra(usuario.rol);
      fila.appendChild(celdaRol);
  
      const celdaAccion = document.createElement('td');
      const botonVer = document.createElement('button');
      botonVer.textContent = 'Ver Usuario';
      botonVer.classList.add('ver-btn');
      botonVer.setAttribute('data-id', usuario._id);
      celdaAccion.appendChild(botonVer);
      fila.appendChild(celdaAccion);
  
      tabla.appendChild(fila);
    });
  
    const botonesVer = document.querySelectorAll('.ver-btn');
    botonesVer.forEach(boton => {
      boton.addEventListener('click', (e) => {
        const userId = e.target.getAttribute('data-id');
        window.location.href = `../pages/OtheruserprofilePage.html?id=${userId}`;
      });
    });
  }

  // Función para capitalizar la primera letra
  function capitalizarPrimeraLetra(cadena) {
    if (!cadena) return '';
    return cadena.charAt(0).toUpperCase() + cadena.slice(1).toLowerCase();
  }
  
  // Función para formatear el distrito
  function formatearDistrito(distrito) {
    if (!distrito) return '';
    
    // Insertar espacio entre minúscula y mayúscula (por si viene en camelCase)
    const conEspacios = distrito.replace(/([a-z])([A-Z])/g, '$1 $2');
  
    // Capitalizar la primera letra de cada palabra
    return conEspacios
      .split(' ')
      .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
      .join(' ');
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

  const estadoConcejal = localStorage.getItem("estadoConcejal"); 
    if (tipoUsuario == "concejal" && estadoConcejal !== "aprobado") {
      if (crearNoticia) {
          crearNoticia.style.display = "none";
      }
    }

    if (tipoUsuario == "concejal" && estadoConcejal !== "aprobado") {
      if (crearAviso) {
          crearAviso.style.display = "none";
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
