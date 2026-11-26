# Auditoría legal y técnica del portfolio

**Fecha de revisión:** 25 de noviembre de 2026.  
**Alcance:** código y recursos del repositorio local `C:\xampp\htdocs\portfolio`. No constituye dictamen jurídico ni certificación de cumplimiento.

## Inventario revisado

- **Rutas:** `/` (portfolio) y `/privacidad` (información de tratamiento).
- **Composición actual:** `BaseLayout.astro` aporta metadatos y Footer; `PortfolioOriginal.astro` conserva la composición histórica, sus estilos e interacciones; `contacto-formulario.ts` opera el formulario; `Footer/Footer.astro` concentra el pie compartido.
- **Secciones presentes:** hero, historia de Nodo, proyectos/repositorios, tecnologías, proceso/FormoStock, formación, contacto y Footer.
- **Datos recibidos por el formulario:** nombre, correo, mensaje, confirmación del aviso y versión del aviso. Hay honeypot `_gotcha`.
- **Servicios/cargas externas detectados:** Formspree, GitHub API, GitHub, Google Fonts, jsDelivr/Devicon/Simple Icons y una imagen de NIC Argentina. El hosting no puede deducirse del repositorio.
- **Almacenamiento local detectado:** `sessionStorage` de lenguajes de repositorios; no se detectaron cookies, `localStorage` ni analítica en el código.

## Controles

