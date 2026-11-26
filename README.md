# Lada Rodriguez — Portfolio Full Stack

Portfolio personal estático desarrollado con **Astro**, HTML semántico, CSS modular y TypeScript ligero.

## Cómo abrirlo

1. Instalá Node.js LTS.
2. Ejecutá `npm install`.
3. Ejecutá `npm run dev`.

## Estructura

```text
src/
├── components/       # Secciones y estilos aislados
├── data/             # Contenido tipado
├── layouts/          # Metadatos y estructura de documento
├── pages/            # Rutas Astro
└── styles/           # Tokens y estilos globales
public/
└── assets/
    ├── images/
    │   ├── nodo-concept.svg
    │   ├── formostock-concept.svg
    │   └── beautysystem-concept.svg
    └── icons/
        └── favicon.svg
```

## Cómo editar

- **Nombre, presentación, contacto y metadatos:** `src/layouts/BaseLayout.astro` y componentes.
- **Selección editorial de proyectos:** `src/data/proyectos.ts`.
- **Colores y espaciados:** `src/styles/tokens.css`.
- **Carrera/institución/estado:** se administra desde el contenido del portfolio y sus secciones de formación.
- **GitHub:** enlaces a `https://github.com/ladardrgz` en `index.html`.
- **LinkedIn:** omitido deliberadamente porque la titular indicó que no tiene uno.
- **CV:** el botón de descarga entrega el documento Word disponible en `public/assets/cv/`.
- **Proyectos sin demo:** no se incluyen enlaces de demostración falsos. Si publicás una demo, añadí su URL verificada.

## Fuentes de contenido

La información sobre perfil, tecnologías, proceso y proyectos se extrajo del README público: https://github.com/ladardrgz/ladardrgz (consultado en noviembre de 2026). También se consultó el repositorio de BeautySystem. FormoStock y BeautySystem se vinculan a sus repositorios públicos verificados.

**Precisión editorial:** Nodo se indica como *en desarrollo*; no se inventaron cifras de experiencia, clientes, certificaciones, empleadores o demos. Los tres SVG de proyectos son **ilustraciones originales para mostrar la idea**, no capturas verificadas de las aplicaciones.

## Accesibilidad y comportamiento

Incluye skip link, HTML semántico, menú móvil con `aria-expanded` y cierre con Escape, estados de foco visibles, diseño responsive, animaciones que respetan `prefers-reduced-motion`, enlaces funcionales, navegación por anclas y un botón para copiar el correo (con fallback para `file://`).

## Personalización importante antes de publicar

1. Completá los datos reales de formación académica.
2. Reemplazá las ilustraciones por capturas reales cuando las tengas.
3. Comprobá los enlaces públicos a FormoStock y BeautySystem después de publicarlo.
4. Actualizá el estado de Nodo si cambia y añadí el repositorio o la demo solo cuando estén públicos.
5. Si conocés la URL final del portfolio, añadí una etiqueta `<link rel="canonical">` y una imagen Open Graph con URL absoluta.
