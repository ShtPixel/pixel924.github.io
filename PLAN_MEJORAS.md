# Plan de mejoras para Mi Terre

Este documento organiza el trabajo en tareas pequenas, claras y accionables. La idea es mejorar el proyecto paso a paso sin romper lo que ya funciona.

## Objetivo general

Convertir Mi Terre en un sitio comunitario mas claro, mantenible, accesible y facil de actualizar.

## Como usar este plan

1. Trabaja una tarea a la vez.
2. Antes de cambiar archivos, revisa la seccion indicada.
3. Al terminar una tarea, prueba el sitio en navegador.
4. Marca la tarea como completada cambiando `[ ]` por `[x]`.
5. Si una tarea crece demasiado, dividela en subtareas mas pequenas.

## Fase 1: Orden basico del proyecto

Estas tareas preparan el proyecto para trabajar con mas seguridad.

### 1. Crear archivo `.gitignore`

- [ ] Crear un archivo `.gitignore` en la raiz del proyecto.
- [ ] Agregar reglas para evitar subir archivos del editor y archivos temporales.

Instrucciones:

```gitignore
.idea/
.DS_Store
Thumbs.db
*.log
```

Criterio de terminado:

- `git status` ya no debe mostrar la carpeta `.idea/` como archivo pendiente.

### 2. Crear `README.md`

- [ ] Crear un archivo `README.md`.
- [ ] Explicar que es Mi Terre.
- [ ] Explicar como abrir el proyecto.
- [ ] Describir la estructura principal de carpetas.

Contenido sugerido:

```md
# Mi Terre

Sistema de informacion comunitario para publicar noticias, eventos y contenido local.

## Como abrir el proyecto

Abre `index.html` en el navegador o publica el repositorio con GitHub Pages.

## Estructura

- `index.html`: entrada principal del sitio.
- `resources/html/`: secciones cargadas dinamicamente.
- `resources/css/`: estilos del sitio.
- `resources/js/`: logica de rutas, componentes y paginas.
- `resources/images/`: imagenes locales.
```

Criterio de terminado:

- Cualquier persona debe entender para que sirve el proyecto y como abrirlo.

## Fase 2: Separar datos de la logica

Actualmente las noticias, eventos y galeria estan dentro de `resources/js/componentes.js`. Esto hace mas dificil actualizar contenido.

### 3. Crear carpeta `resources/data`

- [ ] Crear la carpeta `resources/data`.
- [ ] Crear archivos JSON para datos del sitio.

Archivos propuestos:

```text
resources/data/noticias.json
resources/data/eventos.json
resources/data/galeria.json
```

Criterio de terminado:

- La carpeta existe y contiene los tres archivos JSON.

### 4. Mover noticias a `noticias.json`

- [ ] Copiar los datos de `noticiasEjemplo` desde `componentes.js`.
- [ ] Convertirlos en JSON valido.
- [ ] Revisar que no queden comas sobrantes ni comentarios.

Estructura esperada:

```json
[
  {
    "id": 1,
    "titulo": "Titulo de la noticia",
    "categoria": "Salud",
    "fecha": "2025-06-15",
    "img": "ruta-o-url-de-imagen",
    "resumen": "Resumen corto de la noticia."
  }
]
```

Criterio de terminado:

- El archivo `noticias.json` abre correctamente como JSON.

### 5. Mover eventos a `eventos.json`

- [ ] Copiar los datos de `eventosEjemplo`.
- [ ] Convertirlos en JSON valido.
- [ ] Mantener el arreglo `actividades` para cada evento.

Estructura esperada:

```json
[
  {
    "id": 1,
    "titulo": "Nombre del evento",
    "tipo": "Cultural",
    "vereda": "Centro",
    "fecha": "2025-08-01",
    "hora": "2:00 PM",
    "lugar": "Salon Cultural",
    "organizador": "Nombre del organizador",
    "resumen": "Descripcion corta del evento.",
    "actividades": [
      "Actividad 1",
      "Actividad 2"
    ],
    "img": "ruta-o-url-de-imagen"
  }
]
```

Criterio de terminado:

- Los eventos se pueden editar sin tocar codigo JavaScript.

### 6. Mover galeria a `galeria.json`

