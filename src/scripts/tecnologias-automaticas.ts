const activarTecnologiasAutomaticas = (ventana: HTMLElement) => {
  if (ventana.dataset.autoTecnologias === 'true') return;
  ventana.dataset.autoTecnologias = 'true';

  let ultimoCuadro = performance.now();
  let posicion = ventana.scrollLeft;
  let pausado = false;
  let reanudarEn = performance.now() + 700;
  const velocidad = 10;

  const pausar = () => { pausado = true; };
  const reanudar = () => {
    pausado = false;
    reanudarEn = performance.now() + 1400;
  };

  ventana.addEventListener('touchstart', pausar, { passive: true });
  ventana.addEventListener('touchend', reanudar, { passive: true });
  ventana.parentElement?.querySelectorAll<HTMLButtonElement>('.tecnologias-flecha').forEach((boton) => {
    boton.addEventListener('click', reanudar);
    boton.addEventListener('focus', pausar);
    boton.addEventListener('blur', reanudar);
  });

  const animar = (ahora: number) => {
    const transcurrido = Math.min(ahora - ultimoCuadro, 48);
    ultimoCuadro = ahora;
    const pista = ventana.firstElementChild as HTMLElement | null;
    const mitad = pista ? pista.scrollWidth / 2 : 0;

    if (!pausado && ahora >= reanudarEn && !document.hidden && mitad > ventana.clientWidth) {
      posicion += (velocidad * transcurrido) / 1000;
      if (posicion >= mitad) posicion -= mitad;
      ventana.scrollLeft = posicion;
    }
    requestAnimationFrame(animar);
  };

  requestAnimationFrame(animar);
};

const observarTecnologias = () => document.querySelectorAll<HTMLElement>('.tecnologias-ventana').forEach(activarTecnologiasAutomaticas);
new MutationObserver(observarTecnologias).observe(document.body, { childList: true, subtree: true });
observarTecnologias();
