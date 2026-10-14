# Seicento · Vista previa de rediseño

[Demo del proyecto](https://alexis01001415-oss.github.io/seicento-web-preview/) · [Repositorio](https://github.com/alexis01001415-oss/seicento-web-preview)

Prototipo de Seicento Makeup School para personas que quieren estudiar maquillaje. La dirección visual toma como referencia la presentación de producto de [AirPods Pro de Apple](https://www.apple.com/mx/airpods-pro/): titulares breves, beneficios concretos, imágenes protagonistas y lectura por bloques.

La página conserva **siete opciones de carrera, 16 preguntas frecuentes y 18 secciones**, con un H1, 17 H2 en el contenido y un H2 accesible para el pie de página. La colaboración **Seicento × Beauty Creations** se presenta con una secuencia controlada por el desplazamiento y cinco bloques de características de Silky Pro Palette.

## Archivos de trabajo

| Archivo | Qué editar |
| --- | --- |
| [`index.html`](index.html) | Copy, jerarquía, enlaces, secciones y estructura del bento |
| [`styles.css`](styles.css) | Colores, tipografía, composición y adaptación a móvil |
| [`assets/admissions.css`](assets/admissions.css) | Pestañas de educación continua y formulario de admisiones |
| [`assets/makeup-comparison.css`](assets/makeup-comparison.css) / [`assets/makeup-comparison.js`](assets/makeup-comparison.js) | Comparativa Antes / Después con arrastre, teclado y botones |
| [`assets/footer.css`](assets/footer.css) | Contacto, campus, redes y directorio del pie de página |
| [`assets/admissions.js`](assets/admissions.js) | Navegación de pestañas, selección de programa y preparación de la consulta |
| [`assets/scroll-sequence.js`](assets/scroll-sequence.js) | Carga de imágenes, canvas, progreso y transiciones de texto |
| [`docs/copy-design-system.md`](docs/copy-design-system.md) | Copy y especificación para construir en Framer |
| [`framer/ImageSequenceScrub.tsx`](framer/ImageSequenceScrub.tsx) | Componente reutilizable para Framer; instalación en su [guía](framer/README.md) |

No hay proceso de compilación ni dependencias de aplicación. Para revisar el sitio, sirve la carpeta con un servidor HTTP estático, por ejemplo `python -m http.server 8000`, o utiliza la demo publicada del proyecto.

## Educación continua y contacto

La sección presenta tres pestañas: **Intensivos, Talleres y Especialidades**. Incluye los tres intensivos de 60 h, las 14 especialidades de 48 h y una selección de ocho talleres, además del acceso a la oferta completa. Las pestañas se controlan con clic, flechas izquierda/derecha, Inicio y Fin. Sin JavaScript, los tres contenidos siguen disponibles.

Los enlaces **Me interesa** preseleccionan el programa en el formulario. El contacto ofrece dos intenciones: **Información** y **Visita guiada**. Solicita nombre, teléfono, programa, campus y lectura del aviso de privacidad; el correo y el mensaje son opcionales. Para las visitas añade fecha y hora, restringe la elección a los campus físicos y comprueba horarios de CDMX: lunes a viernes de 09:00 a 18:00 h, fines de semana de 09:00 a 16:00 h. La visita queda sujeta a confirmación de admisiones.

**Preparar mi consulta** valida los campos y muestra el mensaje antes de abrir WhatsApp. La demo no envía automáticamente ni almacena los datos; el visitante confirma el envío en WhatsApp al número oficial de Seicento. Sin JavaScript conserva enlaces a WhatsApp y al formulario oficial.

Al trasladarlo a Framer, construye el formulario con la integración nativa de Forms y configura un destino real de recepción si se desea enviar directamente desde la web. El flujo de esta demo prepara una consulta para WhatsApp; no incluye un backend ni reutiliza los tokens temporales del formulario de WordPress.

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


## Antes / Después y footer

La sección [Antes / Después](https://alexis01001415-oss.github.io/seicento-web-preview/#antes-despues) muestra una modelo ficticia adulta, con el mismo encuadre, antes y después de añadir maquillaje. Las dos imágenes se generaron con la herramienta integrada `image_gen`: primero el retrato y después una edición para conservar la identidad y la composición. Son una demostración ilustrativa, identificada como IA en la página, no un trabajo real de alumnado.

- Imágenes: [`before.png`](assets/makeup-comparison/before.png) y [`after.png`](assets/makeup-comparison/after.png), 1536 × 1024 píxeles.
- [Prompts completos y procedencia](docs/makeup-image-prompts.json).
- Control mediante arrastre horizontal, deslizador nativo de teclado y botones de vista completa. Sin reproducción automática; las imágenes se cargan al acercarse al bloque. En móvil se aplica el mismo recorte a ambas.

El footer reúne las cuatro redes oficiales (Instagram, Facebook, YouTube y LinkedIn), direcciones y mapas de Reforma/Coyoacán, tres teléfonos, WhatsApp, horarios de visitas guiadas, acceso a plataformas, formación, comunidad y acreditaciones. El único correo publicado encontrado es `controlycalidad@seicento.edu.mx`, identificado para calidad y privacidad. Fuentes: [contacto](https://seicento.edu.mx/contacto/), [campus](https://seicento.edu.mx/campus/), [privacidad](https://seicento.edu.mx/aviso-de-privacidad/) e inicio oficial. No se ha inventado un correo de admisiones ni un enlace de términos que la fuente no publica.
