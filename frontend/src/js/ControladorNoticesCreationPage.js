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
    const tipoUsuario = localStorage.getItem("rolLogIn");

    const adminItemHeader = document.getElementById("adminNavItemHeader");
    const adminItemFooter = document.getElementById("adminNavItemFooter");
    const crearAviso = document.getElementById("crearAviso");
    const crearNoticia = document.getElementById("crearNoticia");

    const btnCancelar = document.getElementById("btnBotonLimpiar");
    const btnCrear = document.getElementById("btnBotonCrear");
    const btnPublicar = document.getElementById("btnBotonPublicar");

    console.log(tipoUsuario);

    // Ocultar menús si no es administrador
    if (tipoUsuario !== "administrador") {
        if (adminItemHeader) adminItemHeader.style.display = "none";
        if (adminItemFooter) adminItemFooter.style.display = "none";
    }

    // Ocultar elementos para vecino
    if (tipoUsuario === "vecino") {
        if (crearAviso) crearAviso.style.display = "none";
        if (crearNoticia) crearNoticia.style.display = "none";

        // Ocultar botones
        if (btnCancelar) btnCancelar.style.display = "none";
        if (btnCrear) btnCrear.style.display = "none";
        if (btnPublicar) btnPublicar.style.display = "none";

        Swal.fire({
            icon: "error",
            title: "Acceso restringido",
            text: "No tienes permisos para crear ni publicar avisos"
        }).then(() => {
            window.location.href = "../pages/HomePage.html";
        });

        return; 
    }

    // Si es concejal ocultar solo el botón Publicar
    if (tipoUsuario === "concejal") {
        if (btnPublicar) btnPublicar.style.display = "none";
    }

    // Si no hay rol también redirigir por seguridad
    if (!tipoUsuario) {
        window.location.href = "../pages/LoginPage.html";
    }
});



