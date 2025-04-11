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

const btnUploadImg = document.getElementById("btnUploadImg"); 
const previewImg = document.getElementById("preview");


let imagenURL = "";


let widget_cloudinary = initCloudinaryWidget(previewImg, (url) => {
    imagenURL = url; 
});


btnUploadImg.addEventListener('click', () => {
    widget_cloudinary.open();
}, false);

function inputsValidation() {
    let error = false;
    let list = document.querySelectorAll("#form [required]");

    for (let i = 0; i < list.length; i++) {
        const element = list[i];


        if ((element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') && element.value.trim() === '') {
            element.classList.add("error");
            element.value = "";
            error = true;
        } 
        else if (element.tagName === 'SELECT' && element.value === '') {
            element.classList.add("error");
            error = true;
        } else {
            element.classList.remove("error");
        }
    }
    return error;
}

function emailValidation() {
    let error = false;
    let userText = inputEmail.value;
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(userText) == false) {
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
    document.getElementById("preview").src = "../../public/images/Perfil-logo.svg";
    imagenURL = ""; 
}

async function sendData() {
    const isEmptyFields = inputsValidation();
    const isEmailInvalid = emailValidation();
    const isCedulaInvalid = cedulaValidation();
    const isTelefonoInvalid = telefonoValidation();
    const isPasswordInvalid = passwordValidation();
    const isPasswordMismatch = passwordMatchValidation();
    const isNameInvalid = nameValidation();
    
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
    } else {
        const userData = {
            nombre: inputNombre.value,
            apellido1: inputApellido1.value,
            apellido2: inputApellido2.value,
            cedula: inputCedula.value,
            userType: selectUser.value,
            distrito: selectDistrict.value,
            direccion: inputDireccion.value,
            telefono: inputTelefono.value,
            email: inputEmail.value,
            password: inputPassword.value,
            imageUrl: imagenURL 
        };
       

        try {
            
            const result = await registerUser(
                userData.nombre, 
                userData.apellido1, 
                userData.apellido2, 
                userData.cedula, 
                userData.userType, 
                userData.distrito, 
                userData.direccion, 
                userData.telefono, 
                userData.email, 
                userData.password, 
                userData.imageUrl
            );
            
       
            if (result && result.success) {
                cleanInputs();
            } else if (result.error === 'cedula_duplicada') {
                Swal.fire({
                    title: "Cédula duplicada",
                    text: "La cédula ingresada ya se encuentra registrada.",
                    icon: "warning"
                });
            } else if (result.error === 'email_duplicado') {
                Swal.fire({
                    title: "Correo duplicado",
                    text: "El correo electrónico ya se encuentra registrado.",
                    icon: "warning"
                });
            } else {
                Swal.fire({
                    title: "Error en el registro",
                    text: "Ocurrió un error inesperado. Por favor intenta de nuevo.",
                    icon: "error"
                });
            }
            
        } catch (error) {
            console.error("Error en el proceso de registro:", error);

            Swal.fire({
                title: "Error en el registro",
                text: "Ocurrió un error inesperado. Por favor intenta de nuevo.",
                icon: "error"
            });
        }
    }
}

// Evento para el botón de registro
btnSignup.addEventListener("click", sendData);