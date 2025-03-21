document.addEventListener("DOMContentLoaded", function () {
    const editButton = document.querySelector(".edit-bottom .edit-link");
    const saveButton = document.getElementById("saveButton");
    const cancelButton = document.getElementById("cancelButton");
    const inputs = document.querySelectorAll(".profile-details input");

    let valoresOriginales = {};

    // Habilitar edición al hacer clic en "Editar"
    editButton.addEventListener("click", function (e) {
        e.preventDefault();
        inputs.forEach(input => {
            valoresOriginales[input.placeholder] = input.value;
            input.removeAttribute("disabled");
        });

        saveButton.style.display = "inline-block";
        cancelButton.style.display = "inline-block";
    });

    // Función para restaurar valores originales al cancelar
    cancelButton.addEventListener("click", function () {
        inputs.forEach(input => {
            input.value = valoresOriginales[input.placeholder];
            input.setAttribute("disabled", "true");
        });

        saveButton.style.display = "none";
        cancelButton.style.display = "none";
    });

    function validarCamposVacios() {
        let error = false;
        inputs.forEach(input => {
            if (input.value.trim() === "") {
                input.classList.add("error");
                error = true;
            } else {
                input.classList.remove("error");
            }
        });
        return error;
    }

    function validarTexto(input) {
        let regex = /^[a-zA-Z\s]+$/;
        return !regex.test(input.value);
    }

    function validarTelefono() {
        let regex = /^[0-9]{8}$/;
        const telefonoInput = document.querySelector('input[placeholder="Teléfono"]');
        return !regex.test(telefonoInput.value);
    }

    function validarCorreo() {
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const emailInput = document.querySelector('input[placeholder="Correo"]');
        return !regex.test(emailInput.value);
    }

    saveButton.addEventListener("click", function () {
        let errores = {
            vacios: validarCamposVacios(),
            nombre: validarTexto(document.querySelector('input[placeholder="Nombre"]')),
            apellidos: validarTexto(document.querySelector('input[placeholder="Apellidos"]')),
            telefono: validarTelefono(),
            correo: validarCorreo(),
        };

        if (errores.vacios) {
            Swal.fire("Campos Vacíos", "Completa todos los campos antes de guardar.", "warning");
        } else if (errores.nombre) {
            Swal.fire("Error en Nombre", "Solo se permiten letras.", "error");
        } else if (errores.apellidos) {
            Swal.fire("Error en Apellidos", "Solo se permiten letras.", "error");
        } else if (errores.telefono) {
            Swal.fire("Error en Teléfono", "Debe contener 8 dígitos numéricos.", "error");
        } else if (errores.correo) {
            Swal.fire("Error en Correo", "Formato de correo electrónico inválido.", "error");
        } else {
            Swal.fire("Perfil Actualizado", "Tu información ha sido guardada exitosamente.", "success");
            inputs.forEach(input => input.setAttribute("disabled", "true"));
            saveButton.style.display = "none";
            cancelButton.style.display = "none";
        }
    });
});