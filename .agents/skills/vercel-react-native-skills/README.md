# Lineamientos de React Native

Un repositorio estructurado para crear y mantener buenas prácticas de React Native
optimizadas para agentes y LLMs.

## Estructura

- `rules/` - Archivos de reglas individuales (uno por regla)
  - `_sections.md` - Metadata de las secciones (títulos, impactos, descripciones)
  - `_template.md` - Plantilla para crear nuevas reglas
  - `area-description.md` - Archivos de reglas individuales
- `metadata.json` - Metadata del documento (versión, organización, resumen)
- **`AGENTS.md`** - Salida compilada (generada)

## Reglas

### Renderizado fundamental (CRITICAL)

- `rendering-text-in-text-component.md` - Envuelve los strings en componentes Text
- `rendering-no-falsy-and.md` - Evita el operador && con valores falsy en JSX

### Rendimiento de listas (HIGH)

- `list-performance-virtualize.md` - Usa listas virtualizadas (LegendList,
  FlashList)
- `list-performance-function-references.md` - Mantén referencias de objetos estables
- `list-performance-callbacks.md` - Haz hoisting de los callbacks a la raíz de la lista
- `list-performance-inline-objects.md` - Evita objetos inline en renderItem
- `list-performance-item-memo.md` - Pasa primitivos para la memoization
- `list-performance-item-expensive.md` - Mantén ligeros los elementos de la lista
- `list-performance-images.md` - Usa imágenes comprimidas en las listas
- `list-performance-item-types.md` - Usa tipos de elementos para listas heterogéneas

### Animación (HIGH)

- `animation-gpu-properties.md` - Anima transform/opacity en lugar del layout
- `animation-gesture-detector-press.md` - Usa GestureDetector para las animaciones
  de press
- `animation-derived-value.md` - Prefiere useDerivedValue en lugar de useAnimatedReaction

### Rendimiento del scroll (HIGH)

- `scroll-position-no-state.md` - Nunca rastrees el scroll en useState

### Navegación (HIGH)

- `navigation-native-navigators.md` - Usa native stack y native tabs

### Estado de React (MEDIUM)

- `react-state-dispatcher.md` - Usa actualizaciones funcionales de setState
- `react-state-fallback.md` - El estado debe representar solo la intención del usuario
- `react-state-minimize.md` - Minimiza las variables de estado, deriva los valores

### Arquitectura del estado (MEDIUM)

- `state-ground-truth.md` - El estado debe representar el ground truth

### React Compiler (MEDIUM)

- `react-compiler-destructure-functions.md` - Desestructura las funciones al inicio
- `react-compiler-reanimated-shared-values.md` - Usa .get()/.set() para los shared
  values

### Interfaz de usuario (MEDIUM)

- `ui-expo-image.md` - Usa expo-image para imágenes optimizadas
- `ui-image-gallery.md` - Usa Galeria para lightbox/galerías
- `ui-menus.md` - Dropdowns y context menus nativos con Zeego
- `ui-native-modals.md` - Usa el Modal nativo con formSheet
- `ui-pressable.md` - Usa Pressable en lugar de TouchableOpacity
- `ui-measure-views.md` - Medir las dimensiones de las vistas
- `ui-safe-area-scroll.md` - Usa contentInsetAdjustmentBehavior
- `ui-scrollview-content-inset.md` - Usa contentInset para el espaciado dinámico
- `ui-styling.md` - Patrones modernos de estilos (gap, boxShadow, degradados)

### Design System (MEDIUM)

- `design-system-compound-components.md` - Usa compound components

### Monorepo (LOW)

- `monorepo-native-deps-in-app.md` - Instala las dependencias nativas en el directorio de la app
- `monorepo-single-dependency-versions.md` - Versiones únicas de las dependencias

### Dependencias de terceros (LOW)

- `imports-design-system-folder.md` - Importa desde la carpeta del design system

### JavaScript (LOW)

- `js-hoist-intl.md` - Haz hoisting de la creación de formatters de Intl

### Fuentes (LOW)

- `fonts-config-plugin.md` - Carga las fuentes de forma nativa en tiempo de build

## Crear una nueva regla

1. Copia `rules/_template.md` a `rules/area-description.md`
2. Elige el prefijo de área apropiado:
   - `rendering-` para Renderizado fundamental
   - `list-performance-` para Rendimiento de listas
   - `animation-` para Animación
   - `scroll-` para Rendimiento del scroll
   - `navigation-` para Navegación
   - `react-state-` para Estado de React
   - `state-` para Arquitectura del estado
   - `react-compiler-` para React Compiler
   - `ui-` para Interfaz de usuario
   - `design-system-` para Design System
   - `monorepo-` para Monorepo
   - `imports-` para Dependencias de terceros
   - `js-` para JavaScript
   - `fonts-` para Fuentes
3. Completa el frontmatter y el contenido
4. Asegúrate de tener ejemplos claros con explicaciones

## Estructura de los archivos de reglas

Cada archivo de regla debe seguir esta estructura:

````markdown
---
title: Título de la regla aquí
impact: MEDIUM
impactDescription: Descripción opcional
tags: tag1, tag2, tag3
---

## Título de la regla aquí

Breve explicación de la regla y de por qué es importante.

**Incorrecto (descripción de lo que está mal):**

```tsx
// Ejemplo de código malo
```
````

**Correcto (descripción de lo que está bien):**

```tsx
// Ejemplo de código bueno
```

Referencia: [Enlace](https://example.com)

```

## Convención de nombres de archivos

- Los archivos que empiezan con `_` son especiales (excluidos del build)
- Archivos de reglas: `area-description.md` (p. ej., `animation-gpu-properties.md`)
- La sección se infiere automáticamente a partir del prefijo del nombre de archivo
- Las reglas se ordenan alfabéticamente por título dentro de cada sección

## Niveles de impacto

- `CRITICAL` - Máxima prioridad, provoca crashes o UI rota
- `HIGH` - Mejoras de rendimiento significativas
- `MEDIUM` - Mejoras de rendimiento moderadas
- `LOW` - Mejoras incrementales
```
