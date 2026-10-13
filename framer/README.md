# Image Sequence Scrub para Framer

Componente: [`ImageSequenceScrub.tsx`](ImageSequenceScrub.tsx). Convierte el desplazamiento de una sección larga en el número de fotograma mostrado. La imagen permanece fija mientras se recorre la sección, como en una presentación de producto con *scroll scrubbing*.

## Ponerlo en Framer

1. En tu proyecto abre **Assets → Code → Create Code File**. Nómbralo `ImageSequenceScrub.tsx` y pega el contenido del archivo.
2. Arrastra el componente a la página. Dale todo el ancho disponible y deja su altura en **Auto**. La propiedad **Scroll (pantallas)** controla su altura interna; el valor inicial, `4`, crea una sección de cuatro pantallas y un recorrido útil de aproximadamente tres.
3. Abre **Preview** o publica para probarlo. En el lienzo del editor Framer muestra un fotograma fijo para evitar cargar y animar la secuencia mientras diseñas.
4. Mantén **Overflow / Clip Content** desactivado en los contenedores padres. Un padre con `overflow: hidden` o `auto` puede impedir que `position: sticky` se fije a la ventana.

## Secuencia Silky incluida

El archivo viene configurado con los 150 fotogramas WebP exportados del video de Blender, de `frame-0001.webp` a `frame-0150.webp`. Están publicados en:

`https://alexis01001415-oss.github.io/seicento-web-preview/assets/silky/sequence/`

En Framer, deja **Origen = Numerada**. Los ajustes iniciales ya coinciden con esa carpeta: prefijo `frame-`, extensión `webp`, primer número `1`, cantidad `150` y cuatro dígitos. **Ajuste = Completa** conserva el producto entero en pantalla; **Llenar** recorta los bordes para ocupar toda la ventana.

## Usar otra secuencia

- **Numerada:** sube archivos con nombres consecutivos (`frame-0001.webp`, `frame-0002.webp`…) a una carpeta pública y cambia la URL, prefijo, extensión, primer número, cantidad y dígitos.
- **Imágenes:** cambia **Origen** y selecciona manualmente los fotogramas en el orden deseado con el selector de imágenes de Framer. Es cómodo para series cortas.

El componente calcula el fotograma desde la posición real del scroll. Sólo pide cuatro imágenes a la vez y conserva como máximo 16 decodificadas; mientras llega la imagen solicitada, mantiene visible la última ya dibujada. Respeta la preferencia del usuario por movimiento reducido y muestra el primer fotograma sin animarlo.

**Tamaño de los recursos Silky:** 150 WebP de 900 × 1600 px, 3.65 MiB en total. La versión anterior de ocho imágenes sigue en la portada HTML como galería manual; esta carpeta adicional permite un scrub más fluido en Framer.

La implementación usa las APIs oficiales de [Code Components](https://www.framer.com/developers/components/property-controls), [Property Controls](https://www.framer.com/developers/property-controls), [Auto-Sizing](https://www.framer.com/developers/auto-sizing) y [`useIsStaticRenderer`](https://www.framer.com/developers/components-reference).
