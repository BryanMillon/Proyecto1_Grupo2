// Obtener referencias a los elementos del formulario
const inputTitle = document.getElementById("textNombreAviso");
const inputDate = document.getElementById("dateTimePicker");
const inputCategory = document.getElementById("eventCategory");
const inputPlace = document.getElementById("textPlace");
const inputDescription = document.getElementById("textDescription");
const archivo = document.getElementById("archivo");
const btnSubir = document.getElementById("btnSubir");
const btnSubmit = document.getElementById("btnBotonCrear");
const btnCancel = document.getElementById("btnBotonLimpiar");

// Función para validar que no haya campos vacíos
function validateEmptyFields() {
    let error = false;
    let requiredInputs = document.querySelectorAll("#formNewEvent [required]");
    
    requiredInputs.forEach(input => {
        if (input.value.trim() === "") {
            input.classList.add('error'); // Agregar clase de error si el campo está vacío
            error = true;
        } else {
            input.classList.remove('error'); // Quitar clase de error si el campo está lleno
        }
    });
    return error;
}

// Función para manejar el envío del formulario
function handleSubmit() {
    let hasErrors = validateEmptyFields();
    
    if (hasErrors) {
        Swal.fire({
            title: "Campos vacíos",
            text: "Revisa los campos marcados en rojo",
            icon: "warning"
        });
    } else {
        Swal.fire({
            title: "Éxito",
            text: "Su denuncia se ha enviado exitosamente",
            icon: "success"
        });
        // Aquí se puede agregar código para enviar los datos del formulario al servidor
    }
}



// Agregar eventos a los botones
btnSubmit.addEventListener("click", handleSubmit);

btnCancel.addEventListener("click", function () {
    textNombreAviso.value = "";
    dateTimePicker.value = "";
    eventCategory.value = "";
    textPlace.value = "";
    textDescription.value = "";
});

//Rutina para eliminar del header las acciones del Admin

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