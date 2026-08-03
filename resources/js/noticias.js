import { renderNoticias, cargarDatos } from './componentes.js';

let noticias = [];
let noticiasActuales = [];

function filterNews() {
    const categoria = document.getElementById('categoriaFilter').value;
    const fecha = document.getElementById('fechaFilter').value;
    const busqueda = document.getElementById('searchInput').value.toLowerCase();

    noticiasActuales = noticias.filter(noticia => {
        let match = true;
        if (categoria && noticia.categoria.toLowerCase() !== categoria.toLowerCase()) match = false;
        if (fecha && noticia.fecha !== fecha) match = false;
        if (busqueda && !noticia.titulo.toLowerCase().includes(busqueda) && !noticia.resumen.toLowerCase().includes(busqueda)) match = false;
        return match;
    });

    renderNoticias('newsContainer', noticiasActuales);

    if (noticiasActuales.length === 0) {
            document.getElementById('newsContainer').innerHTML =
                '<p class="text-center text-muted">No se encontraron noticias.</p>';
        }
}

export function showNewsDetail(id, listaNoticias = noticias ) {
    const noticia = listaNoticias.find(n => n.id == id);
    if (!noticia) return;
    document.getElementById('newsDetailLabel').textContent = noticia.titulo;
    document.getElementById('newsDetailImage').src = noticia.img;
    document.getElementById('newsDetailContent').innerHTML = `
        <div class="news-category">${noticia.categoria}</div>
        <div class="news-date">${noticia.fecha}</div>
        <p>${noticia.resumen}</p>
    `;
    const modal = new bootstrap.Modal(document.getElementById('newsDetailModal'));
    modal.show();
}

export default async function init() {
try{
    noticias = await cargarDatos('resources/data/noticias.json');
    noticiasActuales = [...noticias];

    renderNoticias('newsDestacadas', noticias.slice(0, 2));
    renderNoticias('newsContainer', noticias);

    document.getElementById('categoriaFilter')?.addEventListener('change', filterNews);
    document.getElementById('fechaFilter')?.addEventListener('change', filterNews);
    document.getElementById('searchInput')?.addEventListener('input', filterNews);

    document.getElementById('newsContainer')?.addEventListener('click', function(e) {
        if (e.target.classList.contains('news-btn')) {
            const id = e.target.getAttribute('data-id');
            showNewsDetail(id);
        }
    });
    document.getElementById('newsDestacadas')?.addEventListener('click', function(e) {
        if (e.target.classList.contains('news-btn')) {
            const id = e.target.getAttribute('data-id');
            showNewsDetail(id);
        }
    });
    } catch (error) {
    console.error(error);
    document.getElementById('newsContainer').innerHTML =
                '<p class="text-center text-muted">No se pudieron cargar las noticias.</p>';

    }
}