- [ ] Copiar los datos de `galeriaEjemplo`.
- [ ] Convertirlos en JSON valido.
- [ ] Cambiar la propiedad `año` por `anio` para evitar caracteres especiales en nombres de campos.

Estructura esperada:

```json
[
  {
    "id": 1,
    "titulo": "Festival Cultural",
    "categoria": "eventos",
    "anio": "2025",
    "evento": "festival",
    "img": "ruta-o-url-de-imagen",
    "descripcion": "Descripcion de la imagen."
  }
]
```

Criterio de terminado:

- La galeria queda lista para crecer con mas imagenes.

## Fase 3: Mejorar la carga de datos

Estas tareas conectan los nuevos JSON con el sitio.

### 7. Crear funcion reutilizable para cargar JSON

- [ ] Crear una funcion `cargarDatos(ruta)` en JavaScript.
- [ ] Usar `fetch` para leer archivos JSON.
- [ ] Manejar errores con `try/catch`.

Ejemplo:

```js
export async function cargarDatos(ruta) {
    const respuesta = await fetch(ruta);
    if (!respuesta.ok) {
        throw new Error(`No se pudo cargar ${ruta}`);
    }
    return respuesta.json();
}
```

Criterio de terminado:

- Noticias, eventos y galeria pueden usar la misma funcion.

### 8. Actualizar pagina de inicio

- [ ] Cargar noticias desde `resources/data/noticias.json`.
- [ ] Cargar eventos desde `resources/data/eventos.json`.
- [ ] Mostrar noticias destacadas y proximos eventos con esos datos.

Criterio de terminado:

- La pagina de inicio ya no depende de datos escritos directamente en `componentes.js`.

### 9. Actualizar pagina de noticias

- [ ] Cargar noticias desde JSON.
- [ ] Mantener filtros por categoria, fecha y busqueda.
- [ ] Mostrar un mensaje si no hay resultados.

Mensaje sugerido:

```html
<p class="text-center text-muted">No se encontraron noticias.</p>
```

Criterio de terminado:

- Los filtros siguen funcionando con los datos externos.

### 10. Actualizar pagina de eventos

- [ ] Cargar eventos desde JSON.
- [ ] Mantener filtros por tipo, vereda y busqueda.
- [ ] Mantener calendario de eventos.
- [ ] Mostrar un mensaje si no hay resultados.

Criterio de terminado:

- La pagina de eventos funciona igual, pero con datos externos.

## Fase 4: Mejoras visuales y responsive

Estas tareas hacen que el sitio se vea mas profesional en celular y escritorio.

### 11. Mejorar portada de inicio

- [ ] Reemplazar el titulo simple por una seccion principal mas clara.
- [ ] Incluir una frase corta sobre la comunidad.
- [ ] Agregar una accion principal hacia eventos o noticias.

Ejemplo de contenido:

```html
<section class="home-hero">
    <h1>Mi Terre</h1>
    <p>Noticias, eventos e informacion comunitaria en un solo lugar.</p>
    <a href="#/eventos" class="btn btn-primary">Ver eventos</a>
</section>
```

Criterio de terminado:

- Al entrar al sitio se entiende inmediatamente que es Mi Terre.

### 12. Mejorar tarjetas

- [ ] Unificar estilos de tarjetas de noticias, eventos y galeria.
- [ ] Revisar alturas, espaciado y alineacion.
- [ ] Evitar que textos largos rompan el diseno.

Criterio de terminado:

- Las tarjetas se ven consistentes y funcionan bien en movil.

### 13. Mejorar calendario en movil

- [ ] Revisar el calendario en pantallas pequenas.
- [ ] Reducir tamano de botones si es necesario.
- [ ] Evitar que el titulo del mes y los botones se encimen.

Criterio de terminado:

- La pagina de eventos se puede usar comodamente desde celular.

## Fase 5: Accesibilidad y semantica

Estas tareas ayudan a que el sitio sea mas claro para navegadores, lectores de pantalla y buscadores.

### 14. Usar encabezados reales

- [ ] Cambiar titulos principales de `div` a `h1`.
- [ ] Cambiar titulos de seccion a `h2`.
- [ ] Mantener una jerarquia clara: `h1`, luego `h2`, luego `h3`.

