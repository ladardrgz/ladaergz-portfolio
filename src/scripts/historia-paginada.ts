const historia = document.querySelector<HTMLElement>('[data-historia]');

if (historia) {
  const paginas = [...historia.querySelectorAll<HTMLElement>('[data-historia-pagina]')];
  const anterior = historia.querySelector<HTMLButtonElement>('[data-historia-anterior]');
  const siguiente = historia.querySelector<HTMLButtonElement>('[data-historia-siguiente]');
  const estado = historia.querySelector<HTMLElement>('[data-historia-estado]');
  let paginaActual = 0;

  const mostrarPagina = (indice: number) => {
    paginaActual = Math.min(Math.max(indice, 0), paginas.length - 1);

    paginas.forEach((pagina, posicion) => {
      const activa = posicion === paginaActual;
      pagina.hidden = !activa;
      if (activa) pagina.scrollTop = 0;
    });

    if (anterior) anterior.disabled = paginaActual === 0;
    if (siguiente) {
      siguiente.disabled = paginaActual === paginas.length - 1;
      siguiente.textContent = paginaActual === paginas.length - 1 ? 'Fin de la historia' : 'Siguiente →';
    }
    if (estado) estado.textContent = `Página ${paginaActual + 1} de ${paginas.length}`;
  };

  anterior?.addEventListener('click', () => mostrarPagina(paginaActual - 1));
  siguiente?.addEventListener('click', () => mostrarPagina(paginaActual + 1));
  mostrarPagina(0);
}
