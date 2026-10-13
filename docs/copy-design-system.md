# Seicento · Copy y sistema visual de la propuesta

**Estado:** vista previa de rediseño, 12 de octubre de 2026. Es una referencia para construir la versión final en Framer. La página pública de prueba lleva una etiqueta visible y `noindex`.

## Idea central

Una escuela de maquillaje profesional necesita mostrar tres cosas con claridad: **qué puedes estudiar, cómo aprendes y qué puedes llegar a crear**. La estética es editorial, oscura y sobria. El color proviene del maquillaje, las producciones y la pieza 3D de Silky, no de adornos de interfaz.

## Arquitectura y copy de la portada

| Orden | Etiqueta | Título HTML | Idea principal | Acción |
| --- | --- | --- | --- | --- |
| 1 | Escuela de maquillaje profesional · CDMX | **H1: Haz del maquillaje tu profesión.** | Desarrolla técnica, estilo y un camino propio. | Explorar programas / WhatsApp |
| 2 | Carreras profesionales | H2: Elige el camino que se parece a ti. | Mostrar Pro Master, Integral y Social y Novias como carreras concretas, con duración y enlace individual. | Conocer cada carrera / Ver toda la oferta |
| 3 | Educación continua | H2: Siempre hay una técnica más por descubrir. | Especialidades, intensivos y talleres para profundizar o probar algo nuevo. | Explorar cada formato |
| 4 | Exploración visual · Producto en 3D | H2: El color cobra otra dimensión. | Silky Pro Palette mediante fotogramas, animación y fotos de referencia. | Recorrer la secuencia / Ver video |
| 5 | Método Seicento 3D3 | H2: Aprender maquillaje es ponerlo en práctica. | En las carreras profesionales: 70 % práctica, 20 % técnica y 10 % fundamentos. | Conocer el método |
| 6 | La experiencia Seicento | H2: Mucho más que una clase. | Black Learn, producciones, portafolio y master classes. | Descubre la experiencia |
| 7 | Más allá de la formación | H2: Tu trabajo merece ser visto. | Pro Beauty como propuesta de visibilidad profesional, con condiciones a consultar. | Conocer Pro Beauty |
| 8 | Maquillaje en acción | H2: La técnica también cuenta historias. | Producciones publicadas por Seicento. | Explorar historias |
| 9 | Reconocimiento académico | H2: Formación con respaldo. | SEP, CONOCER e IUM, explicados sin generalizar su alcance. | Conocer acreditaciones |
| 10 | La comunidad que enseña | H2: Aprende de quienes viven el maquillaje. | Retratos de docentes y acceso al equipo completo. | Profesores / Esencia |
| 11 | Ciudad de México | H2: Dos campus. Un espacio para crear. | Reforma y Coyoacán, direcciones y visita. | Conocer campus / Agenda una visita |
| 12 | Tu próximo paso | H2: Encuentra el momento para comenzar. | Conectar con la oferta vigente sin fechas o precios fijos y ofrecer la opción de preguntar por una clase muestra. | Consultar próximos inicios / Clase muestra |
| 13 | Antes de empezar | H2: Resolvamos tus dudas. | Orientación sobre programas, reconocimientos y campus. | Hablar con admisiones |
| 14 | Cierre | H2: Hablemos de lo que quieres crear. | Una invitación directa a conversar con la escuela. | Solicitar información |

La página conserva **un solo H1**. Cada bloque principal usa H2 y las carreras, formatos y módulos internos usan H3. En Framer, la etiqueta HTML debe configurarse por separado del tamaño visual.

## Sección Silky

El título del producto aparece en el modelo y en los archivos del proyecto Blender como **Silky Pro Palette**. La maqueta muestra:

- Ocho WebP extraídos de la animación 3D, con botones para retroceder, avanzar, elegir un fotograma o reproducir la secuencia.
- Un MP4 vertical de 10 segundos y 300 cuadros, que se carga sólo cuando se abre el reproductor.
- Dos fotografías de referencia del producto real, optimizadas para la web.

