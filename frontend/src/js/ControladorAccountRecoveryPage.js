const inputEmail = document.getElementById("email");
const btnRecovery = document.getElementById("btnRecovery");
import { solicitarCodigoVerificacion } from "../services/servicePasswordReset.js";

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

async function sendData() {
    let isInputsValidationError = InputsValidation();
    let isEmailValidationError = emailValidation();

    if (isInputsValidationError) {
        return Swal.fire({
            title: "Campos vacíos",
            text: "Revisa los campos marcados",
            icon: "warning"
        });
    }

    if (isEmailValidationError) {
        return Swal.fire({
            title: "Error en el correo",
            text: "Ingresa un correo válido. El formato debe ser user@email.com",
            icon: "warning"
        });
    }

    // ✅ Si las validaciones pasan, se hace la petición al backend
    const email = inputEmail.value.trim();
    const result = await solicitarCodigoVerificacion(email);

    if (result.success) {
        Swal.fire({
            title: "¡Éxito!",
            text: result.data.msg,
            icon: "success"
        });
        cleanInputs();
        setTimeout(() => {
            window.location.href = "../pages/PasswordResetPage.html";
        }, 3000); 
    } else {
        Swal.fire({
            title: "Error",
            text: result.data.msg,
            icon: "error"
        });
    }
}

btnRecovery.addEventListener("click", sendData);
