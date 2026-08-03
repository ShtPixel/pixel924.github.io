export async function cargarDatos(ruta){
    const respuesta = await fetch(ruta);
    if (!respuesta.ok) {
        throw new Error (`No se pudo cargar $[ruta]`);
    }
    return respuesta.json();
}


// Array de ejemplo de noticias (puedes cargarlo dinámicamente en el futuro)
export const noticiasEjemplo = [

];

// Renderiza un bloque de noticias en el contenedor indicado
export function renderUltimasNoticias(containerId, noticias, max = 2) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    noticias.slice(0, max).forEach(noticia => {
        container.innerHTML += `
            <div class="news-card">
                <img src="${noticia.img}" alt="${noticia.titulo}" class="news-img">
                <div class="news-title">${noticia.titulo}</div>
                <div class="news-category">${noticia.categoria}</div>
                <div class="news-date">${noticia.fecha}</div>
                <p class="news-summary">${noticia.resumen}</p>
                <button class="news-btn" data-id="${noticia.id}">Leer Más</button>
            </div>
        `;
    });
}

export function renderNoticias(containerId, noticias) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    noticias.forEach((noticia, idx) => {
        container.innerHTML += `
            <div class="news-card" data-id="${noticia.id}">
                <img src="${noticia.img}" alt="${noticia.titulo}" class="news-img">
                <div class="news-title">${noticia.titulo}</div>
                <div class="news-category">${noticia.categoria}</div>
                <div class="news-date">${formateaFecha(noticia.fecha)}</div>
                <p class="news-summary">${noticia.resumen}</p>
                <button class="news-btn" data-id="${noticia.id}">Leer Más</button>
            </div>
        `;
    });
}

export const eventosEjemplo = [

    // ...agrega más eventos...
];

export function renderEventos(containerId, eventos) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    eventos.forEach(evento => {
        container.innerHTML += `
            <div class="news-card event-card" data-id="${evento.id}">
                <img src="${evento.img}" alt="${evento.titulo}" class="news-img event-img">
                <div class="news-title event-title">${evento.titulo}</div>
                <div class="news-category event-type">${evento.tipo}</div>
                <div class="news-category event-vereda">${evento.vereda}</div>
                <div class="news-date event-date">${formateaFecha(evento.fecha)}</div>
                <p class="news-summary event-summary">${evento.resumen}</p>
                <button class="news-btn event-btn" data-id="${evento.id}">Ver Detalle</button>
            </div>
        `;
    });
}

export const galeriaEjemplo = [

    // ...más imágenes...
];

export function renderGaleria(containerId, imagenes) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    imagenes.forEach(img => {
        container.innerHTML += `
            <div class="gallery-card" data-id="${img.id}">
                <img src="${img.img}" alt="${img.titulo}" class="gallery-img">
                <div class="gallery-title">${img.titulo}</div>
                <div class="gallery-category">${img.categoria}</div>
                <div class="gallery-year">${img.año}</div>
                <button class="gallery-btn" data-id="${img.id}">Ver Imagen</button>
            </div>
        `;
    });
}

function formateaFecha(fecha) {
    const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
    const [a, m, d] = fecha.split("-");
    return `${parseInt(d)} de ${meses[parseInt(m)-1]}, ${a}`;
}

export function renderProximosEventos(containerId, eventos, max = 3) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    eventos
        .sort((a, b) => a.fecha.localeCompare(b.fecha))
        .slice(0, max)
        .forEach(evento => {
            const [a, m, d] = evento.fecha.split('-');
            container.innerHTML += `
                <div class="event-item">
                    <div class="event-date-box">
                        ${parseInt(d)}<br><span>${["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"][parseInt(m)-1]}</span>
                    </div>
                    <div class="event-info">${evento.titulo}</div>
                </div>
            `;
        });
}
