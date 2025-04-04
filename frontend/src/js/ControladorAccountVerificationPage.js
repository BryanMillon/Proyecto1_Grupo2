const btnVerification = document.getElementById("btnVerification");

function InputsValidation() {
    let error = false;
    let list = document.querySelectorAll("#form [required]");

    for (let i = 0; i < list.length; i++) {
        if (list[i].value == '') {
            list[i].classList.add("error"); // Añadir la clase error
            error = true;
        } else {
            list[i].classList.remove("error"); // Eliminar la clase error si el campo está lleno
        }
    }
    return error;
}



function cleanInputs() {
    inputEmail.value = "";
}

function sendData() {
    let isInputsValidationError = InputsValidation();

    if (isInputsValidationError) {
        Swal.fire({
            title: "Campos vacíos",
            text: "Revisa los campos marcados",
            icon: "warning"
        });
    } else {
        Swal.fire({
            title: "Éxito",
            text: "Tus datos se han enviado correctamente.",
            icon: "success"
        });
        cleanInputs();
    }
}

btnVerification.addEventListener("click", sendData);
