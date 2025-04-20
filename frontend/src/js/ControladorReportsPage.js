// Obtener todas las referencias del DOM para el formulario de denuncias
const inputNameReport = document.getElementById("textNombreDenuncia");
const inputDateReport = document.getElementById("dateTimePickerDenuncia");
const inputCategoryReport = document.getElementById("reportCategory");
const inputPlaceReport = document.getElementById("textPlaceDenuncia");
const inputDescriptionReport = document.getElementById("textDescriptionDenuncia");

// Validar que no haya campos vacíos
function validateEmptyFields() {
    let error = false;
    let ListInputsRequired = document.querySelectorAll("#formNewDenuncia [required]");
    for (let i = 0; i < ListInputsRequired.length; i++) {
        if (ListInputsRequired[i].value == "") {
            ListInputsRequired[i].classList.add('error');
            error = true;
        } else {
            ListInputsRequired[i].classList.remove('error');
        }
    }
    return error;
}

// Limpiar los campos del formulario de denuncia
function limpiarCamposDenuncia() {
    inputNameReport.value = "";
    inputDateReport.value = "";
    inputCategoryReport.value = "";
    inputPlaceReport.value = "";
    inputDescriptionReport.value = "";
}

// Crear una denuncia
function Guardar_Denuncia_Creada() {
    let errorCamposVacios = validateEmptyFields();

    if (errorCamposVacios) {
        Swal.fire({
            title: "Campos vacíos",
            text: "Revisa los campos marcados en rojo",
            icon: "warning"
        });
    } else {
        let nombre = inputNameReport.value;
        let dateTime = inputDateReport.value;
        let categoria = inputCategoryReport.value;
        let lugar = inputPlaceReport.value;
        let descripcion = inputDescriptionReport.value;

        crear_denuncia(nombre, dateTime, categoria, lugar, descripcion, 'pendiente');
        limpiarCamposDenuncia();
    }
}

// Publicar una denuncia
function Publicar_Denuncia_Creada() {
    let errorCamposVacios = validateEmptyFields();

    if (errorCamposVacios) {
        Swal.fire({
            title: "Campos vacíos",
            text: "Revisa los campos marcados en rojo",
            icon: "warning"
        });
    } else {
        let nombre = inputNameReport.value;
        let dateTime = inputDateReport.value;
        let categoria = inputCategoryReport.value;
        let lugar = inputPlaceReport.value;
        let descripcion = inputDescriptionReport.value;

        crear_denuncia(nombre, dateTime, categoria, lugar, descripcion, 'publicado');
        limpiarCamposDenuncia();
    }
}

// Crear una denuncia en el servidor
function crear_denuncia(nombre, dateTime, categoria, lugar, descripcion, estado) {
    const newReport = {
        nombre: nombre,
        fechayhora: dateTime,
        categoria: categoria,
        lugar: lugar,
        descripcion: descripcion,
        estado: estado
    };

    fetch("http://localhost:3000/reports", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newReport),
    })
    .then(response => response.json())
    .then(data => {
        if (data.resultado === "true") {
            Swal.fire({
                title: "Denuncia creada exitosamente",
                icon: "success"
            });
        }
    })
    .catch(error => {
        console.error("Error al crear la denuncia:", error);
    });
}

// Lógica de visibilidad de opciones según el tipo de usuario para las denuncias
document.addEventListener("DOMContentLoaded", function () {
    const tipoUsuario = localStorage.getItem("rolLogIn"); 
    const adminItemHeader = document.getElementById("adminNavItemHeader");
    const adminItemFooter = document.getElementById("adminNavItemFooter");
    const crearDenuncia = document.getElementById("crearDenuncia");
    const botonPublicar = document.getElementById("btnBotonPublicar");

    console.log(tipoUsuario)

    if (tipoUsuario !== "administrador") {
        if (adminItemHeader) {
            adminItemHeader.style.display = "none";
        }
    }

    if (tipoUsuario !== "administrador") {
        if (adminItemFooter) {
            adminItemFooter.style.display = "none";
        }
    }

    if (tipoUsuario == "vecino") {
        if (crearDenuncia) {
            crearDenuncia.style.display = "none";
        }
    }

    if (tipoUsuario == "concejal") {
        if (botonPublicar) {
            botonPublicar.style.display = "none";
        }
    }
});

// Eventos de los botones para crear y publicar denuncias
btnBotonPublicar.addEventListener("click", Publicar_Denuncia_Creada);
btnBotonCrear.addEventListener("click", Guardar_Denuncia_Creada);
btnBotonLimpiar.addEventListener("click", function () {
    limpiarCamposDenuncia();
});

/* CONTROLAR LAS DENUNCIAS */

/* DESPUÉS DE QUE VIENEN DESDE LA BASE DE DATOS */

let reports = []

// Función para mostrar las denuncias
const showReports = async () => {
    // Recuperar las denuncias de la base de datos
    reports = await listar_proximos_denuncias_BD();

    // Ordenar las denuncias por fecha y hora
    reports.sort((a, b) => new Date(a.fechayhora) - new Date(b.fechayhora));

    // Obtener el contenedor donde se van a mostrar las denuncias
    const reportsContainer = document.getElementById('reportContainer');

    // Recorrer todas las denuncias y mostrarlas
    for (let i = 0; i < reports.length; i++) {
        const reportCard = document.createElement('div');
        reportCard.classList.add('reportCard');
        
        // Crear el contenido de cada tarjeta de denuncia
        reportCard.innerHTML = `
            <div class="reportHeader"> ${reports[i]['nombre']}</div>
            <div class="reportDetail"><strong>Fecha y Hora:</strong> ${reports[i]['fechayhora']}</div>
            <div class="reportDetail"><strong>Categoría:</strong> ${reports[i]['categoria']}</div>
            <div class="reportDetail"><strong>Lugar:</strong> ${reports[i]['lugar']}</div>
            <div class="reportDetail"><strong>Descripción:</strong> ${reports[i]['descripcion']}</div>
            <div class="reportDetail"><strong>Estado:</strong> ${reports[i]['estado']}</div>
        `;

        // Agregar la tarjeta al contenedor de denuncias
        reportsContainer.appendChild(reportCard);
    };
}

// Cuando se carga la página, ejecutamos la función
document.addEventListener("DOMContentLoaded", function () {
    // Obtener el tipo de usuario desde el almacenamiento local
    const tipoUsuario = localStorage.getItem("rolLogIn"); 
    const adminItemHeader = document.getElementById("adminNavItemHeader");
    const adminItemFooter = document.getElementById("adminNavItemFooter");
    const crearDenuncia = document.getElementById("crearDenuncia");

    // Mostrar por consola el tipo de usuario para verificar
    console.log(tipoUsuario)

    // Ocultar la opción de ADMINISTRADOR si no es un administrador
    if (tipoUsuario !== "administrador") {
        if (adminItemHeader) {
            adminItemHeader.style.display = "none";
        }
    }

    // Ocultar la opción de ADMINISTRADOR en el pie de página si no es administrador
    if (tipoUsuario !== "administrador") {
        if (adminItemFooter) {
            adminItemFooter.style.display = "none";
        }
    }

    // Ocultar el botón de "Crear Denuncia" si el usuario es un "vecino"
    if (tipoUsuario == "vecino") {
        if (crearDenuncia) {
            crearDenuncia.style.display = "none";
        }
    }
});

// Al cargar la página, mostramos las denuncias
window.onload = function () {
    showReports();
};
