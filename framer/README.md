# Image Sequence Scrub para Framer

Componente: [`ImageSequenceScrub.tsx`](ImageSequenceScrub.tsx). El desplazamiento controla qué imagen se muestra mientras el producto permanece fijo en pantalla. La secuencia avanza al bajar y retrocede al subir.

La revisión actual utiliza la secuencia horizontal **v007 de Silky Pro Palette, Seicento × Beauty Creations**: 120 WebP transparentes de 1440 × 810 px, con un peso conjunto de **3.14 MB**. El [manifiesto](../assets/silky/scroll-v7/manifest.json) registra sus etapas. Las ocho vistas y la secuencia vertical de 150 imágenes pertenecen a versiones anteriores.

## Instalar

1. En Framer abre **Assets → Code → Create Code File**. Crea `ImageSequenceScrub.tsx` y pega el contenido del archivo.
2. Arrastra el componente a la página. Usa todo el ancho disponible y altura **Auto**. **Scroll (pantallas)** controla la altura interna; `3.5` crea una sección de tres pantallas y media, con aproximadamente dos y media de recorrido útil.
3. Abre **Preview** para probar el desplazamiento. En el lienzo del editor se muestra la imagen de reposo, por defecto la paleta abierta del fotograma 64.
4. Mantén **Overflow / Clip Content** desactivado en los contenedores padres que deban permitir el efecto fijo. Un padre con `overflow: hidden` o `auto` puede cambiar el comportamiento de `position: sticky`.

## Configuración de Silky

Los valores iniciales del componente corresponden a estos recursos:

| Propiedad | Valor |
| --- | --- |
| Origen | Numerada |
| URL base | `https://alexis01001415-oss.github.io/seicento-web-preview/assets/silky/scroll-v7` |
| Prefijo | `frame-` |
| Extensión | `webp` |
| Primer número | `1` |
| Cantidad | `120` |
| Dígitos | `4` |
| Reposo | `64` |
| Scroll (pantallas) | `3.5` |
| Ajuste | Completa / `contain` |
| Fondo | `#ECECF0` |
| Texto accesible | Silky Pro Palette, una colaboración de Seicento y Beauty Creations |

La primera dirección se completa como `…/scroll-v7/frame-0001.webp` y la última como `…/scroll-v7/frame-0120.webp`. La URL base corresponde a la carpeta de publicación del proyecto; su disponibilidad depende de que esta revisión se haya enviado y desplegado en GitHub Pages.

**Reposo** cuenta la posición de la imagen desde 1. El valor 64 muestra la paleta abierta, en lugar del canto cerrado del primer fotograma. El componente limita ese valor a la cantidad real de imágenes y lo utiliza en el editor, durante la carga inicial y cuando la persona tiene activada la preferencia de movimiento reducido.

**Completa** conserva el encuadre de la secuencia. **Llenar** ocupa todo el escenario y puede recortar el producto, especialmente con estas imágenes horizontales en una pantalla vertical.

## Etapas de la secuencia

| Fotogramas | Vista |
| --- | --- |
| 1–6 | Estuche cerrado de frente |
| 7–30 | Apertura |
| 31–36 | Espejo frontal |
| 37–60 | Transición hacia la vista superior |
| 61–66 | Los 35 tonos |
| 67–84 | Cierre |
| 85–90 | Tapa y logos |
| 91–112 | Entrada de dos brochas |
| 113–120 | Conjunto final |

La imagen controla el recorrido; el texto se construye con capas de Framer. Para reproducir el relato del prototipo, usa **35 tonos. Todo por crear.** al inicio y desvanece ese texto durante la apertura. Los mensajes del espejo y los tonos acompañan sus vistas. Mantén los beneficios también en el bento como texto legible sin animación.

El [documento de copy y sistema visual](../docs/copy-design-system.md) contiene los cuatro bloques: 35 tonos, acabados mate y brillantes, espejo integrado y combinaciones de color. La referencia editorial y visual es la [presentación de AirPods Pro de Apple](https://www.apple.com/mx/airpods-pro/).

## Carga, movimiento y móvil

El componente calcula la imagen a partir del scroll real, pide hasta cuatro imágenes a la vez y conserva una caché acotada de 16 imágenes. La última imagen dibujada permanece visible mientras se carga la que corresponde al nuevo desplazamiento. Con movimiento reducido sólo solicita la imagen de reposo y la mantiene estática.

En móvil conserva **Completa** y ajusta la altura de scroll según la lectura. `3` pantallas es un punto de partida para una sección más breve. Prueba los puntos de apertura, espejo y vista superior en el ancho móvil de Framer; las imágenes transparentes permiten conservar el fondo gris claro sin un rectángulo negro alrededor del producto.

La portada HTML usa su propio cargador en [`assets/scroll-sequence.js`](../assets/scroll-sequence.js), con caché de 12 imágenes en móvil y 20 en escritorio, recorrido de 300/360 svh y transiciones de texto. El componente Framer aporta el canvas y el control de la secuencia; el bento, las leyendas y los enlaces se maquetan en Framer.

## Usar otras imágenes

- **Numerada:** sube archivos consecutivos a una carpeta pública y ajusta URL, prefijo, extensión, primer número, cantidad y dígitos.
- **Imágenes:** selecciona las imágenes con el selector de Framer y colócalas en el orden deseado. Es útil para una serie corta o con nombres distintos.
- Elige **Reposo** para que el editor y la vista estática comuniquen bien el producto. La primera imagen de una apertura puede mostrar muy poco del objeto.

La implementación usa las APIs oficiales de [Code Components](https://www.framer.com/developers/components/property-controls), [Property Controls](https://www.framer.com/developers/property-controls), [Auto-Sizing](https://www.framer.com/developers/auto-sizing) y [`useIsStaticRenderer`](https://www.framer.com/developers/components-reference).
