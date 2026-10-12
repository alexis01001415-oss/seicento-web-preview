# Seicento Makeup School — propuesta de homepage

**Dirección:** editorial, oscura y minimalista. La interfaz es casi monocroma; las producciones de maquillaje aportan el color y el impacto. El mensaje principal habla de la aspiración del estudiante y conduce pronto a la oferta educativa.

## Diagnóstico breve

En la portada consultada el **11 de octubre de 2026** hay **9 H1 y 46 H2**. El titular «MAQUILLAJE» está partido entre dos H1, y varios módulos promocionales repiten H1. Tener varios H2 es normal; aquí conviene definirlos por secciones y usar H3 para nombres de programas. La propuesta usa un solo H1 completo y legible.

## Copy final de la portada

### Navegación

**Programas · La experiencia · Respaldo · Campus · Solicitar información**

### Hero

**Etiqueta:** Escuela de maquillaje profesional · Ciudad de México  
**H1 único:** Haz del maquillaje tu profesión.  
**Texto:** Desarrolla tu técnica, descubre tu estilo y crea tu propio camino. Estudia carreras, especialidades, intensivos y talleres en Reforma o Coyoacán.  
**CTA principal:** Explorar programas  
**CTA secundario:** Hablar con un asesor

**Franja de apoyo:** Formación práctica · Programas con incorporación a la SEP · Campus Reforma y Coyoacán

### Oferta educativa

**Etiqueta:** Oferta educativa  
**H2:** Elige cómo quieres crecer.  
**Texto:** Hay muchas formas de empezar y de seguir aprendiendo. Encuentra una formación que responda a tu experiencia y tus objetivos.

| H3 | Descripción | CTA |
| --- | --- | --- |
| Carreras profesionales | De Social y Novias a Integral y Pro Master: desarrolla una base para dedicarte al maquillaje. | Ver carreras |
| Especialidades | Profundiza en áreas como novias, editorial, cine y TV, aerógrafo o efectos especiales. | Ver especialidades |
| Intensivos | Concentra tu práctica en técnicas específicas con un formato de menor duración. | Ver intensivos |
| Talleres | Explora un tema puntual y mantén tu técnica en movimiento. | Ver talleres |

### Método

**Etiqueta:** Método Seicento 3D3  
**H2:** Domina la técnica. Encuentra tu firma.  
**Texto 1:** La práctica, la técnica y los fundamentos se encuentran en una formación que te invita a probar, crear y evolucionar.  
**Texto 2:** Aprende con profesionales del maquillaje y lleva cada conocimiento a tus propias manos.  
**CTA:** Conoce nuestro método

### Respaldo

**Etiqueta:** Reconocimiento académico  
**H2:** Formación con respaldo.  
**Texto:** Conoce las incorporaciones y opciones de evaluación disponibles para cada programa. Elegir bien también es conocer las condiciones de tu formación.  
**SEP:** Seicento cuenta con programas incorporados a la Secretaría de Educación Pública.  
**CONOCER:** Centro evaluador de estándares de competencia laboral.  
**IUM:** Certificación disponible en Integral y Pro Master, sujeta a los requisitos de IUM.  
**Nota:** El reconocimiento, la certificación y sus requisitos varían según el programa.  
**CTA:** Conocer acreditaciones

### Comunidad

**Etiqueta:** Más allá del aula  
**H2:** Una comunidad para seguir creando.  
**Texto 1:** Comparte ideas y experiencias con profesores, estudiantes y egresados que viven el maquillaje como profesión.  
**Texto 2:** Según el programa, podrás acceder a producciones, contenidos en Black Learn y herramientas de vinculación profesional como Pro Beauty.  
**CTA:** Descubre la experiencia

### Campus

**Etiqueta:** Ciudad de México  
**H2:** Estudia donde comienza tu siguiente etapa.  
**H3 Reforma:** Londres 102, planta alta, colonia Juárez, Cuauhtémoc, CDMX.  
**H3 Coyoacán:** Av. Miguel Ángel de Quevedo 773, San Francisco, Coyoacán, CDMX.  
**CTA por campus:** Conocer el campus

### Cierre

**Etiqueta:** Tu siguiente paso  
**H2:** Hablemos de lo que quieres crear.  
**Texto:** Cuéntanos qué quieres aprender y te ayudamos a encontrar un programa acorde con tu experiencia.  
**CTA:** Solicitar información

### Preguntas frecuentes de la versión web

**H2:** Resolvamos tus dudas.  
**¿Qué programa va conmigo?** Hay carreras, especialidades, intensivos y talleres para distintos objetivos. Explora cada formato y consulta los requisitos de la opción que te interese.  
**¿Qué reconocimiento tiene cada programa?** La incorporación a la SEP y las certificaciones dependen del programa y de requisitos específicos. Revisa su ficha y confirma las condiciones antes de inscribirte.  
**¿Puedo visitar un campus?** Sí. Puedes solicitar una visita guiada a Reforma o Coyoacán desde nuestra página de contacto.

### SEO

**Title:** Escuela de maquillaje profesional en CDMX | Seicento  
**Meta description:** Estudia maquillaje profesional en Seicento. Explora carreras, especialidades, intensivos y talleres en nuestros campus Reforma y Coyoacán, CDMX.

