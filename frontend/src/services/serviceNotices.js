
//Funcion para registrar personas

const crear_aviso= async(pNombre, pFechaHora,pCategoria, pLugar, pDescripcion, pEstado)=>{
    
    try {
        //Libreria para conectar el fronend del backend
        const res= await axios({
            method: "post",
            url: "http://localhost:3000/notices",
            responseType: "json",
            data:{
                    nombre:pNombre,
                    fechayhora:pFechaHora,
                    categoria:pCategoria,
                    lugar:pLugar,
                    descripcion:pDescripcion,
                    estado: pEstado
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

    //Evalua si el aviso ya existe

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





const listar_avisos_BD= async()=>{

    let lista_avisos = []
    
    try {
        //Libreria para conectar el fronend del backend
        const res= await axios({
            method: "get",
            url: "http://localhost:3000/notices",
            responseType: "json"
        })

        lista_avisos = res.data.lista_avisos;
        console.log(lista_avisos)
    }

    catch (error) {
            console.log(error)
            Swal.fire({
                title: "Error",
                text: "Error al listar avisos",
                icon: "error"
            });
            
        }

    return lista_avisos

    }



const listar_avisos_pending_BD= async()=>{

        let lista_avisos = []
        
        try {
            //Libreria para conectar el fronend del backend
            const res= await axios({
                method: "get",
                url: "http://localhost:3000/noticesPending",
                responseType: "json"
            })
    
            lista_avisos = res.data.lista_avisos;
        }
    
        catch (error) {
                console.log(error)
                Swal.fire({
                    title: "Error",
                    text: "Error al listar avisos",
                    icon: "error"
                });
                
            }
    
        return lista_avisos
    
        }

        const listar_proximos_avisos_BD= async()=>{

            let lista_avisos = []
            
            try {
                //Libreria para conectar el fronend del backend
                const res= await axios({
                    method: "get",
                    url: "http://localhost:3000/Nextnotices",
                    responseType: "json"
                })
        
                lista_avisos = res.data.lista_avisos;
                console.log(lista_avisos)
            }
        
            catch (error) {
                    console.log(error)
                    Swal.fire({
                        title: "Error",
                        text: "Error al listar avisos",
                        icon: "error"
                    });
                    
                }
        
            return lista_avisos
        
            }
        
        const actualizarEstado= async(p_id,pNombre, pFechaHora,pCategoria, pLugar, pDescripcion, pEstado)=>{

                try {
                    const res = await axios({
                        method:'put',
                        url:'http://localhost:3000/noticesUpdateStatus',
                        params:{id:p_id},
                        data:{
                            nombre:pNombre,
                            fechayhora:pFechaHora,
                            categoria:pCategoria,
                            lugar:pLugar,
                            descripcion:pDescripcion,
                            estado: pEstado
                        },
                        responseType:'json'
                    })
                }
            
                catch (error) {
                        console.log(error)
                        Swal.fire({
                            title: "Error",
                            text: "Error al listar avisos",
                            icon: "error"
                        });
                        
                    }

            
                }
            