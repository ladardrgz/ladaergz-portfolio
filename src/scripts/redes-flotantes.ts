const redesFlotantes = document.querySelector<HTMLElement>('[data-redes-flotantes]');
const botonMinimizar = document.querySelector<HTMLButtonElement>('[data-redes-minimizar]');
const iconoMinimizar = botonMinimizar?.querySelector<HTMLElement>('span');

const alternarRedes = () => {
  if (!redesFlotantes || !botonMinimizar) return;

  const estaMinimizado = redesFlotantes.classList.toggle('esta-minimizado');
  botonMinimizar.setAttribute('aria-expanded', String(!estaMinimizado));
  botonMinimizar.setAttribute('aria-label', estaMinimizado ? 'Mostrar redes' : 'Minimizar redes');
  if (iconoMinimizar) iconoMinimizar.textContent = estaMinimizado ? '+' : '−';
};

botonMinimizar?.addEventListener('click', alternarRedes);
