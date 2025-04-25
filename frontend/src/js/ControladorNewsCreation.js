setTimeout(verificarSesion, 3000) 

//Obtener las referencias del formulario
const inputTitleNew = document.getElementById("textTituloNoticia");
const inputSubtitleNew = document.getElementById("textSubtituloNoticia");
const inputCategoryNew= document.getElementById("optionCategoria");
const inputContentNew = document.getElementById("textContent");

//Validacion de campos vacios
function validateEmphyFields() {
    let error = false;
    let ListInputsRequired = document.querySelectorAll("#formNewNew [required]");
    for(let i=0; i<ListInputsRequired.length;i++){
        if(ListInputsRequired[i].value == ""){
            ListInputsRequired[i].classList.add('error');
            error=true;
        }else{
            ListInputsRequired[i].classList.remove('error');
        }
    }   
    return error;
}

function Guardar_Noticia_Creado(){
    console.log ("toy dentro")
    let errorCamposVacios = validateEmphyFields();

    if(errorCamposVacios){
        Swal.fire({
            title: "Campos vacios",
            text: "Revisa los campos marcados en rojo",
            icon: "warning"
          });
    }else{
        //Obtiene fecha en la que el usuario creo la noticia
        const publishDate = new Date()
	    /*lett currentYear= date.getFullYear();
	    let currentMonth= date.getMonth() + 1;
	    let currentDay= date.getDate();
        let publishDate= `${currentDay} / ${currentMonth} / ${currentYear}`;
        //-----------------------------------------------//
        */
        let newsTitle= inputTitleNew.value;
        let newsSubtitle= inputSubtitleNew .value;
        let newsCategory= inputCategoryNew.value;
        let newsContent= inputContentNew.value;
        crear_noticia(newsTitle, newsSubtitle, newsCategory, newsContent, publishDate, 'pendiente')
        limpiarCampos()
    }
}

function Publicar_Noticia_Creado(){
    let errorCamposVacios = validateEmphyFields();

    if(errorCamposVacios){
        Swal.fire({
            title: "Campos vacios",
            text: "Revisa los campos marcados en rojo",
            icon: "warning"
          });
    }else{
        //Obtiene fecha en la que el usuario creo la noticia
        const publishDate = new Date()
	    /*lett currentYear= date.getFullYear();
	    let currentMonth= date.getMonth() + 1;
	    let currentDay= date.getDate();
        let publishDate= `${currentDay} / ${currentMonth} / ${currentYear}`;
        //-----------------------------------------------//
        */
        let newsTitle= inputTitleNew.value;
        let newsSubtitle= inputSubtitleNew .value;
        let newsCategory= inputCategoryNew.value;
        let newsContent= inputContentNew.value;

        crear_noticia(newsTitle, newsSubtitle, newsCategory, newsContent, publishDate, 'publicado')
        limpiarCampos()
    }
}

btnBotonPublicar.addEventListener("click",Publicar_Noticia_Creado);
btnBotonCrear.addEventListener("click",Guardar_Noticia_Creado);



document.addEventListener("DOMContentLoaded", function () {
    // Supongamos que el tipo de usuario está almacenado así:
    const tipoUsuario = localStorage.getItem("rolLogIn"); 
    const adminItemHeader = document.getElementById("adminNavItemHeader");
    const adminItemFooter = document.getElementById("adminNavItemFooter");
    const crearAviso = document.getElementById("crearAviso");
    const crearNoticia = document.getElementById("crearNoticia");
    const botonPublicar = document.getElementById("btnBotonPublicar");


    console.log(tipoUsuario)

    // Ocultar la opción de ADMINISTRADOR si no es administrador
    if (tipoUsuario !== "administrador") {
        if (adminItemHeader) {
            adminItemHeader.style.display = "none";
        }
    }

    // Ocultar la opción de ADMINISTRADOR si no es administrador
    if (tipoUsuario !== "administrador") {
        if (adminItemFooter) {
            adminItemFooter.style.display = "none";
        }
    }

    if (tipoUsuario == "vecino") {
        if (crearAviso) {
            crearAviso.style.display = "none";
        }
    }

    if (tipoUsuario == "vecino") {
        if (crearNoticia) {
            crearNoticia.style.display = "none";
        }
    }

    if (tipoUsuario == "concejal") {
        if (botonPublicar) {
            botonPublicar.style.display = "none";
        }
    }

});


    const estadoConcejal = localStorage.getItem("estadoConcejal"); 
    if (tipoUsuario == "concejal" && estadoConcejal !== "aprobado") {
      if (crearNoticia) {
          crearNoticia.style.display = "none";
      }
    }

    if (tipoUsuario == "concejal" && estadoConcejal !== "aprobado") {
      if (crearAviso) {
          crearAviso.style.display = "none";
      }
    }
});

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.clear();
    Swal.fire({
      icon: "success",
      title: "Sesión cerrada",
      showConfirmButton: false,
      timer: 1000
    }).then(() => {
        window.location.href = "../pages/HomeUser.html";
    });
  });
}

