# Seicento · Vista previa de rediseño

[Ver demo](https://alexis01001415-oss.github.io/seicento-web-preview/) · [Abrir repositorio](https://github.com/alexis01001415-oss/seicento-web-preview)

Homepage de trabajo para revisar el rediseño de Seicento Makeup School. Es una página estática: el contenido, los estilos, el menú móvil y la secuencia de imágenes están en [`index.html`](index.html). Las imágenes y el video están en [`assets/`](assets/) y el copy y sistema visual en [`docs/copy-design-system.md`](docs/copy-design-system.md).

## Abrir y editar

Abre `index.html` en un navegador. No se necesita instalar dependencias ni ejecutar un servidor. Para cambiar copy, colores o disposición, edita el mismo archivo. Los tokens visuales están al comienzo del bloque `<style>`.

## Silky Pro Palette

La sección `#silky` permite recorrer ocho fotogramas del modelo 3D, reproducir una secuencia breve y abrir el video completo de 10 segundos. También muestra dos fotografías de referencia. Los recursos y sus textos alternativos se documentan en [`assets/silky/manifest.json`](assets/silky/manifest.json). Para sustituir imágenes, conserva los nombres o actualiza los `data-src` y las miniaturas en `index.html`.

El render contiene marcas en el objeto 3D. La maqueta lo presenta como una exploración visual y no afirma que el producto esté a la venta o que exista una colaboración comercial anunciada.

## Publicación

GitHub Pages sirve `index.html` desde la rama `main`. Cada cambio enviado a `main` actualiza la demo. La etiqueta visible de vista previa y `<meta name="robots" content="noindex, nofollow">` permanecerán hasta que Seicento apruebe una versión final.

## Contenido y recursos

Los textos y la jerarquía de títulos parten del [sitio oficial](https://seicento.edu.mx/). Se usa el logo original de Seicento y fotografías publicadas en su web. El logotipo IUM aparece junto a una aclaración sobre los programas elegibles; los beneficios y reconocimientos se deben confirmar por programa antes de publicar una versión oficial. Los recursos de marca siguen perteneciendo a sus titulares. Los recursos de Silky derivan de archivos del proyecto local de Blender del usuario.

Los botones de contacto abren la página oficial de Seicento o su número público de WhatsApp. La demo no recopila datos ni envía formularios propios.
