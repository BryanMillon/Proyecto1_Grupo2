document.addEventListener("DOMContentLoaded", function () {
    const tipoUsuario = localStorage.getItem("rolLogIn"); 
    const adminItemHeader = document.getElementById("adminNavItemHeader");
    const adminItemFooter = document.getElementById("adminNavItemFooter");
    const crearAviso = document.getElementById("crearAviso");
    const crearNoticia = document.getElementById("crearNoticia");
    const dropdowns = document.querySelectorAll(".dropdown");
    const formVisitor = document.querySelectorAll(".form-container");


     const btnLogin = document.getElementById("btnLogin")
  
    if(tipoUsuario){
      if(btnLogin){
        btnLogin.style.display = "none";
      }
    }

    if (!tipoUsuario) {
        dropdowns.forEach((dropdown) => {
          dropdown.style.display = "none";
        })
    }

    if (!tipoUsuario) {
        formVisitor.forEach((formVisitor) => {
            formVisitor.style.display = "none";
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

    const estadoConcejal = localStorage.getItem("estadoConcejal"); 

    const btnVerUsuarios = document.getElementById("btnVerUsuarios")

    if (tipoUsuario == "vecino") {
        if (btnVerUsuarios) {
            btnVerUsuarios.style.display = "none";
        }
    }
    
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
  
      if (tipoUsuario == "concejal" && estadoConcejal !== "aprobado") {
        if (btnVerUsuarios) {
            btnVerUsuarios.style.display = "none";
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

const inputcategoria = document.getElementById("categoria");
const inputdistrito = document.getElementById("distrito");
const inputdescripcion = document.getElementById("descripcion");
const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");


    // Limpia los campos y errores visuales
    function limpiarFormulario() {
        categoria.value = "";
        distrito.value = "";
        descripcion.value = "";
        [categoria, distrito, descripcion].forEach(input => input.classList.remove("error"));
    }

    function validarCamposVacios() {
        let error = false;
        [categoria, distrito, descripcion].forEach(input => {
            if (input.value.trim() === "") {
                input.classList.add("error");
                error = true;
            } else {
                input.classList.remove("error");
            }
        });
        return error;
    }


// Crear una denuncia
function Guardar_Iniciativa_Creada() {
    let errorCamposVacios = validarCamposVacios();

    // Obtener usuarioId del localStorage (debe estar guardado al iniciar sesión)
    const usuarioId = localStorage.getItem("id_mongo");

    if (!usuarioId) {
        Swal.fire("Error de sesión", "Debe iniciar sesión para enviar una iniciativa.", "error");
        return;
    }

    if (errorCamposVacios) {
        Swal.fire({
            title: "Campos vacíos",
            text: "Revisa los campos marcados en rojo",
            icon: "warning"
        });
    } else {
        let categoria= inputcategoria.value;
        let descripcion = inputdescripcion.value;
        let distrito =  inputdistrito.value;

        crear_iniciativa(usuarioId, categoria, descripcion, distrito);
        limpiarFormulario();
    }
}


submitButton.addEventListener("click", Guardar_Iniciativa_Creada);
cancelButton.addEventListener("click", function () {
    limpiarFormulario();
});



let iniciativas = []

const mostrarIniciativas=async()=>{
    iniciativas =  await listar_iniciativas_publicadasBD();

    console.log(iniciativas)

    const articleCountainer = document.getElementById('articleCountainer');

    for(let i=0;i<iniciativas.length;i++){
        const eventCard = document.createElement('div');
        eventCard.classList.add('eventCard');
        
        eventCard.innerHTML = `

             <div class="newsHeader"> ${iniciativas[i]['categoria']}</div>
            <div class="newsDetail"><strong>Descripcion:</strong> ${iniciativas[i]['descripcion']}</div>
            <div class="newsDetail"><strong>Distrito afectado:</strong>  ${iniciativas[i]['distrito']}</div>
          
        `;

        articleCountainer.appendChild(eventCard);
    };
}



window.onload = function () {
    mostrarIniciativas();
};


