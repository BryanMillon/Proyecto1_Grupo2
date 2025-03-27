const inputEmail = document.getElementById("email");
const btnRecovery = document.getElementById("btnRecovery");

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

function emailValidation() {
    let error = false;
    let userText = inputEmail.value;
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(userText) == false) {
        inputEmail.classList.add("error"); // Añadir la clase error si el correo es inválido
        error = true;
    } else {
        inputEmail.classList.remove("error"); // Eliminar la clase error si el correo es válido
    }

    return error;
}

function cleanInputs() {
    inputEmail.value = "";
}

function sendData() {
    let isInputsValidationError = InputsValidation();
    let isEmailValidationError = emailValidation();

    if (isInputsValidationError) {
        Swal.fire({
            title: "Campos vacíos",
            text: "Revisa los campos marcados",
            icon: "warning"
        });
    } else if (isEmailValidationError) {
        Swal.fire({
            title: "Error en el correo",
            text: "Ingresa un correo válido. El formato debe ser user@email.com",
            icon: "warning"
        });
    } else {
        Swal.fire({
            title: "Éxito",
            text: "Tus datos se han enviado correctamente. Si tu correo se encuentra en nuestra base de datos, recibiras un correo con los pasos para recuperar tu contraseña",
            icon: "success"
        });
        cleanInputs();
    }
}

btnRecovery.addEventListener("click", sendData);
