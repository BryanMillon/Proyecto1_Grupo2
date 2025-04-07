//Get all references to the DOM to the Form
const inputNameEvent = document.getElementById("textNombreAviso");
const inputDateEvent = document.getElementById("dateTimePicker");
const inputCategoryEvent= document.getElementById("eventCategory");
const inputPlaceEvent = document.getElementById("textPlace");
const inputDescriptionEvent = document.getElementById("textDescription");

//Validate that there are no empty fields
function validateEmphyFields() {
    let error = false;
    let ListInputsRequired = document.querySelectorAll("#formNewEvent [required]");
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



//limpiar campos del formulario
function limpiarCampos(){
    textNombreAviso.value = "";
    dateTimePicker.value = "";
    eventCategory.value = "";
    textPlace.value = "";
    textDescription.value = "";
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

        let nombre= inputNameEvent.value;
        let dateTimePicker= inputDateEvent.value;
        let eventCategory= inputCategoryEvent .value;
        let textPlace= inputPlaceEvent.value;
        let textDescription= inputDescriptionEvent.value;

        crear_aviso(nombre, dateTimePicker,eventCategory, textPlace, textDescription)
        limpiarCampos()

    }
}

btnBotonPublicar.addEventListener("click",sendData);
btnBotonCrear.addEventListener("click",sendData);

btnBotonLimpiar.addEventListener("click", function () {
    limpiarCampos()
});