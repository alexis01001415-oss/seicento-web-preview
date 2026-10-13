# Seicento · Vista previa de rediseño

[Demo del proyecto](https://alexis01001415-oss.github.io/seicento-web-preview/) · [Repositorio](https://github.com/alexis01001415-oss/seicento-web-preview)

Prototipo de Seicento Makeup School para personas que quieren estudiar maquillaje. La dirección visual toma como referencia la presentación de producto de [AirPods Pro de Apple](https://www.apple.com/mx/airpods-pro/): titulares breves, beneficios concretos, imágenes protagonistas y lectura por bloques.

La página conserva **siete opciones de carrera, 16 preguntas frecuentes y 17 secciones**, con un H1 y 16 H2. La colaboración **Seicento × Beauty Creations** se presenta con una secuencia controlada por el desplazamiento y cinco bloques de características de Silky Pro Palette.

## Archivos de trabajo

| Archivo | Qué editar |
| --- | --- |
| [`index.html`](index.html) | Copy, jerarquía, enlaces, secciones y estructura del bento |
| [`styles.css`](styles.css) | Colores, tipografía, composición y adaptación a móvil |
| [`assets/scroll-sequence.js`](assets/scroll-sequence.js) | Carga de imágenes, canvas, progreso y transiciones de texto |
| [`docs/copy-design-system.md`](docs/copy-design-system.md) | Copy y especificación para construir en Framer |
| [`framer/ImageSequenceScrub.tsx`](framer/ImageSequenceScrub.tsx) | Componente reutilizable para Framer; instalación en su [guía](framer/README.md) |

No hay proceso de compilación ni dependencias de aplicación. Para revisar el sitio, sirve la carpeta con un servidor HTTP estático, por ejemplo `python -m http.server 8000`, o utiliza la demo publicada del proyecto.

## Silky Pro Palette

El producto comunica características observables en las fotografías aportadas: **35 tonos, acabados mate y brillantes, gama de neutros, pasteles y colores vivos, y espejo integrado**. Además, el responsable del proyecto confirmó que **incluye dos brochas**. Cada característica se relaciona con una posibilidad de uso: combinar tonos, construir profundidad, añadir puntos de luz, revisar la aplicación y poner las ideas en práctica.

El bento combina una tarjeta grande de la paleta, una tarjeta de acabados, otra del espejo, una de las dos brochas incluidas y otra de combinaciones de color. El cierre de la secuencia presenta **Paleta + 2 brochas incluidas / Del color a la aplicación**. El CTA abre el WhatsApp público de la escuela. No se atribuyen propiedades de fórmula o duración sin una ficha que las respalde.

La portada usa [`assets/silky/scroll-v7/`](assets/silky/scroll-v7/):

- 120 WebP, `frame-0001.webp` a `frame-0120.webp`, **1440 × 810 px**, transparencia conservada y calidad 82.
- **3,142,692 bytes (3.14 MB)** para la secuencia; el [manifiesto](assets/silky/scroll-v7/manifest.json) registra etapas y comprobaciones de archivos.
- Fotograma 64 como imagen de respaldo y vista estática con movimiento reducido.
- Carga al acercarse a la sección, hasta cuatro solicitudes simultáneas y caché de 20 imágenes en escritorio o 12 en móvil.
- En móvil se acorta el recorrido y se ajusta la escala del producto. El enlace **Ver características** permite llegar directamente al bento.

Las ocho vistas antiguas, el MP4 y la secuencia vertical de 150 imágenes permanecen como recursos de versiones anteriores. La portada actual utiliza exclusivamente la secuencia v007 de 120 imágenes para el efecto de desplazamiento.

## Publicación y recursos

GitHub Pages sirve el proyecto desde `main`. Esta documentación describe los archivos de trabajo; la publicación y la comprobación del resultado público se realizan después de enviar los cambios. El prototipo conserva `noindex, nofollow` y la identificación de vista previa en el pie.

La información académica procede del [sitio oficial de Seicento](https://seicento.edu.mx/), sus fichas y las indicaciones del responsable del proyecto. La colaboración fue confirmada por este último. Las fuentes y el alcance de cada beneficio se registran en el documento de copy. Los recursos de marca pertenecen a sus titulares; las imágenes de Silky proceden del material entregado para el proyecto.

Los enlaces de contacto llevan a Seicento y su WhatsApp. La demo no almacena datos mediante formularios propios.