Criterio de terminado:

- Cada pagina tiene un solo `h1`.

### 15. Mejorar textos alternativos de imagenes

- [ ] Revisar todos los `alt`.
- [ ] Evitar textos genericos.
- [ ] Describir brevemente el contenido de la imagen.

Ejemplo:

```html
<img src="..." alt="Personas participando en una actividad cultural comunitaria">
```

Criterio de terminado:

- Las imagenes importantes tienen descripcion util.

### 16. Mejorar foco de teclado

- [ ] Agregar estilos visibles para `:focus-visible`.
- [ ] Probar navegacion usando la tecla Tab.

Ejemplo:

```css
a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible {
    outline: 3px solid #f5b700;
    outline-offset: 3px;
}
```

Criterio de terminado:

- Se ve claramente que elemento esta seleccionado con teclado.

## Fase 6: SEO y publicacion

Estas tareas mejoran como se ve el sitio en buscadores y al compartir enlaces.

### 17. Mejorar metadatos en `index.html`

- [ ] Agregar `description`.
- [ ] Agregar metadatos Open Graph.
- [ ] Revisar titulo principal del sitio.

Ejemplo:

```html
<meta name="description" content="Mi Terre es un sistema de informacion comunitario para consultar noticias, eventos y actividades locales.">
<meta property="og:title" content="Mi Terre">
<meta property="og:description" content="Noticias, eventos e informacion comunitaria en un solo lugar.">
<meta property="og:type" content="website">
```

Criterio de terminado:

- El sitio tiene informacion basica para buscadores y redes sociales.

### 18. Agregar favicon

- [ ] Crear o elegir un icono simple del proyecto.
- [ ] Guardarlo en `resources/images/`.
- [ ] Referenciarlo desde `index.html`.

Ejemplo:

```html
<link rel="icon" href="resources/images/favicon.png" type="image/png">
```

Criterio de terminado:

- El navegador muestra un icono para la pestana del sitio.

### 19. Crear `robots.txt`

- [ ] Crear `robots.txt` en la raiz.
- [ ] Permitir indexacion general.

Contenido sugerido:

```txt
User-agent: *
Allow: /
```

Criterio de terminado:

- El archivo existe en la raiz del proyecto.

## Fase 7: Funcionalidades futuras

Estas tareas no son urgentes, pero pueden darle mas valor al proyecto.

### 20. Activar galeria

- [ ] Revisar si `galeria.html` y `galeria.js` estan completos.
- [ ] Quitar la clase `d-none` del enlace de galeria en `index.html`.
- [ ] Probar modal de imagen.

Criterio de terminado:

- La galeria se puede abrir desde el menu principal.

### 21. Compartir eventos por WhatsApp

- [ ] Construir un mensaje con titulo, fecha y lugar.
- [ ] Generar enlace `https://wa.me/?text=...`.
- [ ] Activar el boton de compartir en el modal de eventos.

Criterio de terminado:

- El usuario puede compartir un evento desde el sitio.

### 22. Agregar paginacion o limite de resultados

- [ ] Definir cuantos elementos se muestran por pagina.
- [ ] Agregar botones de pagina anterior y siguiente.
- [ ] Mantener filtros funcionando junto con la paginacion.

Criterio de terminado:

- Listas largas no hacen que la pagina sea incomoda.

## Orden recomendado para empezar

1. Tarea 1: Crear `.gitignore`.
2. Tarea 2: Crear `README.md`.
3. Tarea 3: Crear `resources/data`.
4. Tarea 4: Mover noticias a JSON.
5. Tarea 5: Mover eventos a JSON.
6. Tarea 7: Crear funcion para cargar JSON.
7. Tarea 8: Actualizar inicio.
8. Tarea 9: Actualizar noticias.
9. Tarea 10: Actualizar eventos.

## Notas importantes

- No conviene redisenar todo antes de separar los datos.
- Primero hay que hacer que el contenido sea facil de actualizar.
- Despues se puede mejorar el diseno con menos riesgo.
- Cada cambio debe probarse en escritorio y movil.
- Si una tarea rompe algo, se debe corregir antes de pasar a la siguiente.
