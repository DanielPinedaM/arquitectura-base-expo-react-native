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
  version: '1.0.0'
---

# Skills de React Native

Buenas prácticas completas para aplicaciones de React Native y Expo. Contiene
reglas en múltiples categorías que cubren rendimiento, animaciones, patrones de UI
y optimizaciones específicas de cada plataforma.

## Cuándo aplicarla

Consulta estos lineamientos cuando:

- Construyas apps de React Native o Expo
- Optimices el rendimiento de las listas y del scroll
- Implementes animaciones con Reanimated
- Trabajes con imágenes y multimedia
- Configures módulos nativos o fuentes
- Estructures proyectos monorepo con dependencias nativas

## Categorías de reglas por prioridad

| Prioridad | Categoría                | Impacto  | Prefijo              |
| --------- | ------------------------ | -------- | -------------------- |
| 1         | Rendimiento de listas    | CRITICAL | `list-performance-`  |
| 2         | Animación                | HIGH     | `animation-`         |
| 3         | Navegación               | HIGH     | `navigation-`        |
| 4         | Patrones de UI           | HIGH     | `ui-`                |
| 5         | Gestión del estado       | MEDIUM   | `react-state-`       |
| 6         | Renderizado              | MEDIUM   | `rendering-`         |
| 7         | Monorepo                 | MEDIUM   | `monorepo-`          |
| 8         | Configuración            | LOW      | `fonts-`, `imports-` |

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
