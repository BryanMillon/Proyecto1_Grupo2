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