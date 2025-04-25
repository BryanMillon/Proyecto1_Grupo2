/*Control de Noticias*/

// Mostrar Noticias 
let news = []
verificarSesion()

const showNews=async()=>{
    news =  await listar_noticias_publicadas_BD();
    console.log (news)

    news.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));


    const newsContainer = document.getElementById('newsCountainer');

    for(let i=0;i<news.length;i++){
        const newCard = document.createElement('div');
        newCard.classList.add('newCard');
        
        newCard.innerHTML = `
            <div class="newsHeader"> ${news[i]['titulo']}</div>
            <div class="newsDetail"><strong>Subtitulo:</strong> ${news[i]['subtitulo']}</div>
            <div class="newsDetail"><strong>Categoría:</strong>  ${news[i]['categoria']}</div>
            <div class="newsDetail"><strong>Contenido:</strong> ${news[i]['contenido']}</div>
            <div class="newsDetail"><strong>Fecha de publicacion:</strong> ${news[i]['fechaDePublicacion']}</div>
        `;

        newsContainer.appendChild(newCard);
    };

}

document.addEventListener("DOMContentLoaded", function () {
    // Supongamos que el tipo de usuario está almacenado así:
    const tipoUsuario = localStorage.getItem("rolLogIn"); 
    const adminItemHeader = document.getElementById("adminNavItemHeader");
    const adminItemFooter = document.getElementById("adminNavItemFooter");
    const dropdowns = document.querySelectorAll(".dropdown");
    const crearAviso = document.getElementById("crearAviso");
    const crearNoticia = document.getElementById("crearNoticia");


    console.log(tipoUsuario)

    if (!tipoUsuario) {
        dropdowns.forEach((dropdown) => {
          dropdown.style.display = "none";
        })
    }

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
    showNews();
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
