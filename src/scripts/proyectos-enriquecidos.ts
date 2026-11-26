type Tecnologia = { nombre: string; icono: string };

type Proyecto = {
  imagen: string;
  alt: string;
  respaldo: string[];
  arquitectura: string;
  despliegue: Tecnologia;
  extras?: Tecnologia[];
};

const recurso = (archivo: string) => `/assets/tecnologias/${archivo}`;

const catalogo: Record<string, Tecnologia> = {
  Astro: { nombre: 'Astro', icono: recurso('astro.png') },
  TypeScript: { nombre: 'TypeScript', icono: recurso('typescript.png') },
  JavaScript: { nombre: 'JavaScript', icono: recurso('javascript.png') },
  CSS: { nombre: 'CSS', icono: recurso('css.png') },
  HTML: { nombre: 'HTML', icono: recurso('html.png') },
  PHP: { nombre: 'PHP', icono: recurso('php.png') },
  Python: { nombre: 'Python', icono: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  PLpgSQL: { nombre: 'PostgreSQL', icono: recurso('postgresql.png') },
  React: { nombre: 'React', icono: recurso('react.png') },
  'Next.js': { nombre: 'Next.js', icono: recurso('nextjs.png') },
  Tailwind: { nombre: 'Tailwind CSS', icono: recurso('tailwind.png') },
  Supabase: { nombre: 'Supabase', icono: recurso('supabase.png') },
  Composer: { nombre: 'Composer', icono: recurso('composer.png') },
  'Mercado Pago': { nombre: 'Mercado Pago', icono: recurso('mercado-pago.png') },
  Vercel: { nombre: 'Vercel', icono: recurso('vercel.png') },
  Cloudflare: { nombre: 'Cloudflare', icono: recurso('cloudflare.png') },
  ChatGPT: { nombre: 'ChatGPT', icono: recurso('chatgpt.png') },
  Codex: { nombre: 'Codex', icono: recurso('codex.png') },
  'Sin despliegue verificado': { nombre: 'Sólo en repositorios', icono: recurso('github.svg') }
};

const proyectos: Record<string, Proyecto> = {
  'nodo-web-platform': { imagen: '/assets/projects/nodo.png', alt: 'Panel principal de Nodo', respaldo: ['TypeScript', 'PLpgSQL', 'CSS', 'Python', 'JavaScript'], arquitectura: 'Next.js · módulos por dominio · Supabase', despliegue: catalogo.Vercel, extras: [catalogo['Next.js'], catalogo.React, catalogo.Tailwind, catalogo.Supabase, catalogo.Codex] },
  'issrc-web': { imagen: '/assets/projects/iss-preview.png', alt: 'Página de inicio del sitio institucional ISS', respaldo: ['Astro', 'JavaScript', 'CSS', 'TypeScript', 'HTML'], arquitectura: 'Sitio estático por componentes Astro', despliegue: catalogo.Cloudflare, extras: [catalogo.Codex] },
  'beauty-system': { imagen: '/assets/projects/beauty-system.png', alt: 'Panel de BeautySystem', respaldo: ['PHP', 'JavaScript', 'CSS', 'HTML'], arquitectura: 'PHP MVC · checkout y módulos de negocio', despliegue: catalogo['Sin despliegue verificado'], extras: [catalogo.Composer, catalogo['Mercado Pago']] },
  'formostock-pos': { imagen: '/assets/projects/formostock.png', alt: 'Panel de FormoStock', respaldo: ['PHP', 'HTML', 'JavaScript', 'CSS'], arquitectura: 'PHP modular · POS y gestión de stock', despliegue: catalogo['Sin despliegue verificado'], extras: [catalogo.Composer] },
  'plena-salud-belleza': { imagen: '/assets/projects/plena.png', alt: 'Página principal de Plena Salud y Belleza', respaldo: ['HTML', 'CSS', 'JavaScript'], arquitectura: 'Sitio estático multipágina', despliegue: catalogo['Sin despliegue verificado'] },
  'fast-food-system': { imagen: '/assets/projects/fast-food-system.png', alt: 'Página principal de FastFoodSystem', respaldo: ['PHP', 'JavaScript', 'CSS'], arquitectura: 'Sistema comercial con roles y módulos', despliegue: catalogo['Sin despliegue verificado'] },
  'cr-belleza-integral': { imagen: '/assets/projects/cr-belleza-integral.png', alt: 'Página principal de CR Belleza Integral', respaldo: ['HTML', 'JavaScript'], arquitectura: 'Cloudflare Worker · Assets · KV', despliegue: catalogo.Cloudflare },
  digital_visibility_project: { imagen: '/assets/projects/digital-visibility.png', alt: 'Página principal de Digital Visibility', respaldo: ['CSS', 'HTML', 'JavaScript'], arquitectura: 'Sitio de presentación de servicios', despliegue: catalogo.Cloudflare }
};

const crear = <Etiqueta extends keyof HTMLElementTagNameMap>(etiqueta: Etiqueta, clase?: string) => {
  const elemento = document.createElement(etiqueta);
  if (clase) elemento.className = clase;
  return elemento;
};

const normalizarLenguajes = (valor: unknown, respaldo: string[]) => {
  if (!Array.isArray(valor)) return respaldo;
  const lenguajes = valor
    .map((lenguaje) => {
      if (typeof lenguaje === 'string') return lenguaje;
      if (typeof lenguaje !== 'object' || lenguaje === null) return '';
      if ('nombre' in lenguaje && typeof lenguaje.nombre === 'string') return lenguaje.nombre;
      if ('name' in lenguaje && typeof lenguaje.name === 'string') return lenguaje.name;
      if ('language' in lenguaje && typeof lenguaje.language === 'string') return lenguaje.language;
      return '';
    })
    .filter((lenguaje): lenguaje is string => Boolean(lenguaje) && lenguaje !== 'Hack');
  return lenguajes.length ? lenguajes : respaldo;
};

const obtenerLenguajes = async (repositorio: string, respaldo: string[]) => {
  if (repositorio === 'issrc-web') return respaldo;
  const clave = `lenguajes-${repositorio}`;
  const guardado = sessionStorage.getItem(clave);
  if (guardado) {
    try {
      return normalizarLenguajes(JSON.parse(guardado), respaldo);
    } catch {
      sessionStorage.removeItem(clave);
    }
  }
  try {
    const respuesta = await fetch(`https://api.github.com/repos/ladardrgz/${encodeURIComponent(repositorio)}/languages`, { headers: { Accept: 'application/vnd.github+json' } });
    if (!respuesta.ok) return respaldo;
    const datos = await respuesta.json() as Record<string, number>;
    const lenguajes = Object.keys(datos);
    sessionStorage.setItem(clave, JSON.stringify(lenguajes));
    return normalizarLenguajes(lenguajes, respaldo);
  } catch {
    return respaldo;
  }
};

const crearFichaTecnologia = ({ nombre, icono }: Tecnologia) => {
  const item = crear('li', 'tecnologia-proyecto');
  const imagen = document.createElement('img');
  imagen.src = icono;
  imagen.alt = '';
  imagen.width = 34;
  imagen.height = 34;
  imagen.loading = 'lazy';
  const etiqueta = crear('small');
  etiqueta.textContent = nombre;
  item.append(imagen, etiqueta);
  return item;
};

const crearIconoGitHub = () => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  const ruta = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  ruta.setAttribute('d', 'M12 .3A12 12 0 0 0 8.2 23.7c.6.11.82-.26.82-.58v-2.25c-3.34.73-4.05-1.42-4.05-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.48 1 .1-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.53.12-3.19 0 0 1-.32 3.3 1.23A11.42 11.42 0 0 1 12 6.1c1.02 0 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.9.12 3.19.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .3Z');
  svg.append(ruta);
  return svg;
};

