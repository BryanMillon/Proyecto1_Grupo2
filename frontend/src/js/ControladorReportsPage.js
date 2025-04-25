// document.addEventListener("DOMContentLoaded", function () {
//     const tipoUsuario = localStorage.getItem("rolLogIn");
  
//     if (!tipoUsuario) {
//       Swal.fire({
//         icon: "warning",
//         title: "Debes estar logueado",
//         text: "Inicia sesión para acceder a esta página",
//         confirmButtonText: "Ir al Login"
//       }).then(() => {
//         window.location.href = "../pages/LoginPage.html";
//       });
//     }
//   });
  

// Obtener todas las referencias del DOM para el formulario de denuncias
const inputNameReport = document.getElementById("textNombreDenuncia");
const inputDateReport = document.getElementById("dateTimePickerDenuncia");
const inputCategoryReport = document.getElementById("reportCategory");
const inputPlaceReport = document.getElementById("textPlaceDenuncia");
const inputDescriptionReport = document.getElementById("textDescriptionDenuncia");
const btnBotonCrear = document.getElementById("btnBotonCrear");
const btnBotonLimpiar = document.getElementById("btnBotonLimpiar");
const sctFormNewEvent1 = document.getElementById("sctFormNewEvent1")
const mainContainer = document.getElementById("mainContainer")



// Validar que no haya campos vacíos
function validateEmptyFields() {
    let error = false;
    let ListInputsRequired = document.querySelectorAll("#formNewDenuncia [required]");
    for (let i = 0; i < ListInputsRequired.length; i++) {
        if (ListInputsRequired[i].value == "") {
            ListInputsRequired[i].classList.add('error');
            error = true;
        } else {
            ListInputsRequired[i].classList.remove('error');
        }
    }
    return error;
}


// Limpiar los campos del formulario de denuncia
function limpiarCamposDenuncia() {
    inputNameReport.value = "";
    inputDateReport.value = "";
    inputCategoryReport.value = "";
    inputPlaceReport.value = "";
    inputDescriptionReport.value = "";
}

// Crear una denuncia
async function Guardar_Denuncia_Creada() {
    let errorCamposVacios = validateEmptyFields();

    if (errorCamposVacios) {
        Swal.fire({
            title: "Campos vacíos",
            text: "Revisa los campos marcados en rojo",
            icon: "warning"
        });
    } else {
        let nombre = inputNameReport.value;
        let fechayhora = inputDateReport.value;
        let categoria = inputCategoryReport.value;
        let lugar = inputPlaceReport.value;
        let descripcion = inputDescriptionReport.value;
        const userId = localStorage.getItem("id_mongo"); 

        const imagenFile = document.getElementById("inputImagen").files[0];
        const archivoFile = document.getElementById("inputArchivo").files[0];

        if (imagenFile && !imagenFile.type.startsWith("image/")) {
            Swal.fire({
                title: "Error",
                text: "El archivo de imagen no es válido.",
                icon: "error"
            });
            return;
        }

        // Validar el tamaño del archivo de imagen
        if (imagenFile && imagenFile.size > 10 * 1024 * 1024) {  // Limitar tamaño de archivo a 10MB
            Swal.fire({
                title: "Error",
                text: "El archivo de imagen es demasiado grande. Debe ser menor de 10MB.",
                icon: "error"
            });
            return;
        }

        // Validar el tamaño del archivo genérico
        if (archivoFile && archivoFile.size > 10 * 1024 * 1024) {  // Limitar tamaño de archivo a 10MB
            Swal.fire({
                title: "Error",
                text: "El archivo es demasiado grande. Debe ser menor de 10MB.",
                icon: "error"
            });
            return;
        }


        let imagenUrl = "";
        let archivoUrl = "";

        if (imagenFile) {
            imagenUrl = await subirArchivoCloudinary(imagenFile, "imagen"); 
        }
        
        if (archivoFile) {
            archivoUrl = await subirArchivoCloudinary(archivoFile, "raw");
        }

        // Crear la denuncia
        crear_denuncia(nombre, fechayhora, categoria, lugar, descripcion, 'pendiente', userId, imagenUrl, archivoUrl);
        limpiarCamposDenuncia();
    }
}




