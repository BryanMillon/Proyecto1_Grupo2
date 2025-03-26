//Obtener las referencias del formulario
const inputTitleNew = document.getElementById("textTituloNoticia");
const inputSubtitleNew = document.getElementById("textSubtituloNoticia");
const inputCategoryEvent= document.getElementById("optionCategoria");
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

function sendData(){
    let errorCamposVacios = validateEmphyFields();

    if(errorCamposVacios){
        Swal.fire({
            title: "Campos vacios",
            text: "Revisa los campos marcados en rojo",
            icon: "warning"
          });
    }else{
        Swal.fire({
            title: "Exito",
            text: "Su evento se ha enviado exitosamente",
            icon: "success"
          });
    }
}



btnBotonPublicar.addEventListener("click",sendData);
btnBotonCrear.addEventListener("click",sendData);

btnBotonLimpiar.addEventListener("click", function () {
    textTituloNoticia.value = "";
    textSubtituloNoticia.value = "";
    optionCategoria.value = "";
    textContent.value = "";
    textDescription.value = "";
});