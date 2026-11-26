const enlaces = [...document.querySelectorAll<HTMLAnchorElement>('.barra nav a')];
const secciones = enlaces.map(({ hash }) => document.querySelector(hash)).filter((seccion): seccion is Element => Boolean(seccion));
const actualizar = (entradas: IntersectionObserverEntry[]) => { const visible = entradas.filter(({ isIntersecting }) => isIntersecting).at(-1); if (!visible) return; enlaces.forEach(enlace => enlace.toggleAttribute('aria-current', enlace.hash === `#${visible.target.id}`)); };
const observador = new IntersectionObserver(actualizar,{rootMargin:'-25% 0px -65%'}); secciones.forEach(seccion=>observador.observe(seccion));
