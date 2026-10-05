# Cómo crear una nueva regla

Un repositorio estructurado para crear y mantener buenas prácticas de React Native
optimizadas para agentes y LLMs.

## Estructura

- `reglas/` - Archivos de reglas individuales (uno por regla)
  - `crear-nueva-regla/`
    - `_secciones.md` - Metadata de las secciones (títulos, impactos, descripciones)
    - `_plantilla.md` - Plantilla para crear nuevas reglas
    - `como-crear-una-nueva-regla.md` - Esta guía
  - `<subcarpeta-de-la-categoría>/`
    - `area-descripcion.md` - Archivos de reglas individuales

## Crear una nueva regla

1. Copia `reglas/crear-nueva-regla/_plantilla.md` a `reglas/<subcarpeta-de-la-categoría>/area-descripcion.md`
2. Elige el prefijo de área apropiado:
   - `rendering-` para Renderizado fundamental → `reglas/renderizado-fundamental/`
   - `list-performance-` para Rendimiento de listas → `reglas/rendimiento-de-listas/`
   - `animation-` para Animación → `reglas/animacion/`
   - `scroll-` para Rendimiento del scroll → `reglas/rendimiento-del-scroll/`
   - `navigation-` para Navegación → `reglas/navegacion/`
   - `react-state-` para Estado de React → `reglas/estado-de-react/`
   - `state-` para Arquitectura del estado → `reglas/arquitectura-del-estado/`
   - `react-compiler-` para React Compiler → `reglas/react-compiler/`
   - `ui-` para Interfaz de usuario → `reglas/interfaz-de-usuario/`
   - `design-system-` para Design System → `reglas/design-system/`
   - `monorepo-` para Monorepo → `reglas/monorepo/`
   - `imports-` para Dependencias de terceros → `reglas/dependencias-de-terceros/`
   - `js-` para JavaScript → `reglas/javascript/`
   - `fonts-` para Fuentes → `reglas/fuentes/`

   Si ninguna categoría corresponde a la regla, primero sigue los pasos de [Si la regla necesita una categoría nueva](#si-la-regla-necesita-una-categoría-nueva).
3. Completa el frontmatter y el contenido
4. Asegúrate de tener ejemplos claros con explicaciones
5. Agrega la nueva regla a la Tabla de Contenido del SKILL.md, bajo el subtítulo de su categoría, con su ¿Cuándo leerlo?
6. Actualiza el conteo «N reglas en M categorías» del Resumen del SKILL.md.

## Si la regla necesita una categoría nueva

Si ninguna categoría existente corresponde a la regla, crea primero la categoría:

1. Agrega la sección a `reglas/crear-nueva-regla/_secciones.md`, con su número, su nombre, su prefijo entre paréntesis, su impacto y su descripción, en la posición que le corresponde según su prioridad (si cambia la numeración, renumera las secciones siguientes).
2. Crea la subcarpeta `reglas/<subcarpeta-de-la-categoría>/`. Su nombre se deriva del nombre de la categoría: en kebab-case y sin tildes ni ñ (por ejemplo, «Rendimiento del scroll» → `rendimiento-del-scroll`).
3. Agrega el prefijo y su subcarpeta a la lista de prefijos de [Crear una nueva regla](#crear-una-nueva-regla).
4. En el SKILL.md:
   - agrega una fila a «Categorías de reglas por prioridad», con la prioridad, la categoría (enlazada a su subtítulo de la Tabla de Contenido), el impacto y el prefijo;
   - agrega en la «Tabla de Contenido» el subtítulo `### N. <Categoría> (<IMPACTO>)`, con su línea «Carpeta:» y su tabla «Título y ruta archivo | ¿Cuándo leerlo?», en la posición que le corresponde según su prioridad; si cambia la numeración, actualiza los números y los enlaces de ancla de las categorías siguientes;
   - actualiza el conteo «N reglas en M categorías» del Resumen.
5. Después, sigue los pasos de [Crear una nueva regla](#crear-una-nueva-regla) para crear la regla dentro de la categoría nueva.

## Estructura de los archivos de reglas

Cada archivo de regla debe seguir esta estructura, que es el contenido de la plantilla `reglas/crear-nueva-regla/_plantilla.md`:

````markdown
---
title: Título de la regla aquí
impact: MEDIUM
impactDescription: Descripción opcional del impacto (p. ej., "20-50% de mejora")
tags: tag1, tag2
---

## Título de la regla aquí

**Impacto: MEDIUM (descripción opcional del impacto)**

Breve explicación de la regla y de por qué es importante. Debe ser clara y concisa, y explicar las implicaciones en el rendimiento.

**Incorrecto (descripción de lo que está mal):**

```typescript
// Ejemplo de código malo aquí
const bad = example();
```

**Correcto (descripción de lo que está bien):**

```typescript
// Ejemplo de código bueno aquí
const good = example();
```

Referencia: [Enlace a la documentación o recurso](https://example.com)
````

## Convención de nombres de archivos

- Los archivos que empiezan con `_` son especiales
- Archivos de reglas: `area-descripcion.md` (p. ej., `animation-propiedades-gpu.md`)
- Guarda la regla en la subcarpeta de su categoría: cada subcarpeta contiene solo las reglas de esa categoría (por ejemplo, `reglas/animacion/` solo tiene reglas de Animación).

## Niveles de impacto

- `CRITICAL` - Máxima prioridad, provoca crashes o UI rota
- `HIGH` - Mejoras de rendimiento significativas
- `MEDIUM` - Mejoras de rendimiento moderadas
- `LOW` - Mejoras incrementales