### 01. Identificación del responsable
- **Aplicabilidad / estado:** Aplica / **Cumple parcialmente**.
- **Evidencia:** Footer y `/privacidad` identifican a Lada Elizabet Rodriguez, correo y referencia geográfica profesional.
- **Riesgo:** No se cuenta con domicilio legal ni CUIT, y no deben inventarse.
- **Acción / verificación:** Se publicó solo la información profesional aportada; ruta y Footer incluidos en el build pendiente de validación final.
- **Pendiente humano:** Confirmar si se necesita una dirección adicional para el caso concreto.
- **Fuente:** Ley 25.326, art. 6 ([texto actualizado](https://www.argentina.gob.ar/normativa/nacional/64790/actualizacion)).

### 02. Política de privacidad
- **Aplicabilidad / estado:** Aplica / **Cumple parcialmente**.
- **Evidencia:** `src/pages/privacidad.astro` documenta datos, finalidad, proveedores, derechos, seguridad y conservación.
- **Riesgo:** Las condiciones reales de hosting y cuentas externas pueden cambiar.
- **Acción / verificación:** Se creó `/privacidad` y enlace persistente en Footer.
- **Pendiente humano:** Revisar la política al definir hosting o nuevos proveedores.
- **Fuente:** Ley 25.326, arts. 5 y 6.

### 03. Información previa al formulario
- **Aplicabilidad / estado:** Aplica / **Cumple**.
- **Evidencia:** Aviso visible y enlace a `/privacidad` antes del botón en `portfolio-original.html`.
- **Riesgo:** La información podría quedar desactualizada si se modifica el flujo.
- **Acción / verificación:** Se añadió texto de finalidad, Formspree y enlace accesible.
- **Pendiente humano:** Mantenerlo sincronizado con proveedores.
- **Fuente:** Ley 25.326, art. 6.

### 04. Fundamento del tratamiento y consentimiento
- **Aplicabilidad / estado:** Aplica / **Revisión legal**.
- **Evidencia:** Checkbox obligatorio `privacy_consent` y `privacy_notice_version`, enviados con el formulario.
- **Riesgo:** La idoneidad jurídica de la base y del registro depende del tratamiento real y de Formspree.
- **Acción / verificación:** Se implementó información previa, aceptación expresa y registro de versión.
- **Pendiente humano:** Validar con asesoramiento local la base jurídica y conservación de prueba de consentimiento.
- **Fuente:** Ley 25.326, art. 5 y 6.

### 05. Minimización de datos
- **Aplicabilidad / estado:** Aplica / **Cumple**.
- **Evidencia:** Solo se solicitan nombre, correo y mensaje; el resto son campos técnicos de control.
- **Riesgo:** Que se agreguen campos sin justificación en el futuro.
- **Acción / verificación:** No se solicitan documentos, datos sensibles, pago ni teléfono.
- **Pendiente humano:** Revisar toda ampliación del formulario.
- **Fuente:** Ley 25.326, arts. 4 y 7.

### 06. Derechos sobre datos personales
- **Aplicabilidad / estado:** Aplica / **Cumple parcialmente**.
- **Evidencia:** `/privacidad` informa canal por email y enlaza a AAIP.
- **Riesgo:** El cumplimiento de plazos depende de la gestión humana del correo y de las copias del proveedor.
- **Acción / verificación:** Se habilitó un canal concreto para acceso, rectificación, actualización y supresión.
- **Pendiente humano:** Registrar y responder solicitudes efectivas.
- **Fuente:** [AAIP: derechos](https://www.argentina.gob.ar/aaip/datospersonales/derechos).

### 07. Conservación y eliminación
- **Aplicabilidad / estado:** Aplica / **Pendiente**.
- **Evidencia:** El código no configura borrado automático; Formspree y correo pueden mantener copias.
- **Riesgo:** Retención indeterminada o copias no revisadas.
- **Acción / verificación:** La política declara expresamente este límite; no se afirma borrado automático inexistente.
- **Pendiente humano:** Definir período, configurar/eliminar archivos en Formspree y correo de manera verificable.
- **Fuente:** Ley 25.326, art. 4; condiciones de la cuenta de Formspree.

### 08. Servicios externos que procesan información
- **Aplicabilidad / estado:** Aplica / **Cumple parcialmente**.
- **Evidencia:** Formspree recibe envíos; GitHub API actualiza información pública; Google Fonts, jsDelivr y NIC AR reciben solicitudes de recursos.
- **Riesgo:** Transferencias y cambios de políticas de terceros.
- **Acción / verificación:** Se identificaron en política; no se declararon prácticas no verificadas.
- **Pendiente humano:** Definir host y considerar autoalojar fuentes/íconos.
- **Fuente:** [Formspree Security](https://formspree.io/security/).

### 09. Transferencias internacionales
- **Aplicabilidad / estado:** Aplica / **Revisión legal**.
- **Evidencia:** Formspree declara infraestructura AWS en Estados Unidos; otros CDNs pueden servir desde distintas jurisdicciones.
- **Riesgo:** Transferencia internacional de datos de contacto y datos técnicos.
- **Acción / verificación:** La política informa esa posibilidad sin afirmar suficiencia jurídica.
- **Pendiente humano:** Revisar contrato/política vigente del proveedor y garantías aplicables antes de producción.
- **Fuente:** [Formspree Security](https://formspree.io/security/).

### 10. Registro de bases de datos personales
- **Aplicabilidad / estado:** **Revisión legal**.
- **Evidencia:** El sitio no mantiene una base propia en el repositorio; Formspree/correo reciben contactos.
- **Riesgo:** La obligación depende de la caracterización del archivo y del tratamiento real.
- **Acción / verificación:** No se inició ninguna inscripción administrativa.
- **Pendiente humano:** Consultar a AAIP o profesional competente según el uso efectivo de los mensajes.
- **Fuente:** [AAIP: trámites y registro](https://www.argentina.gob.ar/aaip/tramites).

### 11. Seguridad del tratamiento
- **Aplicabilidad / estado:** Aplica / **Cumple parcialmente**.
- **Evidencia:** Formulario HTTPS-only para endpoint, validación nativa, honeypot, control de estado, `rel=noopener`, recursos locales para evidencias; la producción estática debe servir HTTPS.
- **Riesgo:** No hay evidencia de dominio, cabeceras HTTP, accesos Formspree ni configuración de hosting.
- **Acción / verificación:** Se utiliza `_gotcha`, no se exponen claves y se documenta la configuración pendiente.
- **Pendiente humano:** Publicar con HTTPS, restringir origen en Formspree y habilitar sus controles antispam disponibles.
- **Fuente:** Ley 25.326, art. 9; [Formspree: prevención de spam](https://help.formspree.io/articles/troubleshooting/how-to-prevent-spam).

### 12. Credenciales y secretos
- **Aplicabilidad / estado:** Aplica / **Cumple parcialmente**.
- **Evidencia:** Búsqueda de patrones no halló claves privadas en código publicado; `.env` se ignora y existe `.env.example`. `PUBLIC_FORMSPREE_ENDPOINT` es un identificador de recepción público, no una API key.
- **Riesgo:** `tmp/formostock/mwb/document.mwb.xml` contiene claves XML vacías llamadas `password`; no son secretos comprobados, pero no debe publicarse.
- **Acción / verificación:** Se agregó `.gitignore` para `.env`, `tmp` y `private-evidence`.
- **Pendiente humano:** Auditar el historial Git y confirmar que no haya secretos en commits anteriores.
- **Fuente:** Buenas prácticas de seguridad; [Formspree API keys](https://help.formspree.io/articles/the-forms-api/api-keys).

### 13. Cookies y seguimiento
- **Aplicabilidad / estado:** No se detectaron cookies/analítica / **No aplica actualmente**.
- **Evidencia:** Búsqueda sin `document.cookie`, analytics o píxeles; uso técnico de `sessionStorage` para lenguajes de repositorios.
- **Riesgo:** Un proveedor externo o cambio posterior podría introducir rastreo.
- **Acción / verificación:** No se implementó un banner de cookies sin tecnología que controlar; `/privacidad#cookies` lo explica.
- **Pendiente humano:** Reauditar al agregar analítica, publicidad o consentimiento de terceros.
- **Fuente:** Inventario de código local.

### 14. Comunicaciones comerciales
- **Aplicabilidad / estado:** No aplica / **No aplica**.
- **Evidencia:** No hay newsletter, suscripción, automatización de marketing ni lista comercial.
- **Riesgo:** Reutilizar contactos para marketing cambiaría la finalidad.
- **Acción / verificación:** La política limita el uso a responder consultas.
- **Pendiente humano:** Obtener evaluación/consentimiento antes de incorporar campañas.
- **Fuente:** Inventario de formulario y Ley 25.326.

### 15. Licencias de imágenes, íconos y tipografías
- **Aplicabilidad / estado:** Aplica / **Pendiente**.
- **Evidencia:** Recursos propios/locales, SVG conceptuales, iconos de paquetes/CDNs, Google Font Pirata One y créditos Uiverse/MIT preservados en CSS/HTML.
- **Riesgo:** No hay inventario documental de licencia de todas las imágenes aportadas ni de la fuente Diploma local.
- **Acción / verificación:** Se conservaron créditos Uiverse; se identificaron cargas externas.
- **Pendiente humano:** Confirmar origen/licencia de imágenes subidas, fuente Diploma y material de terceros; autoalojar solo lo autorizado.
- **Fuente:** Ley 11.723 y licencias de cada proveedor.

### 16. Derechos sobre proyectos y documentación
- **Aplicabilidad / estado:** Aplica / **Revisión legal**.
- **Evidencia:** Se publican documentos FormoStock y diagrama real. La constancia de tecnicatura con DNI fue retirada de `public` y movida a `private-evidence`.
- **Riesgo:** El PDF de requisitos y diagrama pueden contener material de terceros, datos internos o información no destinada a difusión.
- **Acción / verificación:** Se verificó la previsualización del PDF y diagrama; no se certificó la revisión exhaustiva de las 60 páginas.
- **Pendiente humano:** Autorizar explícitamente la publicación y revisar el PDF completo/diagrama por datos de terceros antes de desplegar.
- **Fuente:** Ley 11.723; archivos locales originales.

### 17. Veracidad profesional
- **Aplicabilidad / estado:** Aplica / **Cumple parcialmente**.
- **Evidencia:** Los textos indican título/constancia en trámite y proyectos públicos; no se muestran empleadores, testimonios o cifras ficticias.
- **Riesgo:** Algunas metadescripciones previas de README quedaron desactualizadas y los datos de despliegue pueden cambiar.
- **Acción / verificación:** Se evitó reemplazar contenidos recientes y se documentaron límites de evidencia.
- **Pendiente humano:** Revisar contenido tras cada cambio de estado académico o de proyectos.
- **Fuente:** Contenido del repositorio.

### 18. Accesibilidad web
- **Aplicabilidad / estado:** Aplica como buena práctica / **Cumple parcialmente**.
- **Evidencia:** Estructura semántica, etiquetas, foco visible, `aria-live`, control por teclado, texto alternativo y `prefers-reduced-motion` en estilos revisados.
- **Riesgo:** No se ejecutó una auditoría WCAG completa ni una prueba con lector de pantalla.
- **Acción / verificación:** Footer y legal page se diseñaron responsive y con focos visibles.
- **Pendiente humano:** Revisar con teclado, lector de pantalla y contraste en navegador antes de publicar.
- **Fuente:** [Ley 26.653](https://www.argentina.gob.ar/normativa/nacional/175694/texto) (su alcance legal específico debe evaluarse para este sitio privado).

### 19. Condiciones de contratación
- **Aplicabilidad / estado:** No aplica actualmente / **No aplica**.
- **Evidencia:** El sitio solo presenta portfolio y recibe consultas; no hay checkout, aceptación contractual ni pagos.
- **Riesgo:** Si se incorporan contratación/presupuestos vinculantes, cambiaría el análisis.
- **Acción / verificación:** El Footer explica ese alcance sin términos comerciales ficticios.
- **Pendiente humano:** Diseñar condiciones reales si se habilita contratación directa.
- **Fuente:** Inventario de rutas y formulario.

### 20. Defensa del consumidor y contratación a distancia
- **Aplicabilidad / estado:** No aplica actualmente / **No aplica**.
- **Evidencia:** No se comercializan bienes ni servicios ni se concreta contratación a distancia.
- **Riesgo:** Habilitar una compra o contratación directa sin mecanismo real de arrepentimiento/baja.
- **Acción / verificación:** No se añadió un botón decorativo de arrepentimiento o baja.
- **Pendiente humano:** Revaluar si el sitio pasa a vender o contratar servicios en línea.
- **Fuente:** [Disposición 954/2025](https://www.argentina.gob.ar/normativa/nacional/norma-417152/texto), aplicable a proveedores que comercializan a distancia.

## Resultado de la revisión

El repositorio incorpora mejoras de transparencia, minimización, aviso previo, consentimiento registrado en el envío, acceso a política, Footer compartido, detección de recursos externos y retiro de un DNI publicado. Persisten tareas de operación y valoración jurídica: configuración real de hosting/HTTPS y Formspree, comprobación de entrega, retención/borrado, auditoría de historial Git, revisión completa de documentación FormoStock y verificación de licencias.
