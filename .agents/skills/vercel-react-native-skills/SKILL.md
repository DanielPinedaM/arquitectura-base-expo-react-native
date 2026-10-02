---
name: vercel-react-native-skills
description:
  Buenas prácticas de React Native y Expo para construir apps móviles con buen rendimiento. Úsala
  al construir componentes de React Native, optimizar el rendimiento de las listas,
  implementar animaciones o trabajar con módulos nativos. Se activa en tareas
  que involucran React Native, Expo, rendimiento móvil o APIs nativas de la plataforma.
license: MIT
metadata:
  author: vercel
  version: "1.0.0"
---

# Skills de React Native

Buenas prácticas completas para aplicaciones de React Native y Expo. Contiene
reglas en múltiples categorías que cubren rendimiento, animaciones, patrones de UI
y optimizaciones específicas de cada plataforma.

# Resumen

Guía completa de optimización del rendimiento para aplicaciones de React Native, diseñada para agentes de IA y LLMs. Contiene más de 35 reglas en 13 categorías, priorizadas por impacto, desde críticas (renderizado fundamental, rendimiento de listas) hasta incrementales (fuentes, imports). Cada regla incluye explicaciones detalladas, ejemplos del mundo real que comparan implementaciones incorrectas vs. correctas y métricas de impacto específicas para guiar la refactorización y la generación de código automatizadas.

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

## Cuándo aplicarla

Consulta estos lineamientos cuando:

- Construyas apps de React Native o Expo
- Optimices el rendimiento de las listas y del scroll
- Implementes animaciones con Reanimated
- Trabajes con imágenes y multimedia
- Configures módulos nativos o fuentes
- Estructures proyectos monorepo con dependencias nativas

## Categorías de reglas por prioridad

| Prioridad | Categoría             | Impacto  | Prefijo              |
| --------- | --------------------- | -------- | -------------------- |
| 1         | Rendimiento de listas | CRITICAL | `list-performance-`  |
| 2         | Animación             | HIGH     | `animation-`         |
| 3         | Navegación            | HIGH     | `navigation-`        |
| 4         | Patrones de UI        | HIGH     | `ui-`                |
| 5         | Gestión del estado    | MEDIUM   | `react-state-`       |
| 6         | Renderizado           | MEDIUM   | `rendering-`         |
| 7         | Monorepo              | MEDIUM   | `monorepo-`          |
| 8         | Configuración         | LOW      | `fonts-`, `imports-` |

## Referencia rápida

### 1. Rendimiento de listas (CRITICAL)

- `list-performance-virtualize` - Usa FlashList para listas grandes
- `list-performance-item-memo` - Memoiza los componentes de los elementos de la lista
- `list-performance-callbacks` - Estabiliza las referencias de los callbacks
- `list-performance-inline-objects` - Evita objetos de estilo inline
- `list-performance-function-references` - Extrae las funciones fuera del render
- `list-performance-images` - Optimiza las imágenes en las listas
- `list-performance-item-expensive` - Mueve el trabajo costoso fuera de los elementos
- `list-performance-item-types` - Usa tipos de elementos para listas heterogéneas

### 2. Animación (HIGH)

- `animation-gpu-properties` - Anima solo transform y opacity
- `animation-derived-value` - Usa useDerivedValue para animaciones calculadas
- `animation-gesture-detector-press` - Usa Gesture.Tap en lugar de Pressable

### 3. Navegación (HIGH)

- `navigation-native-navigators` - Usa native stack y native tabs en lugar de navigators de JS

### 4. Patrones de UI (HIGH)

- `ui-expo-image` - Usa expo-image para todas las imágenes
- `ui-image-gallery` - Usa Galeria para los lightboxes de imágenes
- `ui-pressable` - Usa Pressable en lugar de TouchableOpacity
- `ui-safe-area-scroll` - Maneja las safe areas en los ScrollViews
- `ui-scrollview-content-inset` - Usa contentInset para los headers
- `ui-menus` - Usa context menus nativos
- `ui-native-modals` - Usa modales nativos cuando sea posible
- `ui-measure-views` - Usa onLayout, no measure()
- `ui-styling` - Usa StyleSheet.create o Nativewind

### 5. Gestión del estado (MEDIUM)

- `react-state-minimize` - Minimiza las suscripciones al estado
- `react-state-dispatcher` - Usa el patrón dispatcher para los callbacks
- `react-state-fallback` - Muestra un fallback en el primer render
- `react-compiler-destructure-functions` - Desestructura para React Compiler
- `react-compiler-reanimated-shared-values` - Maneja los shared values con el compiler

### 6. Renderizado (MEDIUM)

- `rendering-text-in-text-component` - Envuelve el texto en componentes Text
- `rendering-no-falsy-and` - Evita && con valores falsy para el renderizado condicional

### 7. Monorepo (MEDIUM)

- `monorepo-native-deps-in-app` - Mantén las dependencias nativas en el paquete de la app
- `monorepo-single-dependency-versions` - Usa versiones únicas en todos los paquetes

### 8. Configuración (LOW)

- `fonts-config-plugin` - Usa config plugins para las fuentes personalizadas
- `imports-design-system-folder` - Organiza los imports del design system
- `js-hoist-intl` - Haz hoisting de la creación de objetos Intl

## Cómo usarla

Lee los archivos de reglas individuales para ver explicaciones detalladas y ejemplos de código:

```
rules/list-performance-virtualize.md
rules/animation-gpu-properties.md
```

Cada archivo de regla contiene:

- Una breve explicación de por qué es importante
- Un ejemplo de código incorrecto con su explicación
- Un ejemplo de código correcto con su explicación
- Contexto adicional y referencias

## Documento compilado completo

Para la guía completa con todas las reglas desarrolladas: `AGENTS.md`
