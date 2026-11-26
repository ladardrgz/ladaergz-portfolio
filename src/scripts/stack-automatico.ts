const carruselStack = document.querySelector<HTMLElement>('.portada-tecnologias-carrusel');
const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)');

if (carruselStack && !movimientoReducido.matches) {
  const puedeUsarAutoplay = window.matchMedia(
    '(hover: hover) and (pointer: fine)'
  );
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

    if (puedeUsarAutoplay.matches && !pausado && ahora >= reanudarEn) {
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
  carruselStack.addEventListener('pointerdown', pausar, { passive: true });
  carruselStack.addEventListener('pointerup', programarReanudacion, { passive: true });

  requestAnimationFrame(animar);
}
