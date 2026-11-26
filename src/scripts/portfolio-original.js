
'use strict';

/* =====================================================
   PORTFOLIO PERSONAL — LADA ELIZABET RODRIGUEZ
   Archivo: js/script.js

   Funcionalidades:
   1. Título dinámico de la pestaña.
   2. Año automático del pie de página.
   3. Menú de navegación para celulares.
   4. Sección activa en la navegación.
   5. Aparición suave de los elementos.
   6. Copiar el correo electrónico.
   7. Carrusel de repositorios públicos de GitHub.

   Los nombres propios de variables y funciones
   están escritos en español. Los métodos nativos
   de JavaScript conservan su sintaxis oficial.
   ===================================================== */

(() => {

  // ===================================================
  // 1. ELEMENTOS GENERALES DEL PORTFOLIO
  // ===================================================

  const botonMenu = document.querySelector('.menu-boton');

  const navegacion = document.getElementById(
    'navegacion-principal'
  );

  const enlacesNavegacion = [
    ...document.querySelectorAll('.navegacion-enlace')
  ];

  const elementoAnio = document.getElementById(
    'anio-actual'
  );

  const botonCopiarCorreo = document.querySelector(
    '[data-copiar-correo]'
  );

  // ===================================================
  // 2. TÍTULO DINÁMICO DE LA PESTAÑA
  // ===================================================

  const titulosPestana = [
    'Lada Elizabet Rodriguez',
    'Software Developer | Web Applications'
  ];

  let indiceTituloActual = 0;
  let intervaloTitulo = null;

  function mostrarTituloPestana() {
    document.title = titulosPestana[indiceTituloActual];
  }

  function detenerAlternanciaTitulo() {

    if (intervaloTitulo !== null) {
      window.clearInterval(intervaloTitulo);
      intervaloTitulo = null;
    }

  }

  function iniciarAlternanciaTitulo() {

    detenerAlternanciaTitulo();

    if (document.hidden) return;

    intervaloTitulo = window.setInterval(() => {

      indiceTituloActual =
        (indiceTituloActual + 1) % titulosPestana.length;

      mostrarTituloPestana();

    }, 4000);

  }

  mostrarTituloPestana();
  iniciarAlternanciaTitulo();

  document.addEventListener('visibilitychange', () => {

    if (document.hidden) {
      detenerAlternanciaTitulo();
      return;
    }

    indiceTituloActual = 0;

    mostrarTituloPestana();
    iniciarAlternanciaTitulo();

  });

  // ===================================================
  // 3. AÑO ACTUAL EN EL PIE DE PÁGINA
  // ===================================================

  if (elementoAnio) {

    elementoAnio.textContent = String(
      new Date().getFullYear()
    );

  }

  // ===================================================
  // 4. MENÚ DE NAVEGACIÓN PARA CELULARES
  // ===================================================

  function cerrarMenu(devolverFoco = false) {

    if (!botonMenu || !navegacion) return;

    const estabaAbierto =
      botonMenu.getAttribute('aria-expanded') === 'true';

    navegacion.classList.remove('abierto');

    botonMenu.setAttribute(
      'aria-expanded',
      'false'
    );

    botonMenu.setAttribute(
      'aria-label',
      'Abrir menú'
    );

    if (devolverFoco && estabaAbierto) {
      botonMenu.focus();
    }

  }

  if (botonMenu && navegacion) {

    // Abrir o cerrar el menú.

    botonMenu.addEventListener('click', () => {

      const debeAbrirse =
        botonMenu.getAttribute('aria-expanded') !== 'true';

      navegacion.classList.toggle(
        'abierto',
        debeAbrirse
      );

      botonMenu.setAttribute(
        'aria-expanded',
        String(debeAbrirse)
      );

      botonMenu.setAttribute(
        'aria-label',
        debeAbrirse ? 'Cerrar menú' : 'Abrir menú'
      );

    });

    // Cerrar al seleccionar una sección.

    enlacesNavegacion.forEach(enlace => {

      enlace.addEventListener('click', () => {
        cerrarMenu();
      });

    });

    // Cerrar con Escape.

    document.addEventListener('keydown', evento => {

      if (evento.key === 'Escape') {
        cerrarMenu(true);
      }

    });

    // Cerrar al hacer clic fuera de la navegación.

    document.addEventListener('click', evento => {

      if (
        !navegacion.contains(evento.target) &&
        !botonMenu.contains(evento.target)
      ) {
        cerrarMenu();
      }

    });

    // Cerrar al regresar al diseño de escritorio.

    window.addEventListener('resize', () => {

      if (window.innerWidth > 850) {
        cerrarMenu();
      }

    });

  }

  // ===================================================
  // 5. SECCIÓN ACTIVA EN LA NAVEGACIÓN
  // ===================================================

  const identificadoresSecciones = [
    'inicio',
    'sobre-mi',
    'proyectos',
    'tecnologias',
    'contacto'
  ];

  const secciones = identificadoresSecciones
    .map(identificador => {

      return document.getElementById(identificador);

    })
    .filter(Boolean);

  function marcarEnlaceActivo(identificadorActivo) {

    enlacesNavegacion.forEach(enlace => {

      const estaActivo =
        enlace.getAttribute('href') ===
        `#${identificadorActivo}`;

      enlace.classList.toggle(
        'activo',
        estaActivo
      );

      if (estaActivo) {

        enlace.setAttribute(
          'aria-current',
          'page'
        );

      } else {

        enlace.removeAttribute('aria-current');

      }

    });

  }

  /*
    La cabecera tiene el id="inicio" y es sticky.

    Por eso calculamos la sección desde el
    desplazamiento, en vez de observar esa
    cabecera como una sección normal.
  */

  function actualizarNavegacionActiva() {

    if (secciones.length === 0) return;

    const distanciaSuperior = Math.min(
      260,
      Math.max(170, window.innerHeight * .3)
    );

    let identificadorActivo = 'inicio';

    for (const seccion of secciones) {

      if (seccion.id === 'inicio') {
        continue;
      }

      if (
        seccion.getBoundingClientRect().top <=
        distanciaSuperior
      ) {
        identificadorActivo = seccion.id;
      }

    }

    marcarEnlaceActivo(identificadorActivo);

  }

  let navegacionPendiente = false;

  function programarActualizacionNavegacion() {

    if (navegacionPendiente) return;

    navegacionPendiente = true;

    window.requestAnimationFrame(() => {

      actualizarNavegacionActiva();

      navegacionPendiente = false;

    });

  }

  window.addEventListener(
    'scroll',
    programarActualizacionNavegacion,
    { passive: true }
  );

  window.addEventListener(
    'resize',
    programarActualizacionNavegacion
  );

  actualizarNavegacionActiva();

  // ===================================================
  // 6. ANIMACIONES AL DESPLAZARSE
  // ===================================================

  const consultaMovimientoReducido = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  if (
    !consultaMovimientoReducido.matches &&
    'IntersectionObserver' in window
  ) {

    const elementosAnimados = document.querySelectorAll(
      '.aparecer'
    );

    if (elementosAnimados.length > 0) {

      document.documentElement.classList.add(
        'javascript-listo'
      );

      const observadorAnimaciones =
        new IntersectionObserver(

          entradas => {

            entradas.forEach(entrada => {

              if (!entrada.isIntersecting) {
                return;
              }

              entrada.target.classList.add(
                'visible'
              );

              observadorAnimaciones.unobserve(
                entrada.target
              );

            });

          },

          {
            rootMargin: '0px 0px -45px 0px',
            threshold: 0.08
          }

        );

      elementosAnimados.forEach(elemento => {

        observadorAnimaciones.observe(elemento);

      });

    }

  }

  // ===================================================
  // 7. COPIAR EL CORREO ELECTRÓNICO
  // ===================================================

  async function copiarTexto(texto) {

    /*
      Método preferido para sitios con HTTPS
      o ejecutados desde localhost.
    */

    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {

      try {

        await navigator.clipboard.writeText(texto);

        return true;

      } catch (error) {

        // Intentamos el método alternativo.

      }

    }

    /*
      Alternativa para navegadores antiguos
      o cuando abrimos el HTML como archivo local.
    */

    const campoTemporal = document.createElement(
      'textarea'
    );

    campoTemporal.value = texto;

    campoTemporal.setAttribute(
      'readonly',
      ''
    );

    campoTemporal.style.position = 'fixed';
    campoTemporal.style.left = '-9999px';
    campoTemporal.style.opacity = '0';

    document.body.appendChild(campoTemporal);

    campoTemporal.select();

    let pudoCopiar = false;

    try {

      pudoCopiar = document.execCommand('copy');

    } catch (error) {

      pudoCopiar = false;

    } finally {

      campoTemporal.remove();

    }

    return pudoCopiar;

  }

  if (botonCopiarCorreo) {

    const contenidoOriginal =
      botonCopiarCorreo.innerHTML;

    let temporizadorMensaje = null;

    botonCopiarCorreo.addEventListener(
      'click',
      async () => {

        const correo = botonCopiarCorreo.getAttribute(
          'data-copiar-correo'
        );

        if (!correo) return;

        const pudoCopiar = await copiarTexto(correo);

        botonCopiarCorreo.textContent = pudoCopiar
          ? '¡Correo copiado!'
          : 'No se pudo copiar. Usá el enlace de correo.';

        window.clearTimeout(temporizadorMensaje);

        temporizadorMensaje = window.setTimeout(() => {

          botonCopiarCorreo.innerHTML =
            contenidoOriginal;

        }, 2800);

      }
    );

  }

  // ===================================================
  // 8. CARRUSEL DE FLASHCARDS DE GITHUB
  // ===================================================

  const carrusel = document.getElementById(
    'carrusel-repositorios'
  );

  const botonAnterior = document.getElementById(
    'repositorios-anterior'
  );

  const botonSiguiente = document.getElementById(
    'repositorios-siguiente'
  );

  const contador = document.getElementById(
    'repositorios-contador'
  );

  const progreso = document.getElementById(
    'repositorios-progreso'
  );

  if (
    !carrusel ||
    !botonAnterior ||
    !botonSiguiente ||
    !contador ||
    !progreso
  ) {

    return;

  }

  /*
    COMPATIBILIDAD CON EL HTML ANTERIOR

    Una versión previa de index.html ya traía
    el código del carrusel dentro de un <script>
    al final del archivo.

    Mientras siga allí, ese código se encarga
    del carrusel y evitamos registrar los eventos
    y consultar GitHub dos veces.

    Si quitás ese bloque del final del HTML,
    este archivo se encarga del carrusel.
  */

  const existeCarruselIntegradoEnHTML = [
    ...document.querySelectorAll('script:not([src])')
  ].some(guion => {

    const contenido = guion.textContent || '';

    return (
      contenido.includes('const usuarioGitHub') &&
      contenido.includes('function cargarRepositorios()')
    );

  });

  if (existeCarruselIntegradoEnHTML) {
    return;
  }

  // ===================================================
  // 9. REPOSITORIOS Y DATOS CONOCIDOS
  // ===================================================

  const usuarioGitHub = 'ladardrgz';

  /*
    Estos proyectos aparecen primero,
    siempre que sean repositorios públicos.
  */

  const repositoriosDestacados = [
    'nodo-web-platform',
    'issrc-web',
    'digital_visibility_project',
    'formostock-pos',
    'beauty-system',
    'plena-salud-belleza',
    'fast-food-system',
    'cr-belleza-integral'
  ];

  /*
    Estos son los títulos y las descripciones
    breves que ya definimos para el portfolio.

    Los repositorios nuevos utilizan la
    información que devuelve GitHub.
  */

  const proyectosConocidos = {

    'nodo-web-platform': {

      titulo: 'Nodo',

      tipo: 'Aplicación web',

      descripcion:
        'Gestión y seguimiento de reparaciones para servicios técnicos.'

    },

    'issrc-web': {

      titulo: 'ISS',

      tipo: 'Sitio institucional',

      descripcion:
        'Sitio web institucional para formación superior sanitaria en Formosa.'

    },

    'formostock-pos': {

      titulo: 'FormoStock',

      tipo: 'Sistema de gestión',

      descripcion:
        'Punto de venta e inventario para comercios de insumos informáticos.'

    },

    'beauty-system': {

      titulo: 'BeautySystem',

      tipo: 'Comercio electrónico',

      descripcion:
        'Comercio electrónico y administración de productos de belleza.'

    },

    'fast-food-system': {

      titulo: 'FastFoodSystem',

      tipo: 'Sistema gastronómico',

      descripcion:
        'Maqueta funcional gastronómica con autenticación, roles y módulos comerciales.'

    },

    'jack-motos-fsa': {

      titulo: 'Jack Motos Formosa',

      tipo: 'Landing page',

      descripcion:
        'Landing page de demostración para un comercio de repuestos de motos.'

    },

    'digital_visibility_project': {

      titulo: 'Digital Visibility',

      tipo: 'Desarrollo web',

      descripcion:
        'Presentación de servicios de desarrollo web y visibilidad digital.'

    },

    'ladardrgz': {

      titulo: 'Perfil de GitHub',

      tipo: 'Perfil técnico',

      descripcion:
        'Presentación profesional, tecnologías y proyectos destacados.'

    }

  };

  // ===================================================
  // 10. MEDIDAS Y CONTROLES DEL CARRUSEL
  // ===================================================

  function obtenerTarjetas() {

    return [
      ...carrusel.querySelectorAll('.repositorio-tarjeta')
    ];

  }

  function obtenerDistanciaTarjeta(tarjetas) {

    if (tarjetas.length === 0) {
      return 0;
    }

    if (tarjetas.length === 1) {

      return tarjetas[0]
        .getBoundingClientRect()
        .width;

    }

    return (
      tarjetas[1].offsetLeft -
      tarjetas[0].offsetLeft
    );

  }

  function actualizarControles() {

    const tarjetas = obtenerTarjetas();

    const cantidad = tarjetas.length;

    if (!cantidad) {

      contador.textContent = '00 / 00';

      progreso.style.width = '0%';

      botonAnterior.disabled = true;
      botonSiguiente.disabled = true;

      return;

    }

    const distancia = obtenerDistanciaTarjeta(
      tarjetas
    );

    if (!distancia) return;

    /*
      Las pantallas pequeñas pueden mostrar
      parte de la tarjeta siguiente.

      Para el contador tomamos como referencia
      las tarjetas que ocupan el espacio visible.
    */

    const visibles = Math.max(
      1,
      Math.round(
        carrusel.clientWidth / distancia
      )
    );

    const inicio = Math.min(

      Math.round(
        carrusel.scrollLeft / distancia
      ),

      Math.max(
        0,
        cantidad - visibles
      )

    );

    const primera = inicio + 1;

    const ultima = Math.min(
      cantidad,
      inicio + visibles
    );

    const numero = valor => {
      return String(valor).padStart(2, '0');
    };

    contador.textContent =
      `${numero(primera)}–` +
      `${numero(ultima)} / ` +
      `${numero(cantidad)}`;

    progreso.style.width =
      `${(ultima / cantidad) * 100}%`;

    const desplazamientoMaximo = Math.max(
      0,
      carrusel.scrollWidth - carrusel.clientWidth
    );

    botonAnterior.disabled =
      carrusel.scrollLeft <= 4;

    botonSiguiente.disabled =
      carrusel.scrollLeft >=
      desplazamientoMaximo - 4;

  }

  function moverCarrusel(direccion) {

    const distancia = obtenerDistanciaTarjeta(
      obtenerTarjetas()
    );

    if (!distancia) return;

    carrusel.scrollBy({

      left: distancia * direccion,

      behavior: consultaMovimientoReducido.matches
        ? 'auto'
        : 'smooth'

    });

  }

  // Botones para avanzar o retroceder.

  botonAnterior.addEventListener('click', () => {

    moverCarrusel(-1);

  });

  botonSiguiente.addEventListener('click', () => {

    moverCarrusel(1);

  });

  // Actualizar el contador al desplazar las tarjetas.

  carrusel.addEventListener(
    'scroll',
    actualizarControles,
    { passive: true }
  );

  window.addEventListener(
    'resize',
    actualizarControles
  );

  // Navegación con flechas del teclado.

  carrusel.addEventListener('keydown', evento => {

    if (evento.target !== carrusel) {
      return;
    }

    if (evento.key === 'ArrowRight') {

      evento.preventDefault();

      moverCarrusel(1);

    } else if (evento.key === 'ArrowLeft') {

      evento.preventDefault();

      moverCarrusel(-1);

    }

  });

  // ===================================================
  // 11. CREAR UNA FLASHCARD DESDE GITHUB
  // ===================================================

  function crearTarjeta(repositorio, indice) {

    const datos =
      proyectosConocidos[repositorio.name] || {};

    /*
      Creamos los elementos por separado
      y utilizamos textContent para no insertar
      contenido remoto como HTML ejecutable.
    */

    const tarjeta = document.createElement(
      'article'
    );

    tarjeta.className = 'repositorio-tarjeta';

    tarjeta.dataset.repositorio = repositorio.name;

    // Conservamos el identificador de Nodo.

    if (repositorio.name === 'nodo-web-platform') {
      tarjeta.id = 'nodo';
    }

    // =======================================
    // PARTE SUPERIOR
    // =======================================

    const superior = document.createElement(
      'div'
    );

    superior.className =
      'repositorio-tarjeta-superior';

    const icono = document.createElement(
      'span'
    );

    icono.className = 'repositorio-icono';

    icono.setAttribute(
      'aria-hidden',
      'true'
    );

    icono.textContent = '</>';

    const numeracion = document.createElement(
      'span'
    );

    numeracion.className =
      'repositorio-indice';

    numeracion.textContent =
      `${String(indice + 1).padStart(2, '0')} / REPOSITORIO`;

    superior.append(
      icono,
      numeracion
    );

    // =======================================
    // TIPO DE PROYECTO
    // =======================================

    const tipo = document.createElement(
      'p'
    );

    tipo.className = 'repositorio-tipo';

    tipo.textContent = repositorio.fork
      ? 'Repositorio bifurcado'
      : datos.tipo || 'Proyecto en GitHub';

    // =======================================
    // NOMBRE DEL REPOSITORIO
    // =======================================

    const titulo = document.createElement(
      'h3'
    );

    titulo.textContent =
      datos.titulo ||
      repositorio.name.replace(/[-_]/g, ' ');

    // =======================================
    // DESCRIPCIÓN
    // =======================================

    const descripcion = document.createElement(
      'p'
    );

    descripcion.className =
      'repositorio-descripcion';

    descripcion.textContent =
      datos.descripcion ||
      repositorio.description ||
      'Código y documentación disponibles en GitHub.';

    // =======================================
    // PARTE INFERIOR
    // =======================================

    const inferior = document.createElement(
      'div'
    );

    inferior.className =
      'repositorio-tarjeta-inferior';

    // Lenguaje principal.

    const lenguaje = document.createElement(
      'span'
    );

    lenguaje.className =
      'repositorio-lenguaje';

    const punto = document.createElement(
      'i'
    );

    punto.setAttribute(
      'aria-hidden',
      'true'
    );

    lenguaje.append(

      punto,

      document.createTextNode(
        repositorio.language || 'Repositorio'
      )

    );

    // Enlace al repositorio.

    const enlace = document.createElement(
      'a'
    );

    enlace.href =
      `https://github.com/${usuarioGitHub}/` +
      encodeURIComponent(repositorio.name);

    enlace.target = '_blank';

    enlace.rel = 'noopener noreferrer';

    enlace.setAttribute(
      'aria-label',
      `Ver ${titulo.textContent} en GitHub, abre en otra pestaña`
    );

    enlace.append(
      document.createTextNode('Ver repositorio ')
    );

    const flecha = document.createElement(
      'span'
    );

    flecha.setAttribute(
      'aria-hidden',
      'true'
    );

    flecha.textContent = '↗';

    enlace.append(flecha);

    inferior.append(
      lenguaje,
      enlace
    );

    // =======================================
    // ARMAR LA FLASHCARD COMPLETA
    // =======================================

    tarjeta.append(
      superior,
      tipo,
      titulo,
      descripcion,
      inferior
    );

    return tarjeta;

  }

  // ===================================================
  // 12. ORDENAR LOS REPOSITORIOS
  // ===================================================

  function ordenarRepositorios(repositorios) {

    return repositorios.sort((primero, segundo) => {

      const ordenPrimero =
        repositoriosDestacados.indexOf(
          primero.name
        );

      const ordenSegundo =
        repositoriosDestacados.indexOf(
          segundo.name
        );

      // Si los dos son destacados.

      if (
        ordenPrimero !== -1 &&
        ordenSegundo !== -1
      ) {

        return ordenPrimero - ordenSegundo;

      }

      // Los destacados aparecen primero.

      if (ordenPrimero !== -1) {
        return -1;
      }

      if (ordenSegundo !== -1) {
        return 1;
      }

      // El resto se ordena por actualización.

      return (
        new Date(segundo.updated_at) -
        new Date(primero.updated_at)
      );

    });

  }

  // ===================================================
  // 13. CONSULTAR REPOSITORIOS PÚBLICOS
  // ===================================================

  async function consultarRepositoriosPublicos() {

    const todos = [];

    let pagina = 1;

    let continuar = true;

    /*
      La API pública de GitHub permite
      solicitar hasta 100 repositorios
      por página.

      Consultamos las páginas necesarias
      para mostrar toda la lista pública.
    */

    while (continuar) {

      const direccion =
        `https://api.github.com/users/${usuarioGitHub}/repos` +
        `?type=owner&sort=updated&per_page=100&page=${pagina}`;

      const respuesta = await fetch(
        direccion,
        {

          headers: {
            Accept: 'application/vnd.github+json'
          }

        }
      );

      if (!respuesta.ok) {

        throw new Error(
          'No se pudo consultar GitHub.'
        );

      }

      const resultados = await respuesta.json();

      if (!Array.isArray(resultados)) {

        throw new Error(
          'GitHub devolvió una respuesta inesperada.'
        );

      }

      todos.push(...resultados);

      continuar = resultados.length === 100;

      pagina += 1;

    }

    /*
      Solo mostrar repositorios públicos
      pertenecientes a la cuenta indicada.
    */

    return todos.filter(repositorio => {

      return (

        repositorio &&

        typeof repositorio.name === 'string' &&

        repositorio.owner?.login?.toLowerCase() ===
          usuarioGitHub.toLowerCase() &&

        !repositorio.private

      );

    });

  }

  // ===================================================
  // 14. ACTUALIZAR FLASHCARDS DESDE GITHUB
  // ===================================================

  async function cargarRepositorios() {

    try {

      const repositorios =
        await consultarRepositoriosPublicos();

      if (repositorios.length === 0) {
        return;
      }

      // Ordenar los proyectos.

      const ordenados = ordenarRepositorios(
        repositorios
      );

      /* ISS fue incorporado por la autora al portfolio; el repositorio
         no está expuesto por la API pública en este momento. */
      if (!ordenados.some(repositorio => repositorio.name === 'issrc-web')) {
        ordenados.splice(1, 0, {
          name: 'issrc-web',
          description: proyectosConocidos['issrc-web'].descripcion,
          language: 'Astro',
          fork: false,
          owner: { login: usuarioGitHub }
        });
      }

      // Crear un fragmento para las tarjetas.

      const fragmento =
        document.createDocumentFragment();

      ordenados.forEach((repositorio, indice) => {

        fragmento.append(
          crearTarjeta(
            repositorio,
            indice
          )
        );

      });

      /*
        Reemplazamos las tarjetas de respaldo
        del HTML por los repositorios actuales.
      */

      carrusel.replaceChildren(fragmento);

      // Reiniciar la posición del carrusel.

      carrusel.scrollLeft = 0;

      // Actualizar las flechas y el contador.

      actualizarControles();

      programarActualizacionNavegacion();

    } catch (error) {

      /*
        Si no hay conexión, GitHub no responde
        o alcanzamos el límite de consultas,
        conservamos las flashcards originales
        incluidas en index.html.
      */

      actualizarControles();

    }

  }

  // ===================================================
  // 15. INICIAR EL CARRUSEL
  // ===================================================

  // Primero utilizar las tarjetas existentes.

  actualizarControles();

  // Después consultar los repositorios de GitHub.

  cargarRepositorios();

})();
