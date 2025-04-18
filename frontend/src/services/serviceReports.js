
//Funcion para registrar personas

const crear_denuncia= async(pNombre, pFechaHora,pCategoria, pLugar, pDescripcion, pEstado)=>{
    
    try {
        //Libreria para conectar el fronend del backend
        const res= await axios({
            method: "post",
            url: "http://localhost:3000/reports",
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
                text: "La denuncia ya está registrada",
                icon: "warning"
              });
    }

    //Evalua si el aviso ya existe

    }else{
        Swal.fire({
            title: "Registro exitoso",
            text: "La denuncia se registró exitosamente",
            icon: "sucesss"
          });

          setTimeout(()=>{
            window.location.href= "ReportsPage.html"

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





const listar_denuncias_BD= async()=>{

    let lista_denuncias = []
    
    try {
        //Libreria para conectar el fronend del backend
        const res= await axios({
            method: "get",
            url: "http://localhost:3000/reports",
            responseType: "json"
        })

        lista_denuncias = res.data.lista_denuncuas;
        console.log(lista_denuncias)
    }

    catch (error) {
            console.log(error)
            Swal.fire({
                title: "Error",
                text: "Error al listar denuncias",
                icon: "error"
            });
            
        }

    return lista_denuncias

    }



const listar_denuncias_pending_BD= async()=>{

        let lista_denuncias = []
        
        try {
            //Libreria para conectar el fronend del backend
            const res= await axios({
                method: "get",
                url: "http://localhost:3000/reportsPending",
                responseType: "json"
            })
    
            lista_denuncias = res.data.lista_avisos;
        }
    
        catch (error) {
                console.log(error)
                Swal.fire({
                    title: "Error",
                    text: "Error al listar denuncias",
                    icon: "error"
                });
                
            }
    
        return lista_denuncias
    
        }

       
        const actualizarEstado= async(p_id,pNombre, pFechaHora,pCategoria, pLugar, pDescripcion, pEstado)=>{

                try {
                    const res = await axios({
                        method:'put',
                        url:'http://localhost:3000/reportsUpdateStatus',
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
                            text: "Error al listar denuncias",
                            icon: "error"
                        });
                        
                    }

            
                }
            