const agregarCarruselTecnologias = (tarjeta: HTMLElement, lenguajes: string[], proyecto: Proyecto) => {
  tarjeta.querySelector('.lenguajes-proyecto')?.remove();
  const conocidas = lenguajes.map((lenguaje) => catalogo[lenguaje] ?? { nombre: lenguaje, icono: recurso('database.png') });
  const tecnologias = [...conocidas, ...(proyecto.extras ?? []), catalogo.ChatGPT];
  const unicas = tecnologias.filter((tecnologia, indice, lista) => lista.findIndex((actual) => actual.nombre === tecnologia.nombre) === indice);
  const bloque = crear('section', 'lenguajes-proyecto');
  const etiqueta = crear('span');
  etiqueta.textContent = 'Tecnologías e integraciones';
  const ventana = crear('div', 'tecnologias-ventana');
  const pista = crear('div', 'tecnologias-pista-animada');
  const cinta = crear('ul', 'tecnologias-cinta');
  cinta.setAttribute('aria-label', 'Tecnologías e integraciones utilizadas en el proyecto');
  unicas.forEach((tecnologia) => cinta.append(crearFichaTecnologia(tecnologia)));
  cinta.setAttribute('aria-hidden', 'false');
  const duplicado = cinta.cloneNode(true) as HTMLUListElement;
  duplicado.setAttribute('aria-hidden', 'true');
  pista.append(cinta, duplicado);
  ventana.append(pista);
  const controles = crear('div', 'tecnologias-controles');
  const anterior = document.createElement('button');
  anterior.type = 'button';
  anterior.className = 'tecnologias-flecha';
  anterior.setAttribute('aria-label', 'Ver tecnologías anteriores');
  anterior.textContent = '←';
  const siguiente = document.createElement('button');
  siguiente.type = 'button';
  siguiente.className = 'tecnologias-flecha';
  siguiente.setAttribute('aria-label', 'Ver tecnologías siguientes');
  siguiente.textContent = '→';
  controles.append(anterior, siguiente);
  bloque.append(etiqueta, ventana, controles);
  anterior.addEventListener('click', () => ventana.scrollBy({ left: -130, behavior: 'smooth' }));
  siguiente.addEventListener('click', () => ventana.scrollBy({ left: 130, behavior: 'smooth' }));
  tarjeta.querySelector('.repositorio-tarjeta-inferior')?.before(bloque);
};

