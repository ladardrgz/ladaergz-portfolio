const carruselStack = document.querySelector<HTMLElement>('.portada-tecnologias-carrusel');
const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)');

if (carruselStack && !movimientoReducido.matches) {
  let ultimoCuadro = performance.now();
  let pausado = false;
  let reanudarEn = 0;
  const velocidad = 22;

  const pausar = () => {
    pausado = true;
  };

  const programarReanudacion = () => {
    pausado = false;
    reanudarEn = performance.now() + 1800;
  };

  const animar = (ahora: number) => {
    const transcurrido = Math.min(ahora - ultimoCuadro, 48);
    ultimoCuadro = ahora;

    if (!pausado && ahora >= reanudarEn) {
      const limite = carruselStack.scrollWidth - carruselStack.clientWidth;

      if (limite > 0) {
        const siguiente = carruselStack.scrollLeft + (velocidad * transcurrido) / 1000;
        carruselStack.scrollLeft = siguiente >= limite ? 0 : siguiente;
      }
    }

    requestAnimationFrame(animar);
  };

  carruselStack.addEventListener('mouseenter', pausar);
  carruselStack.addEventListener('mouseleave', programarReanudacion);
  carruselStack.addEventListener('focusin', pausar);
  carruselStack.addEventListener('focusout', programarReanudacion);
  carruselStack.addEventListener('touchstart', pausar, { passive: true });
  carruselStack.addEventListener('touchend', programarReanudacion, { passive: true });
  carruselStack.addEventListener('scroll', () => {
    if (document.activeElement === carruselStack) programarReanudacion();
  }, { passive: true });

  requestAnimationFrame(animar);
}
