const carruselCertificados = document.querySelector<HTMLElement>('.formacion-certificados');

if (carruselCertificados) {
  const desplazamiento = () => Math.max(carruselCertificados.clientWidth, 1);

  document.querySelectorAll<HTMLButtonElement>('[data-certificados-direccion]').forEach((boton) => {
    boton.addEventListener('click', () => {
      const direccion = boton.dataset.certificadosDireccion === 'anterior' ? -1 : 1;
      const limite = carruselCertificados.scrollWidth - carruselCertificados.clientWidth;
      const siguiente = carruselCertificados.scrollLeft + desplazamiento() * direccion;

      carruselCertificados.scrollTo({
        left: siguiente < 0 ? limite : siguiente > limite ? 0 : siguiente,
        behavior: 'smooth',
      });
    });
  });
}
