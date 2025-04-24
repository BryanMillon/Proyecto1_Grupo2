async function subirArchivoCloudinary(archivo, tipo) {
    const formData = new FormData();
    formData.append('file', archivo);
    formData.append("upload_preset", "proyecto1Grupo2");
    
    const cloudName = "dvye3vyj4"; // Tu cloud name
    const endpoint = tipo === "imagen"
        ? `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`  
        : `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`;   

    try {
        const response = await axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.data.secure_url) {
            return response.data.secure_url; // Devuelve la URL segura de la imagen o archivo subido
        } else {
            throw new Error("Error al subir archivo a Cloudinary.");
        }
    } catch (error) {
        console.error("Error al subir archivo a Cloudinary:", error);
        Swal.fire({
            title: "Error",
            text: "Hubo un problema al subir el archivo: " + error.message,
            icon: "error"
        });
        return null;
    }
}
