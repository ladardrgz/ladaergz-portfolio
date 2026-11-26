const carruselRepositorios = document.getElementById('carrusel-repositorios');

if (carruselRepositorios) {
  const puedeUsarAutoplay = window.matchMedia(
    '(hover: hover) and (pointer: fine)'
  );
  let ultimoCuadro = performance.now();
  let posicion = carruselRepositorios.scrollLeft;
  let direccion = 1;
  let pausadoPorUsuario = false;
  let reanudarEn = performance.now() + 2200;
  const velocidad = 9;

  const animar = (ahora: number) => {
    const transcurrido = Math.min(ahora - ultimoCuadro, 48);
    ultimoCuadro = ahora;

    if (
      puedeUsarAutoplay.matches &&
      !pausadoPorUsuario &&
      ahora >= reanudarEn &&
      !document.hidden
    ) {
      const limite = carruselRepositorios.scrollWidth - carruselRepositorios.clientWidth;

      if (limite > 0) {
        const siguiente = posicion + (direccion * velocidad * transcurrido) / 1000;

        if (siguiente >= limite) {
          posicion = limite;
          carruselRepositorios.scrollLeft = limite;
          direccion = -1;
          reanudarEn = ahora + 1200;
        } else if (siguiente <= 0) {
          posicion = 0;
          carruselRepositorios.scrollLeft = 0;
          direccion = 1;
          reanudarEn = ahora + 1200;
        } else {
          posicion = siguiente;
          carruselRepositorios.scrollLeft = siguiente;
        }
      }
    }

    requestAnimationFrame(animar);
  };

  requestAnimationFrame(animar);

  const respetarDesplazamientoManual = () => {
    posicion = carruselRepositorios.scrollLeft;
    reanudarEn = performance.now() + 2200;
  };

  carruselRepositorios.addEventListener(
    'scroll',
    respetarDesplazamientoManual,
    { passive: true }
  );

  carruselRepositorios.addEventListener(
    'pointerdown',
    () => {
      reanudarEn = performance.now() + 4000;
    },
    { passive: true }
  );

  const botonPausa = document.getElementById('repositorios-pausa');
  botonPausa?.addEventListener('click', () => {
    pausadoPorUsuario = !pausadoPorUsuario;
    botonPausa.setAttribute('aria-pressed', String(pausadoPorUsuario));
    botonPausa.textContent = pausadoPorUsuario ? 'Reanudar carrusel' : 'Pausar carrusel';
  });
}
