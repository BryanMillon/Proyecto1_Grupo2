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
