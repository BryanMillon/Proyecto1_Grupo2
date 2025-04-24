
  document.addEventListener("DOMContentLoaded", function () {
      const editButton = document.getElementById("editInfoLink");
      const saveButton = document.getElementById("saveButton");
      const cancelButton = document.getElementById("cancelButton");
      const inputs = document.querySelectorAll(".profile-details input");
  
      const fileInput = document.getElementById("fileInput");
      const editPhotoLink = document.getElementById("editPhotoLink");
      const profileImage = document.getElementById("profileImage");
  
      let valoresOriginales = {};
      let imagenCambiada = false;
  
      // === OBTENER USUARIO DESDE localStorage ===
      const usuarioId = localStorage.getItem("id_mongo");
  
      // === CARGAR DATOS DEL PERFIL AL INICIAR ===
      cargarDatosUsuario();
  
  
    

      async function cargarDatosUsuario() {

        function capitalizarPrimeraLetra(texto) {
            if (!texto) return '';
            return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
        }
        
        function formatearDistrito(distrito) {
            if (!distrito) return '';
            if (distrito.toLowerCase() === 'sanpedro') return 'San Pedro';
            return capitalizarPrimeraLetra(distrito);}

          if (!usuarioId) {
              mostrarError("Usuario no encontrado en localStorage");
              return;
          }
  
          try {
              const data = await obtenerUsuarioPorId(usuarioId);
              
              // Asignar valores a los inputs
              document.querySelector('input[placeholder="Nombre"]').value = capitalizarPrimeraLetra(data.nombre) || '';
              document.querySelector('input[placeholder="Apellido 1"]').value = capitalizarPrimeraLetra(data.apellido1) || '';
              document.querySelector('input[placeholder="Apellido 2"]').value = capitalizarPrimeraLetra(data.apellido2) || '';
              document.querySelector('input[placeholder="Dirección"]').value = capitalizarPrimeraLetra(data.direccion) || '';
              document.querySelector('input[placeholder="Teléfono"]').value = data.telefono || '';
              document.querySelector('input[placeholder="Correo"]').value = capitalizarPrimeraLetra(data.email)  || '';
              document.querySelector('input[placeholder="Distrito"]').value = formatearDistrito(data.distrito) || '';
              document.querySelector('input[placeholder="Cedula"]').value = data.cedula || '';
              document.querySelector('input[placeholder="Rol"]').value = capitalizarPrimeraLetra(data.rol) || '';

              
              // Mostrar imagen de perfil si existe
              if (data.imageUrl) {
                  profileImage.src = data.imageUrl;
              }
          } catch (error) {
              console.error("Error al cargar el perfil:", error);
              mostrarError("No se pudo cargar la información del perfil");
          }
      }
  
      // === CAMBIO DE FOTO ===
      editPhotoLink.addEventListener("click", function (e) {
          e.preventDefault();
          fileInput.click();
      });
  
      fileInput.addEventListener("change", function () {
          const file = fileInput.files[0];
          if (file && file.type.startsWith("image/")) {
              const reader = new FileReader();
              reader.onload = function (e) {
                  profileImage.src = e.target.result;
                  imagenCambiada = true;
              };
              reader.readAsDataURL(file);
          } else {
              Swal.fire("Archivo inválido", "Por favor selecciona una imagen válida.", "error");
          }
      });
  
      // === BOTÓN EDITAR INFORMACIÓN ===
      editButton.addEventListener("click", function (e) {
        e.preventDefault();
        valoresOriginales = {};
        inputs.forEach(input => {
            const placeholder = input.placeholder;
    
            // Guardar el valor original
            valoresOriginales[placeholder] = input.value;
    
            // Solo habilitar si no es uno de los campos restringidos
            if (
                placeholder !== "Correo" &&
                placeholder !== "Cedula" &&
                placeholder !== "Distrito" &&
                placeholder !== "Rol"
            ) {
                input.removeAttribute("disabled");
            }
        });
    
        saveButton.style.display = "inline-block";
        cancelButton.style.display = "inline-block";
    });
  
      // === BOTÓN CANCELAR ===
      cancelButton.addEventListener("click", function () {
          inputs.forEach(input => {
              input.value = valoresOriginales[input.placeholder];
              input.setAttribute("disabled", "true");
          });
  
          // Si se cambió la imagen, volver a cargar la original
          if (imagenCambiada) {
              cargarDatosUsuario();
              imagenCambiada = false;
          }
  
          saveButton.style.display = "none";
          cancelButton.style.display = "none";
      });
  
      // === VALIDACIONES ===
      function validarCamposVacios() {
          let error = false;
          inputs.forEach(input => {
              if (input.value.trim() === "") {
                  input.classList.add("error");
                  error = true;
              } else {
                  input.classList.remove("error");
              }
          });
          return error;
      }
  
      function validarTexto(input) {
          let regex = /^[a-zA-Z\s]+$/;
          return !regex.test(input.value);
      }
  
      function validarTelefono() {
          let regex = /^[0-9]{8}$/;
          const telefonoInput = document.querySelector('input[placeholder="Teléfono"]');
          return !regex.test(telefonoInput.value);
      }
  
      function validarCorreo() {
          let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          const emailInput = document.querySelector('input[placeholder="Correo"]');
          return !regex.test(emailInput.value);
      }
  
      // === BOTÓN GUARDAR CAMBIOS ===
      saveButton.addEventListener("click", async function () {
          let errores = {
              vacios: validarCamposVacios(),
              nombre: validarTexto(document.querySelector('input[placeholder="Nombre"]')),
              apellido1: validarTexto(document.querySelector('input[placeholder="Apellido 1"]')),
              apellido2: validarTexto(document.querySelector('input[placeholder="Apellido 2"]')),
              telefono: validarTelefono(),
              correo: validarCorreo(),
          };
  
          if (errores.vacios) {
              Swal.fire("Campos Vacíos", "Completa todos los campos antes de guardar.", "warning");
          } else if (errores.nombre) {
              Swal.fire("Error en Nombre", "Solo se permiten letras.", "error");
          } else if (errores.apellido1) {
              Swal.fire("Error en Apellido 1", "Solo se permiten letras.", "error");
          } else if (errores.apellido2) {
              Swal.fire("Error en Apellido 2", "Solo se permiten letras.", "error");
          } else if (errores.telefono) {
              Swal.fire("Error en Teléfono", "Debe contener 8 dígitos numéricos.", "error");
          } else if (errores.correo) {
              Swal.fire("Error en Correo", "Formato de correo electrónico inválido.", "error");
          } else {
              if (!usuarioId) {
                  Swal.fire("Error", "Usuario no encontrado", "error");
                  return;
              }
  
              try {
                  // Mostrar loading mientras se procesa
                  Swal.fire({
                      title: "Guardando cambios",
                      text: "Por favor espere...",
                      allowOutsideClick: false,
                      didOpen: () => {
                          Swal.showLoading();
                      }
                  });
  
                  // Si la imagen cambió, subimos a Cloudinary
                  let imageUrl = profileImage.src;
                  
                  if (imagenCambiada) {
                      // Si es base64 (nuevo cambio), subimos a Cloudinary
                      if (imageUrl.startsWith('data:image')) {
                          imageUrl = await subirImagenBase64Cloudinary(imageUrl);
                      }
                  }
  
                  const datosActualizados = {
                      nombre: document.querySelector('input[placeholder="Nombre"]').value,
                      apellido1: document.querySelector('input[placeholder="Apellido 1"]').value,
                      apellido2: document.querySelector('input[placeholder="Apellido 2"]').value,
                      direccion: document.querySelector('input[placeholder="Dirección"]').value,
                      telefono: document.querySelector('input[placeholder="Teléfono"]').value,
                      email: document.querySelector('input[placeholder="Correo"]').value,
                      imageUrl: imageUrl
                  };
  
                  await actualizarUsuario(usuarioId, datosActualizados);
                  
                  Swal.fire({
                      title: "Perfil Actualizado",
                      text: "Tu información ha sido guardada exitosamente.",
                      icon: "success"
                  });
                  
                  // Deshabilitamos los inputs y ocultamos botones
                  inputs.forEach(input => input.setAttribute("disabled", "true"));
                  saveButton.style.display = "none";
                  cancelButton.style.display = "none";
                  
                  // Reiniciamos la bandera de imagen
                  imagenCambiada = false;
              } catch (error) {
                  console.error("Error al actualizar perfil:", error);
                  Swal.fire("Error", "No se pudo actualizar el perfil", "error");
              }
          }
      });
  
      function mostrarError(mensaje) {
          Swal.fire("Error", mensaje, "error");
      }
  });