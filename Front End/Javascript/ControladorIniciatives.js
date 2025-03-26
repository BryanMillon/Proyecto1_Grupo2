const iniciativas = [
    {
        titulo: "Mejoras en parques locales",
        categoria: "Infraestructura",
        distrito: "San Pedro"
    },
    {
        titulo: "Reciclaje puerta a puerta",
        categoria: "Medio Ambiente",
        distrito: "Sabanilla"
    },
    {
        titulo: "Clases de computación para adultos mayores",
        categoria: "Educación",
        distrito: "Mercedes"
    },
    {
        titulo: "Huertas comunitarias",
        categoria: "Agricultura Urbana",
        distrito: "San Rafael"
    },
    {
        titulo: "Seguridad ciudadana",
        categoria: "Seguridad",
        distrito: "San Pedro"
    }
];

function mostrarIniciativas() {
    const container = document.getElementById('initiativeContainer');

    iniciativas.forEach(ini => {
        const card = document.createElement('div');
        card.classList.add('newCard');
        card.innerHTML = `
            <div class="newsHeader">${ini.titulo}</div>
            <div class="newsDetail"><strong>Categoría:</strong> ${ini.categoria}</div>
            <div class="newsDetail"><strong>Distrito afectado:</strong> ${ini.distrito}</div>
        `;
        container.appendChild(card);
    });
}

window.onload = function () {
    mostrarIniciativas();
};