// Lógica de visibilidad de opciones según el tipo de usuario para las denuncias
document.addEventListener("DOMContentLoaded", function () {
    const tipoUsuario = localStorage.getItem("rolLogIn"); 
    const adminItemHeader = document.getElementById("adminNavItemHeader");
    const adminItemFooter = document.getElementById("adminNavItemFooter");
    const crearDenuncia = document.getElementById("crearDenuncia");
    const botonPublicar = document.getElementById("btnBotonPublicar");
    const loginBtn = document.getElementById("loginBtn")
    
    console.log(tipoUsuario)
    
    if (tipoUsuario !== "administrador") {
        if (adminItemHeader) {
            adminItemHeader.style.display = "none";
        }
    }

    if (tipoUsuario !== "administrador") {
        if (adminItemFooter) {
            adminItemFooter.style.display = "none";
        }
    }

    if (tipoUsuario == "vecino") {
        if (crearDenuncia) {
            crearDenuncia.style.display = "none";
        }
    }

    
    if (tipoUsuario) {
        if (loginBtn) {
            loginBtn.style.display = "none";
        }
    }




    const estadoConcejal = localStorage.getItem("estadoConcejal"); 
    const btnVerUsuarios = document.getElementById("btnVerUsuarios")


    if (!tipoUsuario) {
        if (sctFormNewEvent1) {
            sctFormNewEvent1.style.display = "none";
        }
    }

    if (!tipoUsuario) {
        if (mainContainer) {
            mainContainer.style.display = "none";
        }
    }


    

    


    if (tipoUsuario == "vecino") {
        if (btnVerUsuarios) {
            btnVerUsuarios.style.display = "none";
        }
    }
    

    if (tipoUsuario == "concejal") {
        if (botonPublicar) {
            botonPublicar.style.display = "none";
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
  
      if (tipoUsuario == "concejal" && estadoConcejal !== "aprobado") {
        if (btnVerUsuarios) {
            btnVerUsuarios.style.display = "none";
        }
      }
});

// Eventos de los botones para crear y publicar denuncias
btnBotonCrear.addEventListener("click", Guardar_Denuncia_Creada);
btnBotonLimpiar.addEventListener("click", function () {
    limpiarCamposDenuncia();
});


// ==========================
// HISTORIAL DE DENUNCIAS
// ==========================

let reports = []

const showReports=async()=>{

    const userId = localStorage.getItem("id_mongo")
    console.log(userId)

    reports =  await listar_denuncias_BD_Users(userId);


    reports.sort((a, b) => new Date(a.fechayhora) - new Date(b.fechayhora));

    const reportsContainer = document.getElementById('reportsContainer');

    for(let i=0;i<reports.length;i++){
        const reportCard = document.createElement('div');
        reportCard.classList.add('reportCard');
        
        reportCard.innerHTML = `
            <div class="reportHeader"> ${reports[i]['nombre']}</div>
            <div class="reportDetail"><strong>Fecha y Hora:</strong> ${reports[i]['fechayhora']}</div>
            <div class="reportDetail"><strong>Categoría:</strong>  ${reports[i]['categoria']}</div>
            <div class="reportDetail"><strong>Lugar:</strong> ${reports[i]['lugar']}</div>
            <div class="reportDetail"><strong>Descripción:</strong> ${reports[i]['descripcion']}</div>
            <div class="reportDetail"><strong>Estado:</strong> ${reports[i]['estado']}</div>
        `;

        reportsContainer.appendChild(reportCard);
    };
}

const showReportsAdmin=async()=>{

    reports =  await listar_denuncias_BD();


    reports.sort((a, b) => new Date(a.fechayhora) - new Date(b.fechayhora));

    const reportsContainer = document.getElementById('reportsContainer');

    for(let i=0;i<reports.length;i++){
        const reportCard = document.createElement('div');
        reportCard.classList.add('reportCard');
        
        reportCard.innerHTML = `
            <div class="reportHeader"> ${reports[i]['nombre']}</div>
            <div class="reportDetail"><strong>Fecha y Hora:</strong> ${reports[i]['fechayhora']}</div>
            <div class="reportDetail"><strong>Categoría:</strong>  ${reports[i]['categoria']}</div>
            <div class="reportDetail"><strong>Lugar:</strong> ${reports[i]['lugar']}</div>
            <div class="reportDetail"><strong>Descripción:</strong> ${reports[i]['descripcion']}</div>
            <div class="reportDetail"><strong>Estado:</strong> ${reports[i]['estado']}</div>
        `;

        reportsContainer.appendChild(reportCard);
    };
}



// Al cargar la página, mostramos las denuncias
window.onload = function () {
    const rol = localStorage.getItem("rolLogIn")

     if (rol=="administrador"){
        showReportsAdmin()
    }else{
        showReports();
    } 
    
};


// Cuando se carga la página, ejecutamos la función
document.addEventListener("DOMContentLoaded", function () {
    // Obtener el tipo de usuario desde el almacenamiento local
    const tipoUsuario = localStorage.getItem("rolLogIn"); 
    const adminItemHeader = document.getElementById("adminNavItemHeader");
    const adminItemFooter = document.getElementById("adminNavItemFooter");
    const crearDenuncia = document.getElementById("crearDenuncia");
    const crearAviso = document.getElementById("crearAviso");
    const crearNoticia = document.getElementById("crearNoticia");
    const dropdowns = document.querySelectorAll(".dropdown");

    // Mostrar por consola el tipo de usuario para verificar
    console.log(tipoUsuario)

    if (!tipoUsuario) {
        dropdowns.forEach((dropdown) => {
          dropdown.style.display = "none";
        })
    }

    // Ocultar la opción de ADMINISTRADOR si no es un administrador
    if (tipoUsuario !== "administrador") {
        if (adminItemHeader) {
            adminItemHeader.style.display = "none";
        }
    }

    // Ocultar la opción de ADMINISTRADOR en el pie de página si no es administrador
    if (tipoUsuario !== "administrador") {
        if (adminItemFooter) {
            adminItemFooter.style.display = "none";
        }
    }

    // Ocultar el botón de "Crear Denuncia" si el usuario es un "vecino"
    if (tipoUsuario == "vecino") {
        if (crearDenuncia) {
            crearDenuncia.style.display = "none";
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