const enriquecerTarjeta = async (tarjeta: HTMLElement) => {
  const identificador = tarjeta.dataset.repositorio ?? '';
  const proyecto = proyectos[identificador];
  if (!proyecto || tarjeta.dataset.enriquecida === 'true') return;
  tarjeta.dataset.enriquecida = 'true';
  tarjeta.classList.add('proyecto-ticket');

  const superior = tarjeta.querySelector('.repositorio-tarjeta-superior');
  const preview = crear('figure', 'proyecto-preview');
  const imagen = document.createElement('img');
  imagen.src = proyecto.imagen;
  imagen.alt = proyecto.alt;
  imagen.width = 960;
  imagen.height = 540;
  imagen.loading = 'lazy';
  preview.append(imagen);
  superior?.after(preview);

  const arquitectura = crear('p', 'proyecto-arquitectura');
  arquitectura.textContent = proyecto.arquitectura;
  tarjeta.querySelector('.repositorio-descripcion')?.after(arquitectura);

  const despliegue = crear('div', 'proyecto-despliegue');
  const icono = document.createElement('img');
  icono.src = proyecto.despliegue.icono;
  icono.alt = '';
  icono.width = 25;
  icono.height = 25;
  icono.loading = 'lazy';
  const texto = crear('span');
  texto.textContent = proyecto.despliegue.nombre;
  despliegue.append(icono, texto);
  tarjeta.querySelector('.repositorio-tarjeta-inferior')?.before(despliegue);

  const enlace = tarjeta.querySelector<HTMLAnchorElement>('.repositorio-tarjeta-inferior a');
  if (enlace) {
    enlace.classList.add('boton-repositorio');
    enlace.replaceChildren(crearIconoGitHub(), document.createTextNode('Ver repositorio'));
  }
  agregarCarruselTecnologias(tarjeta, await obtenerLenguajes(identificador, proyecto.respaldo), proyecto);
};

const ordenProyectos = [
  'nodo-web-platform',
  'issrc-web',
  'digital_visibility_project',
  'formostock-pos',
  'beauty-system',
  'plena-salud-belleza',
  'fast-food-system',
  'cr-belleza-integral'
];

const ordenarTarjetas = (carrusel: HTMLElement) => {
  const tarjetas = [...carrusel.querySelectorAll<HTMLElement>('.repositorio-tarjeta[data-repositorio]')];
  const posicion = (tarjeta: HTMLElement) => {
    const indice = ordenProyectos.indexOf(tarjeta.dataset.repositorio ?? '');
    return indice === -1 ? ordenProyectos.length : indice;
  };
  const ordenadas = [...tarjetas].sort((primera, segunda) => posicion(primera) - posicion(segunda));
  if (tarjetas.some((tarjeta, indice) => tarjeta !== ordenadas[indice])) {
    const fragmento = document.createDocumentFragment();
    ordenadas.forEach((tarjeta) => fragmento.append(tarjeta));
    carrusel.append(fragmento);
  }
};

const actualizarTarjetas = () => document.querySelectorAll<HTMLElement>('.repositorio-tarjeta[data-repositorio]').forEach((tarjeta) => { void enriquecerTarjeta(tarjeta); });
const carrusel = document.getElementById('carrusel-repositorios');
if (carrusel) {
  new MutationObserver(() => {
    ordenarTarjetas(carrusel);
    actualizarTarjetas();
  }).observe(carrusel, { childList: true, subtree: false });
  ordenarTarjetas(carrusel);
  actualizarTarjetas();
}
