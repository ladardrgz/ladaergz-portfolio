const formulario = document.querySelector<HTMLFormElement>('[data-contacto-form]');

if (formulario) {
  const endpoint = formulario.dataset.formspreeEndpoint?.trim() ?? '';
  const boton = formulario.querySelector<HTMLButtonElement>('.contacto-enviar');
  const estado = formulario.querySelector<HTMLElement>('[data-contacto-estado]');
  const esEndpointValido = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint);

  const informar = (mensaje: string, tipo: 'info' | 'exito' | 'error') => {
    if (!estado) return;
    estado.textContent = mensaje;
    estado.dataset.estado = tipo;
  };

  if (esEndpointValido && boton) {
    boton.disabled = false;
    informar('Tu mensaje llegará directamente a mi correo.', 'info');
  }

  formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    if (!esEndpointValido || !boton) return;

    const datos = new FormData(formulario);
    if (String(datos.get('_gotcha') ?? '').trim()) return;
    if (!formulario.checkValidity()) {
      formulario.reportValidity();
      informar('Revisá los campos obligatorios antes de enviar.', 'error');
      return;
    }

    boton.disabled = true;
    boton.textContent = 'Enviando email…';
    informar('Enviando tu propuesta…', 'info');

    try {
      const respuesta = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: datos });
      if (!respuesta.ok) throw new Error('Formspree no aceptó el mensaje.');
      formulario.reset();
      boton.textContent = 'Mensaje enviado';
      informar('Gracias. Recibí tu mensaje y te responderé por correo.', 'exito');
    } catch {
      boton.disabled = false;
      boton.textContent = 'Enviar email';
      informar('No se pudo enviar el mensaje. Probá nuevamente o escribime por correo.', 'error');
    }
  });
}
