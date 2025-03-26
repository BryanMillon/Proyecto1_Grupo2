
const inputNombre = document.getElementById("nombre");
const inputApellido1 = document.getElementById("apellido1");
const inputApellido2 = document.getElementById("apellido2");
const inputCedula = document.getElementById("cedula");
const selectUser = document.getElementById("user");
const selectDistrict = document.getElementById("districts");
const inputDireccion = document.getElementById("direccion");
const inputTelefono = document.getElementById("telefono");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const inputPasswordVerification = document.getElementById("passwordVerification");
const btnSignup = document.getElementById("btnSignup");
const fileInput = document.getElementById("file-input");


function inputsValidation() {
    let error = false;
    let list = document.querySelectorAll("#form [required]");

    for (let i = 0; i < list.length; i++) {
        if (list[i].value.trim === '') {
            list[i].classList.add("error");
            list[i].value = "";
            error = true;
        } else {
            list[i].classList.remove("error");
        }
    }
    return error;
}


function emailValidation() {
    let error = false;
    let userText = inputEmail.value.trim;
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!regex.test(userText)) {
        inputEmail.classList.add("error");
        inputEmail.value = "";
        error = true;
    } else {
        inputEmail.classList.remove("error");
    }
    return error;
}


function cedulaValidation() {
    let error = false;
    let cedula = inputCedula.value.trim();
    // Validar 9 dígitos para cédula física
    let regex = /^[1-9]-?\d{4}-?\d{4}$|^\d{9}$/;
    
    if (!regex.test(cedula)) {
        inputCedula.classList.add("error");
        inputCedula.value = ""; 
        error = true;
    } else {
        inputCedula.classList.remove("error");
    }
    return error;
}


function telefonoValidation() {
    let error = false;
    let telefono = inputTelefono.value.trim();
    // Formato para teléfonos de Costa Rica (8 dígitos)
    let regex = /^[2-8]\d{3}-?\d{4}$|^\d{8}$/;
    
    if (!regex.test(telefono)) {
        inputTelefono.classList.add("error");
        inputTelefono.value = "";
        error = true;
    } else {
        inputTelefono.classList.remove("error");
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


function passwordMatchValidation() {
    let error = false;
    
    if (inputPassword.value !== inputPasswordVerification.value) {
        inputPasswordVerification.classList.add("error");
        inputPasswordVerification.value = "";
        error = true;
    } else {
        inputPasswordVerification.classList.remove("error");
    }
    return error;
}


function nameValidation() {
    let error = false;
    let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    
    if (!regex.test(inputNombre.value)) {
        inputNombre.classList.add("error");
        inputNombre.value = "";
        error = true;
    } else {
        inputNombre.classList.remove("error");
    }
    
    if (!regex.test(inputApellido1.value)) {
        inputApellido1.classList.add("error");
        inputApellido1.value = "";
        error = true;
    } else {
        inputApellido1.classList.remove("error");
    }
    
    if (!regex.test(inputApellido2.value)) {
        inputApellido2.classList.add("error");
        inputApellido2.value = "";
        error = true;
    } else {
        inputApellido2.classList.remove("error");
    }
    
    return error;
}

// Validación de tamaño de archivos (solo si se sube una imagen)
function fileValidation() {
    let error = false;
    
    if (fileInput.files.length > 0) {
        const fileSize = fileInput.files[0].size; // en bytes
        const maxSize = 5 * 1024 * 1024; // 5MB
        
        if (fileSize > maxSize) {
            error = true;
        }
    }
    
    return error;
}


function cleanInputs() {
    inputNombre.value = "";
    inputApellido1.value = "";
    inputApellido2.value = "";
    inputCedula.value = "";
    selectUser.selectedIndex = 0;
    selectDistrict.selectedIndex = 0;
    inputDireccion.value = "";
    inputTelefono.value = "";
    inputEmail.value = "";
    inputPassword.value = "";
    inputPasswordVerification.value = "";
    document.getElementById("preview").src = "../IMG/Perfil-logo.svg";
    fileInput.value = "";
}


function sendData() {
    const isEmptyFields = inputsValidation();
    const isEmailInvalid = emailValidation();
    const isCedulaInvalid = cedulaValidation();
    const isTelefonoInvalid = telefonoValidation();
    const isPasswordInvalid = passwordValidation();
    const isPasswordMismatch = passwordMatchValidation();
    const isNameInvalid = nameValidation();
    const isFileInvalid = fileValidation();
    
  
    if (isEmptyFields) {
        Swal.fire({
            title: "Campos vacíos",
            text: "Por favor completa todos los campos requeridos",
            icon: "warning"
        });
    } else if (isNameInvalid) {
        Swal.fire({
            title: "Nombres inválidos",
            text: "El nombre y apellidos solo deben contener letras",
            icon: "warning"
        });
    } else if (isCedulaInvalid) {
        Swal.fire({
            title: "Cédula inválida",
            text: "Ingresa un número de cédula válido",
            icon: "warning"
        });
    } else if (isTelefonoInvalid) {
        Swal.fire({
            title: "Teléfono inválido",
            text: "Ingresa un número de teléfono válido de 8 dígitos",
            icon: "warning"
        });
    } else if (isEmailInvalid) {
        Swal.fire({
            title: "Correo inválido",
            text: "Ingresa un correo electrónico válido (ejemplo@dominio.com)",
            icon: "warning"
        });
    } else if (isPasswordInvalid) {
        Swal.fire({
            title: "Contraseña inválida",
            text: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número",
            icon: "warning"
        });
    } else if (isPasswordMismatch) {
        Swal.fire({
            title: "Las contraseñas no coinciden",
            text: "Verifica que ambas contraseñas sean iguales",
            icon: "warning"
        });
    } else if (isFileInvalid) {
        Swal.fire({
            title: "Archivo inválido",
            text: "La imagen de perfil debe ser menor a 5MB",
            icon: "warning"
        });
    } else {
        Swal.fire({
            title: "Registro exitoso",
            text: "Te hemos enviado un correo de verificación",
            icon: "success"
        }).then((result) => {
            if (result.isConfirmed) {
                cleanInputs();
                window.location.href = "../HTML/AccountVerificationPage.html";
            }
        });
    }
}

// Evento para previsualización de imagen
fileInput.addEventListener("change", function() {
    const preview = document.getElementById("preview");
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// Evento para el botón de registro
btnSignup.addEventListener("click", sendData);
