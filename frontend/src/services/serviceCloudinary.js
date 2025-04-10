// cloudinary-config.js
const initCloudinaryWidget = (previewElement, onSuccessCallback) => {
    return cloudinary.createUploadWidget({
        cloudName: 'dvye3vyj4',
        uploadPreset: 'proyecto1Grupo2'
    }, (error, result) => {
        if (!error && result && result.event === 'success') {
            console.log("Imagen registrada", result.info);
            
            // Actualiza la imagen de vista previa
            if (previewElement) {
                previewElement.src = result.info.secure_url;
            }
            
            // Ejecuta callback con la URL si existe
            if (onSuccessCallback) {
                onSuccessCallback(result.info.secure_url);
            }
        }
    });
};

// Exporta la función para usarla en otros archivos
window.initCloudinaryWidget = initCloudinaryWidget;