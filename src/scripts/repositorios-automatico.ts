const carruselRepositorios = document.getElementById('carrusel-repositorios');

if (carruselRepositorios) {
  let ultimoCuadro = performance.now();
  let posicion = carruselRepositorios.scrollLeft;
  let direccion = 1;
  let pausadoPorUsuario = false;
  let reanudarEn = performance.now() + 2200;
  const velocidad = 9;

  const animar = (ahora: number) => {
    const transcurrido = Math.min(ahora - ultimoCuadro, 48);
    ultimoCuadro = ahora;

    if (!pausadoPorUsuario && ahora >= reanudarEn && !document.hidden) {
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

  const botonPausa = document.getElementById('repositorios-pausa');
  botonPausa?.addEventListener('click', () => {
    pausadoPorUsuario = !pausadoPorUsuario;
    botonPausa.setAttribute('aria-pressed', String(pausadoPorUsuario));
    botonPausa.textContent = pausadoPorUsuario ? 'Reanudar carrusel' : 'Pausar carrusel';
  });
}
