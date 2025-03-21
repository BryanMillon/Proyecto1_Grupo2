/*Control de Noticias*/

/*Simulacion de Base de Datos*/
const news = [
    { 
        titulo: "Accidente de gran escala en el sur",
        subtitulo: "Accidente nuclear deja a 3 heridos y 2 muertos",
        categoria: "Nacional" ,
        contenido: "Por el sur de costa rica una explocion nuclear se expande afectando a mitad del pais",
        fechaPublicacion: "202X-XX-XX XX:XX PM"
    },
    { 
        titulo: "Accidente de gran escala en el sur",
        subtitulo: "Accidente nuclear deja a 3 heridos y 2 muertos",
        categoria: "Nacional" ,
        contenido: "Por el sur de costa rica una explocion nuclear se expande afectando a mitad del pais",
        fechaPublicacion: "202X-XX-XX XX:XX PM"
    },
    { 
        titulo: "Accidente de gran escala en el sur",
        subtitulo: "Accidente nuclear deja a 3 heridos y 2 muertos",
        categoria: "Nacional" ,
        contenido: "Por el sur de costa rica una explocion nuclear se expande afectando a mitad del pais",
        fechaPublicacion: "202X-XX-XX XX:XX PM"
    },
    { 
        titulo: "Accidente de gran escala en el sur",
        subtitulo: "Accidente nuclear deja a 3 heridos y 2 muertos",
        categoria: "Nacional" ,
        contenido: "Por el sur de costa rica una explocion nuclear se expande afectando a mitad del pais",
        fechaPublicacion: "202X-XX-XX XX:XX PM"
    },
    { 
        titulo: "Accidente de gran escala en el sur",
        subtitulo: "Accidente nuclear deja a 3 heridos y 2 muertos",
        categoria: "Nacional" ,
        contenido: "Por el sur de costa rica una explocion nuclear se expande afectando a mitad del pais",
        fechaPublicacion: "202X-XX-XX XX:XX PM"
    },
    { 
        titulo: "Accidente de gran escala en el sur",
        subtitulo: "Accidente nuclear deja a 3 heridos y 2 muertos",
        categoria: "Nacional" ,
        contenido: "Por el sur de costa rica una explocion nuclear se expande afectando a mitad del pais",
        fechaPublicacion: "202X-XX-XX XX:XX PM"
    },
]

/*Funcion Ordenar Noticias por fecha de publicacion*/
function sortEvents() {
    /*events.sort: es un método utilizado para ordenar los elementos de un "Array". Este método modifica la matriz original y devuelve el "Array" ordenado.*/
    /*comparar "fechaPublicacion" para ordenarlo*/
    return news.sort((a, b) => new Date(a.fechaPublicacion) - new Date(b.fechaPublicacion));
}

// Mostrar Noticias 
function showNews() {
    const articlesCountainer = document.getElementById('articleCountainer');
    sortEvents().forEach(news => {
        const newCard = document.createElement('div');
        newCard.classList.add('newCard');
        newCard.innerHTML = `
            <div class="newsHeader">${news.titulo}</div>
            <div class="newsDetail"><strong>Subtitulo:</strong> ${news.subtitulo}</div>
            <div class="newsDetail"><strong>Categoría:</strong> ${news.categoria}</div>
            <div class="newsDetail"><strong>Articulo:</strong> ${news.contenido}</div>
            <div class="newsDetail"><strong>Fecha de Publicacion:</strong> ${news.fechaPublicacion}</div>
        `;
        articlesCountainer.appendChild(newCard);
    });
}

window.onload = function() {
    showNews();
};
