import { cambiarPassword } from "../services/servicePasswordReset.js";

const inputEmail = document.getElementById("email");
const inputCode = document.getElementById("code");
const inputPassword = document.getElementById("password");
const btnVerification = document.getElementById("btnVerification");

function InputsValidation() {
    let error = false;
    let list = document.querySelectorAll("#form [required]");

    for (let i = 0; i < list.length; i++) {
        if (list[i].value.trim() === '') {
            list[i].classList.add("error");
            error = true;
        } else {
            list[i].classList.remove("error");
        }
    }
    return error;
}

function emailValidation() {
    let error = false;
    let userText = inputEmail.value.trim();
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(userText)) {
        inputEmail.classList.add("error");
        error = true;
    } else {
        inputEmail.classList.remove("error");
    }

    return error;
}

function passwordValidation() {
    let error = false;
    let password = inputPassword.value;
    // Al menos 8 caracteres, una mayúscula, una minúscula y un número
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!regex.test(password)) {
        inputPassword.classList.add("error");
        inputPassword.value = "";
        error = true;
    } else {
        inputPassword.classList.remove("error");
    }
    return error;
}

function cleanInputs() {
    inputEmail.value = "";
    inputCode.value = "";
    inputPassword.value = "";
}

async function sendVerificationData() {
    let isInputsValidationError = InputsValidation();
    let isEmailValidationError = emailValidation();
    let isPasswordValidationError = passwordValidation();

    if (isInputsValidationError) {
        Swal.fire({
            title: "Campos vacíos",
            text: "Revisa los campos marcados",
            icon: "warning"
        });
        return;
    }

    if (isEmailValidationError) {
        Swal.fire({
            title: "Correo inválido",
            text: "Ingresa un correo válido. El formato debe ser user@email.com",
            icon: "warning"
        });
        return;
    }

    if (isPasswordValidationError) {
        Swal.fire({
            title: "Contraseña inválida",
            text: "La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número.",
            icon: "warning"
        });
        return;
    }

    try {
        const data = await cambiarPassword(
            inputEmail.value.trim(),
            inputCode.value.trim(),
            inputPassword.value
        );

        Swal.fire({
            title: "Éxito",
            text: data.msg,
            icon: "success"
        });

        cleanInputs();
        setTimeout(() => {
            window.location.href = "../pages/LoginPage.html";
        }, 2000); 

    } catch (err) {
        Swal.fire({
            title: "Error",
            text: err,
            icon: "error"
        });
    }
}

btnVerification.addEventListener("click", sendVerificationData);
