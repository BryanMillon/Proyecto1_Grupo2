const btnVerification = document.getElementById("btnVerification");
const emailOrIdInput = document.getElementById("emailOrId");
const codeInput = document.getElementById("code");

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
    emailOrIdInput.value = "";
    codeInput.value="";
}

async function sendData() {
    let isInputsValidationError = InputsValidation();

    if (isInputsValidationError) {
        Swal.fire({
            title: "Campos vacíos",
            text: "Revisa los campos marcados",
            icon: "warning"
        });
    } else {
        const emailOrId = emailOrIdInput.value;
        const code = codeInput.value;

       
        const response = await authenticateUser(emailOrId, code);

        if (response.success) {
           
            await Swal.fire({
                title: "Verificación exitosa",
                text: "El correo o la cédula han sido verificados con éxito.",
                icon: "success"
            });

            setTimeout(() => {
                window.location.href = "../pages/loginPage.html";  
            }, 1500);
        } else {
            // Si ocurrió algún error
            await Swal.fire({
                title: "Error de verificación",
                text: response.error === 'usuario_no_encontrado' 
                    ? "El correo o cédula no están registrados." 
                    : response.error === 'password_incorrecta'
                    ? "El código es incorrecto."
                    : "Hubo un problema al verificar los datos.",
                icon: "error"
            });
        }
        cleanInputs();
    }
}


btnVerification.addEventListener("click", sendData);
