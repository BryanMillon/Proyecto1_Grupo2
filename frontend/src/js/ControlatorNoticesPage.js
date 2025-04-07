/*CONTROL THE EVENTS */

/*AFTER THEY COMES FROM THE DATABASE */

let events = []

const showEvents=async()=>{
    events =  await listar_avisos_BD();

    events.sort((a, b) => new Date(a.fechayhora) - new Date(b.fechayhora));


    const eventsContainer = document.getElementById('eventContainer');

    for(let i=0;i<events.length;i++){
        const eventCard = document.createElement('div');
        eventCard.classList.add('eventCard');
        
        eventCard.innerHTML = `
            <div class="eventHeader"> ${events[i]['nombre']}</div>
            <div class="eventDetail"><strong>Fecha y Hora:</strong> ${events[i]['fechayhora']}</div>
            <div class="eventDetail"><strong>Categoría:</strong>  ${events[i]['categoria']}</div>
            <div class="eventDetail"><strong>Lugar:</strong> ${events[i]['lugar']}</div>
            <div class="eventDetail"><strong>Descripción:</strong> ${events[i]['descripcion']}</div>
        `;

        eventsContainer.appendChild(eventCard);
    };

}


window.onload = function() {
    showEvents();
};