## Design system para Framer

### Color

| Token | Valor | Uso |
| --- | --- | --- |
| `ink` | `#0B0A0B` | Fondo principal y texto en zonas claras |
| `surface` | `#171516` | Navegación, bloques oscuros y respaldo |
| `ivory` | `#F5F2EF` | Texto principal, botones y sección de programas |
| `paper` | `#EAE5DF` | Sección de campus |
| `muted` | `#B9B2AD` | Texto secundario sobre negro |
| `rule` | `#343032` | Líneas finas y separadores oscuros |
| `accent` | `#CDB69E` | Etiquetas, foco y hover discreto |

El acento cálido ocupa una proporción muy pequeña. Azul, rosa y rojo llegan de la fotografía, no de botones ni fondos decorativos.

### Tipografía

- **Familia:** Manrope, pesos 400, 500, 600 y 700. El logotipo original conserva su tipografía propia.
- **H1:** 56–116 px según ancho, peso 500, interlineado `0.98`, espaciado `-0.075em`.
- **H2:** 42–78 px, peso 500, interlineado `1.04`, espaciado `-0.065em`.
- **H3:** 27–40 px, peso 500.
- **Cuerpo:** 17–20 px para introducciones; 13–15 px para apoyo y detalles, interlineado `1.6`.
- **Etiquetas:** 11 px, peso 700, mayúsculas y espaciado `0.19em`.

En Framer, el tamaño visual y la etiqueta HTML se configuran por separado. El H1 puede ocupar varias líneas, pero debe seguir siendo **un solo elemento**.

### Retícula y espacio

- Contenedor máximo: **1280 px**.
- Márgenes laterales: **52 px escritorio**, **32 px tableta**, **20 px móvil**.
- Retícula de 12 columnas como guía; composiciones editoriales 50/50 o 45/55.
- Espacio entre secciones: **88–152 px** según viewport.
- Sistema de espaciado: base **8 px**; separar elementos con múltiplos de 8/16/24/40/64.
- Línea divisoria de 1 px. Imágenes rectangulares y sin marcos ornamentales.

### Componentes y movimiento

- **Botón principal:** marfil con texto casi negro, altura mínima 54 px, esquinas rectas. Hover en `accent`.
- **Enlace secundario:** texto con línea inferior y flecha `↗`.
- **Lista de programas:** filas amplias con número, nombre, descripción y flecha. Sin carrusel automático.
- **Navegación:** barra fija oscura, desenfoque sutil y menú móvil accesible.
- **Movimiento:** transiciones de 200–250 ms para hover. Respetar `prefers-reduced-motion`.

### Fotografía y logos

Usar una sola producción con gran presencia en el hero. Alternar después con retratos editoriales amplios y zonas de descanso visual. La maqueta usa el [logo blanco original](https://seicento.edu.mx/wp-content/uploads/2025/09/logo_footer-blanco.webp), una [producción artística de portada](https://seicento.edu.mx/wp-content/uploads/2026/03/portad_ro_beauty_2.webp), una [producción escultórica](https://seicento.edu.mx/wp-content/uploads/2026/05/maquillaje_marmol.webp) y una [producción azul](https://seicento.edu.mx/wp-content/uploads/2026/02/alicia_3_1.webp).

Los logos de terceros que aparecen en el sitio deben ir en una franja discreta, con una etiqueta que describa exactamente cada relación **una vez confirmada por Seicento**. No llamar a todas las marcas «alianzas»: la portada actual no explica sus vínculos. Para SEP, CONOCER e IUM, acompañar los signos de una frase sobre el alcance real de cada reconocimiento.

## Implementación en Framer

1. Hero: un elemento `H1`, con etiqueta superior en `span` o párrafo.
2. Cada bloque principal: un `H2`; cada opción de programa y campus: `H3`.
3. Revisar que la versión móvil use los mismos tags semánticos, sin duplicar un segundo H1 oculto.
4. Cargar title, meta description, textos alternativos de imágenes y enlaces descriptivos.
5. La versión de trabajo enlaza al calendario general. Conectar cada programa a una ficha verificada cuando se normalice el catálogo.
6. La demo pública lleva una etiqueta de vista previa y `noindex` mientras el diseño esté en revisión.

## Datos a validar antes de publicar

El sitio afirma «líder en Latinoamérica», «primera escuela», «más de 20 mil egresados» y «más de 1500 m²». No se usan como titulares hasta confirmar evidencia y vigencia. También hay fichas con horas y beneficios de certificación inconsistentes; por eso el copy principal evita precios, horas, fechas y promesas de empleo.

Fuentes: [inicio](https://seicento.edu.mx/), [oferta educativa](https://seicento.edu.mx/carreras/), [método 3D3](https://seicento.edu.mx/metodo-3d3/), [SEP](https://seicento.edu.mx/sep/), [IUM](https://seicento.edu.mx/ium/), [por qué estudiar en Seicento](https://seicento.edu.mx/porque-estudiar-en-seicento/) y [campus](https://seicento.edu.mx/campus/).
