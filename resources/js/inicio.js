import { renderUltimasNoticias, renderProximosEventos} from './componentes.js';
import { showNewsDetail } from './noticias.js';
import {cargarDatos} from './componentes.js'

export default async function init() {
    try {
        const noticias = await cargarDatos('resources/data/noticias.json');
        const eventos = await cargarDatos('resources/data/eventos.json');

        renderUltimasNoticias('ultimasNoticiasInicio', noticias, 2);
        renderProximosEventos('proximosEventosInicio', eventos, 3);

        document.getElementById('ultimasNoticiasInicio')?.addEventListener('click', function(e) {
            if (e.target.classList.contains('news-btn')) {
                const id = e.target.getAttribute('data-id');
                showNewsDetail(id);
            }
        });
    } catch (error) {
        console.error(error);
    }
}