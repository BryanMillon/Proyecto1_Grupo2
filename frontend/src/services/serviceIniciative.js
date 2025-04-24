// Función para registrar una iniciativa
const crear_iniciativa = async (pusuarioId, pcategoria, pdescripcion, pdistrito) => {
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:3000/crearIniciativa",
        responseType: "json",
        data: {
          usuarioId:pusuarioId ,
          categoria:pcategoria,
          descripcion:pdescripcion,
          distrito:pdistrito
        }
      });
  
      console.log(res.data.resultado);
  
      if (res.data.resultado === false) {
        Swal.fire({
          title: "No se completó el registro",
          text: "Ya existe una iniciativa similar registrada",
          icon: "warning",
        });
      } else {
        Swal.fire({
          title: "Registro exitoso",
          text: "La iniciativa se registró exitosamente",
          icon: "success",
        });

      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "No se completó el registro",
        text: "Error en el registro",
        icon: "error",
      });
    }
  };
  




  // Listar todas las iniciativas
  const listar_iniciativas_BD = async () => {
    let lista_iniciativas = [];
  
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:3000/iniciativas",
        responseType: "json",
      });
  
      lista_iniciativas = res.data;
      console.log(lista_iniciativas);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Error al listar iniciativas",
        icon: "error",
      });
    }
  
    return lista_iniciativas;
  };
  

  const listar_iniciativas_publicadasBD= async()=>{

            let lista_iniciativas = []
            
            try {
                //Libreria para conectar el fronend del backend
                const res= await axios({
                    method: "get",
                    url: "http://localhost:3000/IniciativasPublicadas",
                    responseType: "json"
                })
        
                lista_iniciativas = res.data.lista_iniciativas;
            }
        
            catch (error) {
                    console.log(error)
                    Swal.fire({
                        title: "Error",
                        text: "Error al listar iniciativas",
                        icon: "error"
                    });
                    
                }
        
            return lista_iniciativas
            }

            const listar_iniciativas_pendientesBD= async()=>{

              let lista_iniciativas = []
              
              try {
                  //Libreria para conectar el fronend del backend
                  const res= await axios({
                      method: "get",
                      url: "http://localhost:3000/IniciativasPendientes",
                      responseType: "json"
                  })
          
                  lista_iniciativas = res.data.lista_iniciativas;
              }
          
              catch (error) {
                      console.log(error)
                      Swal.fire({
                          title: "Error",
                          text: "Error al listar iniciativas",
                          icon: "error"
                      });
                      
                  }
          
              return lista_iniciativas
              }
  







            const actualizarEstadoIniciativa = async(p_id, pEstado) => {
              try {
                  const res = await axios({
                      method: 'put',
                      url: 'http://localhost:3000/iniciativeUpdateStatus',  // Ruta para actualizar el estado de las iniciativas
                      params: { id: p_id },
                      data: {
                          estado: pEstado
                      },
                      responseType: 'json'
                  });
              } catch (error) {
                  console.log(error);
                  Swal.fire({
                      title: "Error",
                      text: "Error al actualizar el estado de la denuncia",
                      icon: "error"
                  });
              }
          }
          















  // Actualizar estado de la iniciativa
  const actualizar_estado_iniciativa = async (id, nuevoEstado) => {
    try {
      const res = await axios({
        method: "put",
        url: `http://localhost:3000/iniciativas/${id}`,
        data: {
          estado: nuevoEstado,
        },
        responseType: "json",
      });
  
      Swal.fire({
        title: "Actualización exitosa",
        text: `La iniciativa fue ${nuevoEstado === 'aprobada' ? 'aprobada' : 'rechazada'} correctamente` ,
        icon: "success",
      });
    } catch (error) {
    console.log(error);
    Swal.fire({
        title: "Error",
        text: "No se pudo actualizar la iniciativa",
        icon: "error",
      });
    }
  };
  