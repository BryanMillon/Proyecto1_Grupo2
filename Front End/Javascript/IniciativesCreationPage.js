document.addEventListener("DOMContentLoaded", function () {
    const categoria = document.getElementById("categoria");
    const distrito = document.getElementById("distrito");
    const descripcion = document.getElementById("descripcion");
    const submitButton = document.getElementById("submitButton");
    const cancelButton = document.getElementById("cancelButton");

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

    submitButton.addEventListener("click", function () {
        if (validarCamposVacios()) {
            Swal.fire("Campos Vacíos", "Por favor, complete todos los campos antes de enviar.", "warning");
        } else {
            Swal.fire("Iniciativa Enviada", "Su iniciativa ha sido registrada con éxito.", "success");
        }
    });

    cancelButton.addEventListener("click", function () {
        categoria.value = "";
        distrito.value = "";
        descripcion.value = "";
        [categoria, distrito, descripcion].forEach(input => input.classList.remove("error"));
    });
});