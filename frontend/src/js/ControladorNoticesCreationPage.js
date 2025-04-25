setTimeout(verificarSesion, 3000) 
//Get all references to the DOM to the Form
const inputNameEvent = document.getElementById("textNombreAviso");
const inputDateEvent = document.getElementById("dateTimePicker");
const inputCategoryEvent= document.getElementById("eventCategory");
const inputPlaceEvent = document.getElementById("textPlace");
const inputDescriptionEvent = document.getElementById("textDescription");

//Validate that there are no empty fields
function validateEmphyFields() {
    let error = false;
    let ListInputsRequired = document.querySelectorAll("#formNewEvent [required]");
    for(let i=0; i<ListInputsRequired.length;i++){
        if(ListInputsRequired[i].value == ""){
            ListInputsRequired[i].classList.add('error');
            error=true;
        }else{
            ListInputsRequired[i].classList.remove('error');
        }
    }
    return error;
}



//limpiar campos del formulario
function limpiarCampos(){
    textNombreAviso.value = "";
    dateTimePicker.value = "";
    eventCategory.value = "";
    textPlace.value = "";
    textDescription.value = "";
}

function Guardar_Aviso_Creado(){
    let errorCamposVacios = validateEmphyFields();

    if(errorCamposVacios){
        Swal.fire({
            title: "Campos vacios",
            text: "Revisa los campos marcados en rojo",
            icon: "warning"
          });
    }else{

        let nombre= inputNameEvent.value;
        let dateTimePicker= inputDateEvent.value;
        let eventCategory= inputCategoryEvent .value;
        let textPlace= inputPlaceEvent.value;
        let textDescription= inputDescriptionEvent.value;

        crear_aviso(nombre, dateTimePicker,eventCategory, textPlace, textDescription, 'pendiente')
        limpiarCampos()

    }
}

function Publicar_Aviso_Creado(){
    let errorCamposVacios = validateEmphyFields();

    if(errorCamposVacios){
        Swal.fire({
            title: "Campos vacios",
            text: "Revisa los campos marcados en rojo",
            icon: "warning"
          });
    }else{

        let nombre= inputNameEvent.value;
        let dateTimePicker= inputDateEvent.value;
        let eventCategory= inputCategoryEvent .value;
        let textPlace= inputPlaceEvent.value;
        let textDescription= inputDescriptionEvent.value;

        crear_aviso(nombre, dateTimePicker,eventCategory, textPlace, textDescription, 'publicado')
        limpiarCampos()
    }
}



btnBotonPublicar.addEventListener("click",Publicar_Aviso_Creado);
btnBotonCrear.addEventListener("click",Guardar_Aviso_Creado);

btnBotonLimpiar.addEventListener("click", function () {
    limpiarCampos()
});


document.addEventListener("DOMContentLoaded", function () {
    // Supongamos que el tipo de usuario está almacenado así:
    const tipoUsuario = localStorage.getItem("rolLogIn"); 
    const adminItemHeader = document.getElementById("adminNavItemHeader");
    const adminItemFooter = document.getElementById("adminNavItemFooter");
    const crearAviso = document.getElementById("crearAviso");
    const crearNoticia = document.getElementById("crearNoticia");
    const botonPublicar = document.getElementById("btnBotonPublicar");


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

    if (tipoUsuario == "concejal") {
        if (botonPublicar) {
            botonPublicar.style.display = "none";
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


