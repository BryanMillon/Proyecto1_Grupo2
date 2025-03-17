/*CONTROL THE EVENTS */

/*AFTER THEY COMES FROM THE DATABASE */

const events = [
    { 
        titulo: "Accidente de gran escala en el sur",
        categoria: "Nacional",
        subtitulo: "Accidente nuclear deja a 3 heridos y 2 muertos" ,
        fechaPubliacion: "202X-XX-XX XX:XX PM",
        contenido: "Por el sur de costa rica una explocion nuclear se expande afectando a mitad del pais."
    }, 
    { 
        titulo: "Accidente de gran escala en el sur",
        categoria: "Nacional",
        subtitulo: "Accidente nuclear deja a 3 heridos y 2 muertos" ,
        fechaPubliacion: "202X-XX-XX XX:XX PM",
        contenido: "Por el sur de costa rica una explocion nuclear se expande afectando a mitad del pais."
    },
    { 
        titulo: "Accidente de gran escala en el sur",
        categoria: "Nacional",
        subtitulo: "Accidente nuclear deja a 3 heridos y 2 muertos" ,
        fechaPubliacion: "202X-XX-XX XX:XX PM",
        contenido: "Por el sur de costa rica una explocion nuclear se expande afectando a mitad del pais."
    },
    { 
        titulo: "Accidente de gran escala en el sur",
        categoria: "Nacional",
        subtitulo: "Accidente nuclear deja a 3 heridos y 2 muertos" ,
        fechaPubliacion: "202X-XX-XX XX:XX PM",
        contenido: "Por el sur de costa rica una explocion nuclear se expande afectando a mitad del pais."
    },
    { 
        titulo: "Accidente de gran escala en el sur",
        categoria: "Nacional",
        subtitulo: "Accidente nuclear deja a 3 heridos y 2 muertos" ,
        fechaPubliacion: "202X-XX-XX XX:XX PM",
        contenido: "Por el sur de costa rica una explocion nuclear se expande afectando a mitad del pais."
    },
    { 
        titulo: "Accidente de gran escala en el sur",
        categoria: "Nacional",
        subtitulo: "Accidente nuclear deja a 3 heridos y 2 muertos" ,
        fechaPubliacion: "202X-XX-XX XX:XX PM",
        contenido: "Por el sur de costa rica una explocion nuclear se expande afectando a mitad del pais."
    },
];

// Function to sort events by date
function sortEvents() {
    /*events.sort: is a JavaScript method used to sort the elements of an array. This method modifies the original array and returns the sorted array.*/
    /*comparate by fechaHora to order*/
    return events.sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora));
}

// Show events 
function showEvents() {
    const eventsContainer = document.getElementById('eventContainer');
    sortEvents().forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('eventCard');
        
        eventCard.innerHTML = `
            <div class="eventHeader">${event.titulo}</div>
            <div class="eventDetail"><strong>Fecha y Hora:</strong> ${event.categoria}</div>
            <div class="eventDetail"><strong>Categoría:</strong> ${event.subtitulo}</div>
            <div class="eventDetail"><strong>Lugar:</strong> ${event.fechaPubliacion}</div>
            <div class="eventDetail"><strong>Descripción:</strong> ${event.contenido}</div>
        `;

        eventsContainer.appendChild(eventCard);
    });



    
}



// Execute the function to display events when the page loads
function addFooter(){
        let footer = document.createElement("footer");
        footer.innerHTML = `
             <div id="copyright">
            <p>&copy; 2025 Municipalidad de Montes de Oca</p>
            </div>

            <div id="logoFooter">
                <a href="../HTML/HomePage.html">
                    <img src="../IMG/logofooter.png" alt="logofooter">
                </a>
            </div>
        
            <div id="navFooter">
                <a href="../HTML/AdminPage.html">ADMINISTRADOR</a>
                <a href="../HTML/NewsPage.html">NOTICIAS</a>
                <a href="../HTML/NoticesPage.html">AVISOS</a>
                <a href="../HTML/ServicesPage.html">SERVICIOS</a>
                <a href="../HTML/ReportsPage.html">DENUNCIAS</a>
                <a href="../HTML/InitiativesPage.html">INICIATIVAS</a>
            </div>`;
        document.body.appendChild(footer);
}

window.onload = function() {
    showEvents();
    addFooter()
};