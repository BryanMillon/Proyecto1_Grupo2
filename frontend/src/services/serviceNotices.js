
//Funcion para registrar personas

const crear_aviso= async(pNombre, pFechaHora,pCategoria, pLugar, pDescripcion)=>{
    
    try {
        //Libreria para conectar el fronend del backend
        const res= await axios({
            method: "post",
            url: "http://localhost:3000/notices",
            responseType: "json",
            data:{
                    nombre:pNombre,
                    fechaHora:pFechaHora,
                    categoria:pCategoria,
                    lugar:pLugar,
                    descripcion:pDescripcion
            }
        })


    console.log(res)

    if(res.data.resultado==false){
        if(res.data.error.code ==11000){
    
            Swal.fire({
                title: "No se completó el registro",
                text: "El aviso ya está registrado",
                icon: "warning"
              });
    }

    //Evalua si la persona ya existe

    }else{
        Swal.fire({
            title: "Registro exitoso",
            text: "El aviso se registró exitosamente",
            icon: "sucesss"
          });

          setTimeout(()=>{
            window.location.href= "NoticesPage.html"

          }, 1500)
    }
   
    } catch (error) {
        console.log(error)
        Swal.fire({
            title: "No se completó el registro",
            text: "Error en el registro",
            icon: "error"
          });
        
    }
}
