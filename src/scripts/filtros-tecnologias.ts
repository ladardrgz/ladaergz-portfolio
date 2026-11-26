const botonesFiltro = [...document.querySelectorAll<HTMLButtonElement>('[data-filtro-tecnologia]')];
const categoriasTecnologia = [...document.querySelectorAll<HTMLElement>('.tecnologia-categoria[data-categorias]')];

const aplicarFiltroTecnologias = (filtro: string) => {
  botonesFiltro.forEach((boton) => {
    const activo = boton.dataset.filtroTecnologia === filtro;
    boton.classList.toggle('esta-activo', activo);
    boton.setAttribute('aria-pressed', String(activo));
  });

  categoriasTecnologia.forEach((categoria) => {
    const visible = filtro === 'todas' || categoria.dataset.categorias?.split(' ').includes(filtro);
    categoria.hidden = !visible;
  });
};

botonesFiltro.forEach((boton) => {
  boton.addEventListener('click', () => aplicarFiltroTecnologias(boton.dataset.filtroTecnologia ?? 'todas'));
});
