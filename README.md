# Seicento · Vista previa de rediseño

[Ver demo](https://alexis01001415-oss.github.io/seicento-web-preview/) · [Abrir repositorio](https://github.com/alexis01001415-oss/seicento-web-preview)

Homepage de trabajo para revisar el rediseño de Seicento Makeup School, dirigida a personas que quieren estudiar maquillaje. Es una página estática: el contenido, los estilos, el menú móvil y la galería de producto están en [`index.html`](index.html). Las imágenes y el video están en [`assets/`](assets/) y el copy y sistema visual en [`docs/copy-design-system.md`](docs/copy-design-system.md).

La revisión del 13 de octubre de 2026 destaca **Seicento × Beauty Creations**, presenta siete opciones de carrera, amplía la experiencia del alumno y añade comunidad, clase muestra gratuita, Brunch + Masterclass, noticias y 16 preguntas frecuentes. Mantiene un H1 y 16 H2 en 17 secciones.

El [componente Image Sequence Scrub para Framer](framer/README.md) trae una secuencia adicional de 150 fotogramas del render de Silky, lista para vincular al desplazamiento.

## Abrir y editar

Abre `index.html` en un navegador. No se necesita instalar dependencias ni ejecutar un servidor. Para cambiar copy, colores o disposición, edita el mismo archivo. Los tokens visuales están al comienzo del bloque `<style>`.

## Silky Pro Palette

La sección `#silky`, situada después de las carreras, presenta **Silky Pro Palette, la colaboración de Seicento con Beauty Creations**, con ambos logos, una galería de ocho vistas, un video de 10 segundos y dos fotografías. Su copy invita a explorar el color y aprender maquillaje. Los recursos y sus textos alternativos se documentan en [`assets/silky/manifest.json`](assets/silky/manifest.json). Para sustituir imágenes, conserva los nombres o actualiza los `data-src` y las miniaturas en `index.html`.

La colaboración fue confirmada por el responsable del proyecto. El logo de Beauty Creations procede de la web oficial de Seicento. El CTA del producto dirige al WhatsApp de la escuela para recibir información.

## Publicación

GitHub Pages sirve `index.html` desde la rama `main`. Cada cambio enviado a `main` actualiza la demo. La etiqueta visible de vista previa y `<meta name="robots" content="noindex, nofollow">` permanecerán hasta que Seicento apruebe una versión final.

## Contenido y recursos

Los textos y la jerarquía de títulos parten del [sitio oficial](https://seicento.edu.mx/), sus fichas de carrera y las indicaciones del responsable del proyecto. Se usan los logos originales de Seicento, Beauty Creations e IUM y fotografías publicadas por la escuela. El documento de copy registra las fuentes y el alcance de cada beneficio. Los recursos de marca siguen perteneciendo a sus titulares. Las imágenes y el video de Silky proceden del material entregado por el usuario.

Los botones de contacto abren la página oficial de Seicento o su número público de WhatsApp. La demo no recopila datos ni envía formularios propios.
