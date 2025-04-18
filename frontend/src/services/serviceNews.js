//Funcion para registrar personas
const crear_noticia= async(pTitulo, pSubtitulo, pCategoria, pContenido, pfechaDePublicacion, pEstado)=>{
    
    try {
        //Libreria para conectar el fronend del backend
        const res= await axios({
            method: "post",
            url: "http://localhost:3000/news",
            responseType: "json",
            data:{
                    titulo:pTitulo,
                    subtitulo:pSubtitulo,
                    categoria:pCategoria,
                    contenido:pContenido,
                    fechaDePublicacion: pfechaDePublicacion,
                    estado: pEstado
            }
        })


    console.log(res)

    if(res.data.resultado==false){
        if(res.data.error.code ==11000){
    
            Swal.fire({
                title: "No se completó el registro",
                text: "La noticia ya está registrada",
                icon: "warning"
              });
    }

    //Evalua si la noticia ya existe

    }else{
        Swal.fire({
            title: "Registro exitoso",
            text: "La noticia se registró exitosamente",
            icon: "sucesss"
          });

          setTimeout(()=>{
            window.location.href= "NewsPage.html"

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


const listar_noticias_BD= async()=>{

    let lista_noticias = []
    
    try {
        //Libreria para conectar el fronend del backend
        const res= await axios({
            method: "get",
            url: "http://localhost:3000/news",
            responseType: "json"
        })

        lista_noticias = res.data.lista_noticias;
        console.log(lista_noticias)
    }

    catch (error) {
            console.log(error)
            Swal.fire({
                title: "Error",
                text: "Error al listar noticias",
                icon: "error"
            });
            
        }

    return lista_noticias

}

const listar_noticias_pending_BD= async()=>{

    let lista_noticias = []
    
    try {
        //Libreria para conectar el fronend del backend
        const res= await axios({
            method: "get",
            url: "http://localhost:3000/newsPending",
            responseType: "json"
        })

        lista_noticias = res.data.lista_noticias;
    }

    catch (error) {
            console.log(error)
            Swal.fire({
                title: "Error",
                text: "Error al listar noticias",
                icon: "error"
            }); 
    }

    return lista_noticias

}

const listar_noticias_publicadas_BD= async()=>{

    let lista_noticias = []
    
    try {
        //Libreria para conectar el fronend del backend
        const res= await axios({
            method: "get",
            url: "http://localhost:3000/newsPublished",
            responseType: "json"
        })

        lista_noticias = res.data.lista_noticias;
        console.log (lista_noticias)
    }

    catch (error) {
            console.log(error)
            Swal.fire({
                title: "Error",
                text: "Error al listar noticias",
                icon: "error"
            });
            
    }

    return lista_noticias
}
    
const actualizarNoticiasEstado= async(p_id,pTitulo, pSubtitulo,pCategoria, pContenido, pfechaDePublicacion)=>{
    try {
        const res = await axios({
            method:'put',
            url:'http://localhost:3000/newsUpdateStatus',
            params:{id:p_id},
            data:{
                titulo:pTitulo,
                subtitulo:pSubtitulo,
                categoria:pCategoria,
                contenido:pContenido,
                fechaDePublicacion: pfechaDePublicacion
            },
            responseType:'json'
        })
    }

    catch (error) {
            console.log(error)
            Swal.fire({
                title: "Error",
                text: "Error al listar noticias",
                icon: "error"
            });
            
    } 
}