Los recursos están en [`assets/silky/`](../assets/silky/) y el [manifiesto](../assets/silky/manifest.json) registra nombres, tiempos y textos alternativos. Para cambiar la selección, reemplaza los archivos y actualiza los `data-src`, `data-alt` y miniaturas del bloque `#silky` en [`index.html`](../index.html). Para añadir más fotogramas, agrega más botones dentro de `.sequence-thumbs`; el contador se adapta automáticamente.

Para el efecto de desplazamiento en Framer, usa el [Code Component Image Sequence Scrub](../framer/README.md). Tiene una secuencia adicional de 150 fotogramas optimizados, independiente de esta galería manual.

**Límite editorial:** el render muestra marcas sobre la paleta, pero este material no acredita lanzamiento, venta, precio ni condiciones de una colaboración comercial. La sección se presenta como exploración visual.

## Design system para Framer

### Color

| Token | Valor | Uso |
| --- | --- | --- |
| `ink` | `#0B0A0B` | Fondo principal |
| `surface` | `#171516` | Navegación y respaldo |
| `ivory` | `#F5F2EF` | Texto principal y superficies claras |
| `paper` | `#EAE5DF` | Educación continua y campus |
| `muted` | `#B9B2AD` | Texto secundario oscuro |
| `rule` | `#343032` | Separadores |
| `accent` | `#CDB69E` | Etiquetas y foco |
| `silky` | `#080B14` | Fondo azul negro de la secuencia 3D |

El azul negro aparece sólo en el producto 3D. El resto de la interfaz mantiene la paleta casi monocroma para que las imágenes tengan protagonismo.

### Tipografía y retícula

- **Familia:** Manrope, pesos 400–700. El logo conserva su tipografía original.
- **H1:** 56–116 px; peso 500; interlineado 0.98; espaciado `-0.075em`.
- **H2:** 42–78 px; peso 500; interlineado 1.04; espaciado `-0.065em`.
- **H3:** 23–52 px según componente. Cuerpo: 13–20 px.
- **Contenedor:** máximo 1280 px. Margen lateral 52 px en escritorio, 32 px en tableta y 20 px en móvil.
- **Secciones:** 88–152 px de espacio vertical. Tarjetas rectangulares, líneas de 1 px, sin sombras decorativas.

### Componentes

- Botón principal marfil, texto casi negro, altura mínima de 54 px.
- Enlace secundario subrayado con flecha.
- Tarjetas de carreras con duración, nombre, descripción y enlace individual.
- Galería Silky con ocho miniaturas, controles de teclado nativos en botones y estado `aria-pressed`.
- Video nativo bajo un bloque expandible, con póster y `preload="none"`.
- Navegación fija con menú móvil; respetar `prefers-reduced-motion`.

## Información y fuentes

Los programas y formatos proceden de la [oferta educativa](https://seicento.edu.mx/carreras/). La composición 70/20/10 del método se describe en la [página 3D3](https://seicento.edu.mx/metodo-3d3/). La experiencia del alumno aparece en [Por qué estudiar en Seicento](https://seicento.edu.mx/porque-estudiar-en-seicento/) y en las fichas de carrera. Pro Beauty tiene una [página propia](https://seicento.edu.mx/plataforma_probeauty/). Los [profesores](https://seicento.edu.mx/profesores/), [campus](https://seicento.edu.mx/campus/), [SEP](https://seicento.edu.mx/sep/) e [IUM](https://seicento.edu.mx/ium/) se enlazan desde los bloques correspondientes.

El sitio oficial describe la certificación IUM para Integral de 12 meses y Pro Master de 14 meses, con requisitos. El copy de la demo no la atribuye a todos los programas. Tampoco fija precios, fechas, empleos, número de egresados ni superlativos como «primera» o «líder», porque requieren validación o cambian con el tiempo.

Las fotografías y logos de Seicento proceden de su sitio oficial. Las fotografías y el render de Silky proceden del proyecto local de Blender del usuario. Los recursos de marca conservan sus titulares.
