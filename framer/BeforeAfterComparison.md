# Comparativa sin textos para Framer

Archivo completo: [BeforeAfterComparison.tsx](BeforeAfterComparison.tsx). Es independiente: incluye las dos imágenes y el deslizador, con fondo transparente. No necesita CSS externo ni otros componentes del proyecto.

## Instalar

1. En Framer, crea un **Code Component** llamado `BeforeAfterComparison` y sustituye todo su contenido por el del archivo `.tsx`.
2. Arrástralo a tu página. Tamaño inicial: **900 × 600 px**. Puedes usar ancho **Fill** y ajustar la altura en cada breakpoint; como referencia, 900 × 600 en escritorio y 360 × 450 en móvil.
3. Abre **Preview** para probar el arrastre. En el lienzo puedes cambiar la propiedad **Posición** para revisar cualquier punto de la comparación.

Las imágenes actuales ya están configuradas mediante sus URL públicas de GitHub Pages. Para alojarlas en tu proyecto de Framer, descarga [Antes](../assets/makeup-comparison/before-transparent.png) y [Después](../assets/makeup-comparison/after-fantasy-transparent.png), y selecciónalas en los campos **Antes** y **Después**. Ambas son PNG de 1536 × 1024 con fondo transparente.

## Controles

| Propiedad | Función |
| --- | --- |
| Antes / Después | Cambiar cada imagen desde Framer |
| Posición | Porcentaje visible de Antes; 0 muestra Después, 100 muestra Antes |
| Ajuste | Cubrir llena el marco con un recorte centrado; Contener conserva toda la imagen |
| Línea / Control / Flechas | Colores del divisor y su control circular |
| Tamaño | Diámetro del control, de 44 a 80 px |
| Radio | Redondeado del marco; 0 conserva la silueta sin esquinas redondeadas |
| Accesibilidad | Etiqueta para lectores de pantalla; nunca aparece como texto visible |

Utiliza imágenes con la misma proporción, persona, escala y encuadre para conservar la alineación. Las capas se recortan de forma complementaria para que los píxeles transparentes de una no dejen ver la otra. El fondo visible será el de la sección de Framer donde coloques el componente.

El deslizador permite arrastrar o tocar cualquier punto de la imagen. Con foco de teclado, usa flechas, Inicio y Fin. Conserva el scroll vertical y el zoom táctil. Si una imagen falla, muestra la otra completa y desactiva el deslizador sin añadir texto.

Implementación basada en las APIs oficiales de [Property Controls](https://www.framer.com/developers/property-controls) y [Auto-Sizing](https://www.framer.com/developers/auto-sizing).
