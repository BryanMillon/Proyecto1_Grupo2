// Referencias a elementos del formulario de login tradicional
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const btnLogIn = document.getElementById("btnLogIn");

// Referencia al botón de Google (asumiendo que ya está en el HTML)
const btnGoogleLogin = document.getElementById("google-login-btn");

// Validación de campos requeridos
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

// Validación de formato de email
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

// Limpiar campos del formulario
function cleanInputs() {
    if (inputEmail) inputEmail.value = "";
    if (inputPassword) inputPassword.value = "";
}

// Enviar datos del formulario tradicional
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
        LoginUser(inputEmail.value, inputPassword.value)
        .then(result => {
            if (result.success && result.authenticated) {
                // Guardar la información del usuario en localStorage
                localStorage.setItem('user', JSON.stringify(result.user));
                
                // Redirigir al HomePage
                window.location.href = '../pages/HomePage.html';
            }
        });
    }
}

// Verificar estado de autenticación (funciona para ambos métodos de login)
function verifyAuthStatus() {
    console.log("Verificando estado de autenticación...");
    checkAuthStatus()
        .then(result => {
            console.log("Respuesta recibida:", res);  // 
            if (result.success) {
                if (!result.authenticated) {
                    // Si no está autenticado y estamos en una página protegida,
                    // redirigir al login
                    if (!window.location.href.includes('LoginPage.html') && 
                        !window.location.href.includes('SignUpPage.html') &&
                        !window.location.href.includes('NoticesPage.html')) {
                        
                        Swal.fire({
                            title: "Acceso denegado",
                            text: "Debes iniciar sesión primero",
                            icon: "warning"
                        });
                        
                        setTimeout(() => {
                            window.location.href = '../pages/LoginPage.html';
                        }, 1500);
                    }
                } else {
                    // Si está autenticado y estamos en la página de login,
                    // redirigir al dashboard
                    if (window.location.href.includes('LoginPage.html')) {
                        window.location.href = '../pages/HomePage.html';
                    }
                    
                    // Si tenemos un elemento para mostrar información del usuario,
                    // actualizarlo
                    const userInfoElement = document.getElementById('user-info');
                    if (userInfoElement) {
                        userInfoElement.innerHTML = `
                            <div class="user-info-container">
                                <p>Bienvenido, ${result.user.nombre} ${result.user.apellido1}</p>
                                <p>Email: ${result.user.email}</p>
                                <p>Rol: ${result.user.rol}</p>
                                <button id="btnLogOut" class="btn-primary">Cerrar sesión</button>
                            </div>
                        `;
                        
                        // Agregar evento al botón de logout
                        const btnLogOut = document.getElementById('btnLogOut');
                        if (btnLogOut) {
                            btnLogOut.addEventListener('click', handleLogout);
                        }
                    }
                }
            }
        });
}

// Función para manejar el clic en el botón de Google
function handleGoogleLogin(event) {
    event.preventDefault();
    loginWithGoogle()
    .then(result => {
        if (result.success && result.authenticated) {
            // Guardar la información del usuario en localStorage
            localStorage.setItem('user', JSON.stringify(result.user));
            
           
            window.location.href = './pages/HomePage.html';  
        }
    });
}

// Función para manejar el logout
function handleLogout() {
    logoutUser();
}

// Verificar si estamos en una página que requiere autenticación
if (window.location.href.includes('Dashboard.html') || 
    window.location.href.includes('Profile.html') ||
    window.location.href.includes('Admin.html') ||
    window.location.href.includes('NoticesPage.html')) {
    // Verificar estado de autenticación en páginas protegidas
    verifyAuthStatus();
}

// Si estamos en LoginPage.html, verificar si ya está autenticado
if (window.location.href.includes('LoginPage.html')) {
    verifyAuthStatus();
}

// Agregar eventos a los botones
if (btnLogIn) {
    btnLogIn.addEventListener("click", sendData);
}

if (btnGoogleLogin) {
    btnGoogleLogin.addEventListener("click", handleGoogleLogin);
}

