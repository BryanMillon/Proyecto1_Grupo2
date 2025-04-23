document.addEventListener("DOMContentLoaded", function () {
    const categoria = document.getElementById("categoria");
    const distrito = document.getElementById("distrito");
    const descripcion = document.getElementById("descripcion");
    const submitButton = document.getElementById("submitButton");
    const cancelButton = document.getElementById("cancelButton");

    // Limpia los campos y errores visuales
    function limpiarFormulario() {
        categoria.value = "";
        distrito.value = "";
        descripcion.value = "";
        [categoria, distrito, descripcion].forEach(input => input.classList.remove("error"));
    }

    // Valida si hay campos vacíos
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

    // Cancelar formulario
    cancelButton.addEventListener("click", function () {
        limpiarFormulario();
    });

    // Enviar formulario
    submitButton.addEventListener("click", async function () {
        if (validarCamposVacios()) {
            Swal.fire("Campos Vacíos", "Por favor, complete todos los campos antes de enviar.", "warning");
            return;
        }

        // Obtener usuarioId del localStorage (debe estar guardado al iniciar sesión)
        const usuarioId = localStorage.getItem("usuarioId");

        if (!usuarioId) {
            Swal.fire("Error de sesión", "Debe iniciar sesión para enviar una iniciativa.", "error");
            return;
        }

        // Crear el objeto de datos a enviar
        const data = {
            usuarioId,
            categoria: categoria.value,
            descripcion: descripcion.value,
            distritos: [distrito.value] // si usás selección múltiple, se puede expandir
        };

        try {
            const response = await fetch("http://localhost:3000/iniciativas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                Swal.fire("Iniciativa Enviada", "Su iniciativa ha sido registrada con éxito.", "success");
                limpiarFormulario();
            } else {
                Swal.fire("Error", "Ocurrió un problema al enviar la iniciativa.", "error");
            }

        } catch (error) {
            console.error("Error al enviar la iniciativa:", error);
            Swal.fire("Error", "Fallo en la conexión con el servidor.", "error");
        }
    });
});