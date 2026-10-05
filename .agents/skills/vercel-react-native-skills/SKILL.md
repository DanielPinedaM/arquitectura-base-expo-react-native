---
name: vercel-react-native-skills
description:
  Buenas prácticas de React Native y Expo para construir apps móviles con buen rendimiento. Úsala
  al construir componentes de React Native, optimizar el rendimiento de las listas,
  implementar animaciones o trabajar con módulos nativos. Se activa en tareas
  que involucran React Native, Expo, rendimiento móvil o APIs nativas de la plataforma.
---

# Skills de React Native

## Resumen

Guía completa de buenas prácticas y optimización del rendimiento para aplicaciones de React Native y Expo, diseñada para agentes de IA y LLMs. Contiene reglas y categorías que cubren rendimiento, animaciones, patrones de UI y optimizaciones específicas de cada plataforma, priorizadas por impacto, desde críticas (renderizado fundamental) hasta incrementales (fuentes, imports). Cada regla incluye explicaciones detalladas, ejemplos del mundo real que comparan implementaciones incorrectas vs. correctas y métricas de impacto específicas para guiar la refactorización y la generación de código automatizadas.

## ¿Cuándo aplicar la skill?

Consulta estas reglas cuando:

- Construyas apps de React Native o Expo
- Optimices el rendimiento de las listas y del scroll
- Implementes animaciones con Reanimated
- Trabajes con imágenes y multimedia
- Configures módulos nativos o fuentes
- Estructures proyectos monorepo con dependencias nativas

## ¿Cómo Leer la Skill?

Lee **bajo demanda** los archivos `.md` ubicados en [`.agents/skills/vercel-react-native-skills/reglas/`](reglas/): usa la [Tabla de Contenido](#tabla-de-contenido) como referencia para inferir cuáles archivos son necesarios para la tarea que estás resolviendo, y accede únicamente a esos archivos.

**Razón**: leer todos los archivos consume contexto y tokens innecesariamente.

Hay dos criterios para leer un archivo:

1. La columna **¿Cuándo leerlo?**: abre el archivo cuando tu tarea coincida con la situación que describe.

2. [El **impacto**](#niveles-de-impacto) (CRITICAL → HIGH → MEDIUM-HIGH → MEDIUM → LOW-MEDIUM → LOW) que aparece entre paréntesis en el subtítulo de cada categoría de la [Tabla de Contenido](#tabla-de-contenido). Consulta las [Categorías de reglas por prioridad](#categorías-de-reglas-por-prioridad).

Cada archivo de regla contiene: una breve explicación de por qué es importante, un ejemplo de código incorrecto, un ejemplo de código correcto y contexto adicional con referencias.

## Niveles de impacto

| Nivel | Significado |
| ----- | ----------- |
| `CRITICAL` | Máxima prioridad; provoca fallos o errores en la interfaz de usuario |
| `HIGH` | Mejoras significativas en el rendimiento |
| `MEDIUM` | Mejoras moderadas en el rendimiento |
| `LOW` | Mejoras incrementales |

## Categorías de reglas por prioridad

| Prioridad | Categoría | Impacto | Prefijo |
| --------- | --------- | ------- | ------- |
| 1 | [Renderizado fundamental](#1-renderizado-fundamental-critical) | CRITICAL | `rendering-` |
| 2 | [Rendimiento de listas](#2-rendimiento-de-listas-high) | HIGH | `list-performance-` |
| 3 | [Animación](#3-animación-high) | HIGH | `animation-` |
| 4 | [Rendimiento del scroll](#4-rendimiento-del-scroll-high) | HIGH | `scroll-` |
| 5 | [Navegación](#5-navegación-high) | HIGH | `navigation-` |
| 6 | [Estado de React](#6-estado-de-react-medium) | MEDIUM | `react-state-` |
| 7 | [Arquitectura del estado](#7-arquitectura-del-estado-medium) | MEDIUM | `state-` |
| 8 | [React Compiler](#8-react-compiler-medium) | MEDIUM | `react-compiler-` |
| 9 | [Interfaz de usuario](#9-interfaz-de-usuario-medium) | MEDIUM | `ui-` |
| 10 | [Design System](#10-design-system-medium) | MEDIUM | `design-system-` |
| 11 | [Monorepo](#11-monorepo-low) | LOW | `monorepo-` |
| 12 | [Dependencias de terceros](#12-dependencias-de-terceros-low) | LOW | `imports-` |
| 13 | [JavaScript](#13-javascript-low) | LOW | `js-` |
| 14 | [Fuentes](#14-fuentes-low) | LOW | `fonts-` |

## Tabla de Contenido

### [1. Renderizado fundamental (CRITICAL)](reglas/renderizado-fundamental/)

| Título y ruta archivo | ¿Cuándo leerlo? |
| --- | --- |
| [Nunca uses && con valores potencialmente falsy](reglas/renderizado-fundamental/rendering-no-falsy-and.md) | Al renderizar contenido condicional con `&&` en JSX (`{count && <Text>...</Text>}`, `{name && ...}`) cuando el valor puede ser `0` o un string vacío, o al depurar un crash en producción que aparece solo con ciertos datos: usa un ternario con `null`, `!!` o un early return, y habilita la regla de lint `react/jsx-no-leaked-render`. |
| [Envuelve los strings en componentes Text](reglas/renderizado-fundamental/rendering-texto-en-componente-text.md) | Al escribir JSX que pone un string o una interpolación (`Hello, {name}!`) directamente dentro de un `<View>`, o al ver el error «Text strings must be rendered within a <Text> component»: todo texto debe ir dentro de un componente `<Text>`. |

### [2. Rendimiento de listas (HIGH)](reglas/rendimiento-de-listas/)

| Título y ruta archivo | ¿Cuándo leerlo? |
| --- | --- |
| [Evita objetos inline en renderItem](reglas/rendimiento-de-listas/list-performance-objetos-inline.md) | Al escribir el `renderItem` de una lista (`LegendList`, `FlashList`, `FlatList`) que crea objetos nuevos para pasarlos como props, como `user={{ id: item.id, ... }}` o un `style={{ ... }}` inline: pasa el `item` directamente o primitivos, deriva el estilo dentro del hijo memoizado o haz hoisting de los estilos estáticos al scope del módulo. |
| [Haz hoisting de los callbacks a la raíz de las listas](reglas/rendimiento-de-listas/list-performance-callbacks.md) | Al pasar funciones callback (`onPress`) a los elementos de una lista virtualizada y crearlas dentro de `renderItem` (`const onPress = () => handlePress(item.id)`): crea una única instancia del callback en la raíz de la lista y haz que cada elemento lo llame con su identificador. |
| [Mantén ligeros los elementos de la lista](reglas/rendimiento-de-listas/list-performance-elementos-costosos.md) | Al escribir el componente de cada fila de una lista virtualizada, o cuando el scroll tiene jank porque cada elemento hace queries (`useQuery`), lee varios `useContext` o hace cómputos costosos (`useMemo`): mueve la obtención de datos y los cómputos al padre, pasa valores precalculados como props y usa selectores de Zustand en lugar de React Context. |
| [Optimiza el rendimiento de las listas con referencias de objetos estables](reglas/rendimiento-de-listas/list-performance-referencias-de-funciones.md) | Cuando el padre de una lista virtualizada hace `map` o `filter` de los datos antes de pasarlos en `data` (por ejemplo, para combinarlos con lo que el usuario escribe en un buscador) y toda la lista hace re-render en cada pulsación de tecla: mantén estables las referencias de los objetos, transforma dentro de cada elemento con selectores de Zustand y usa `toSorted()` solo si los objetos internos no cambian. |
| [Pasa primitivos a los elementos de la lista para la memoization](reglas/rendimiento-de-listas/list-performance-memo-de-elementos.md) | Al definir las props de un componente de fila memoizado con `memo()` (`UserRow`), o cuando una fila hace re-render aunque sus datos no cambien porque recibe objetos completos (`user={item}`) o funciones inline: pasa solo primitivos (strings, numbers, booleans) y los campos que usa, y maneja los callbacks dentro del hijo a partir del `id`. |
| [Usa un virtualizador de listas para cualquier lista](reglas/rendimiento-de-listas/list-performance-virtualizar.md) | Al mostrar cualquier lista o pantalla desplazable con elementos repetidos (feeds, resultados de búsqueda, perfiles, configuración), incluso si es corta, o cuando ves un `ScrollView` con `items.map(...)`: usa un virtualizador de listas (`LegendList` de `@legendapp/list` o `FlashList` de `@shopify/flash-list`) con `keyExtractor` y `estimatedItemSize`. |
| [Usa imágenes comprimidas en las listas](reglas/rendimiento-de-listas/list-performance-imagenes.md) | Al mostrar imágenes dentro de los elementos de una lista (thumbnails de productos, avatares) que se cargan en resolución completa para un tamaño chico, o cuando el scroll tiene jank o consume mucha memoria por las imágenes: solicita imágenes comprimidas del tamaño apropiado (al doble para retina, con parámetros de redimensionamiento del CDN) y usa `expo-image` o `SolitoImage`. |
| [Usa tipos de elementos para listas heterogéneas](reglas/rendimiento-de-listas/list-performance-tipos-de-elementos.md) | Cuando una lista mezcla distintos layouts de elementos (encabezados, mensajes, imágenes) y un solo componente decide con condicionales qué renderizar: agrega un campo `type` a cada elemento y pásale `getItemType` (y `getEstimatedItemSize`) a `LegendList` para que cada tipo tenga su propio pool de reciclaje. |

### [3. Animación (HIGH)](reglas/animacion/)

| Título y ruta archivo | ¿Cuándo leerlo? |
| --- | --- |
| [Anima transform y opacity en lugar de propiedades de layout](reglas/animacion/animation-propiedades-gpu.md) | Al animar con Reanimated el tamaño o la posición de un elemento (`width`, `height`, `top`, `left`, `margin`, `padding`), como un panel que se expande o un elemento que entra deslizándose, o cuando una animación va a tirones: anima `transform` (`scale`, `translate`, `rotate`) y `opacity`, que se ejecutan en la GPU sin recalcular el layout. |
| [Prefiere useDerivedValue en lugar de useAnimatedReaction](reglas/animacion/animation-derived-value.md) | Cuando un shared value de Reanimated se calcula a partir de otro (por ejemplo, `opacity` a partir de `progress`) y se está usando `useAnimatedReaction` para asignarlo: usa `useDerivedValue`, y reserva `useAnimatedReaction` para efectos secundarios que no producen un valor (haptics, logging, `runOnJS`). |
| [Usa GestureDetector para estados de press animados](reglas/animacion/animation-gesture-detector-press.md) | Al crear un botón o un elemento que se anima al presionarlo (scale u opacity) usando `onPressIn`/`onPressOut` de `Pressable`: usa `GestureDetector` con `Gesture.Tap()` (`onBegin`, `onFinalize`, `onEnd` con `runOnJS`) y un shared value que guarde el estado del press, para que la animación corra en el UI thread. |

### [4. Rendimiento del scroll (HIGH)](reglas/rendimiento-del-scroll/)

| Título y ruta archivo | ¿Cuándo leerlo? |
| --- | --- |
| [Nunca rastrees la posición del scroll en useState](reglas/rendimiento-del-scroll/scroll-posicion-sin-estado.md) | Cuando necesitas la posición del scroll (`onScroll`, `contentOffset.y`) para animar un header, mostrar un botón o rastrearla, y está guardada en `useState`, lo que provoca re-renders en cada frame: usa un shared value con `useAnimatedScrollHandler` y `Animated.ScrollView` para animaciones, o `useRef` para un rastreo no reactivo. |

### [5. Navegación (HIGH)](reglas/navegacion/)

| Título y ruta archivo | ¿Cuándo leerlo? |
| --- | --- |
| [Usa navigators nativos para la navegación](reglas/navegacion/navigation-navigators-nativos.md) | Al configurar la navegación con stacks, tabs o headers (`@react-navigation/stack`, `@react-navigation/bottom-tabs`, `expo-router`), o al crear un header personalizado: usa navigators nativos (`@react-navigation/native-stack`, `react-native-bottom-tabs`, `NativeTabs` de expo-router) y las opciones de header nativas (`headerLargeTitleEnabled`, `headerSearchBarOptions`). |

### [6. Estado de React (MEDIUM)](reglas/estado-de-react/)

| Título y ruta archivo | ¿Cuándo leerlo? |
| --- | --- |
| [Minimiza las variables de estado y deriva los valores](reglas/estado-de-react/react-state-minimizar.md) | Al declarar varios `useState` para valores que se pueden calcular a partir de otros (un `total` o un `itemCount` a partir de `items`, un `fullName` a partir de `firstName` y `lastName`), o cuando un `useEffect` solo copia valores calculados al estado: deriva esos valores durante el render y deja en el estado solo la fuente de verdad mínima. |
| [Usa un estado de fallback en lugar de initialState](reglas/estado-de-react/react-state-fallback.md) | Cuando un `useState` se inicializa con una prop o con datos del servidor (`useState(defaultEnabled)`, `useState(data.theme)`) y queda desactualizado cuando esa fuente cambia: usa `undefined` como estado inicial y `??` para recurrir al valor del padre o del servidor, de modo que el estado guarde solo la elección del usuario. |
| [Dispatch updaters de useState para el estado que depende del valor actual](reglas/estado-de-react/react-state-dispatcher.md) | Cuando el siguiente estado depende del actual dentro de un callback (`setCount(count + 1)`, comparar el `size` anterior en `onLayout`) y hay riesgo de stale closures o de re-renders innecesarios: usa un dispatch updater (`setState(prev => ...)`) y devuelve `prev` para omitir el re-render; con estados primitivos, establece el valor directamente. |

### [7. Arquitectura del estado (MEDIUM)](reglas/arquitectura-del-estado/)

| Título y ruta archivo | ¿Cuándo leerlo? |
| --- | --- |
| [El estado debe representar el ground truth](reglas/arquitectura-del-estado/state-ground-truth.md) | Al decidir qué guardar en `useState` o en un shared value de Reanimated para una interacción o una animación: guarda el estado real (`pressed`, `progress`, `isOpen`) y deriva los valores visuales (`scale`, `opacity`, `translateY`, `height`) con cómputo o `interpolate`, en lugar de guardar el resultado visual o sincronizarlo con `useEffect`. |

### [8. React Compiler (MEDIUM)](reglas/react-compiler/)

| Título y ruta archivo | ¿Cuándo leerlo? |
| --- | --- |
| [Desestructura las funciones al inicio del render (React Compiler)](reglas/react-compiler/react-compiler-desestructurar-funciones.md) | Solo si el proyecto usa React Compiler: al llamar funciones de las props o de un hook con acceso por punto dentro de un handler (`props.onSave()`, `router.push()` con `const router = useRouter()`), desestructúralas al inicio del render (`{ onSave }`, `const { push } = useRouter()`) para que el compiler las use como claves de caché estables. |
| [Usa .get() y .set() para los shared values de Reanimated (no .value)](reglas/react-compiler/react-compiler-reanimated-shared-values.md) | Solo si el proyecto usa React Compiler: al leer o escribir shared values de Reanimated (`useSharedValue`) con `.value`, usa `.get()` y `.set()`, porque el compiler no puede rastrear el acceso a la propiedad `.value`. |

### [9. Interfaz de usuario (MEDIUM)](reglas/interfaz-de-usuario/)

| Título y ruta archivo | ¿Cuándo leerlo? |
| --- | --- |
| [Medir las dimensiones de las vistas](reglas/interfaz-de-usuario/ui-medir-vistas.md) | Al medir el ancho o el alto de una vista en React Native (para posicionar algo, animarlo o adaptar el layout): combina `useLayoutEffect` con `ref.current?.getBoundingClientRect()` (RN 0.82+, o `measure()` en versiones anteriores) para el tamaño inicial y `onLayout` para las actualizaciones, comparando los valores con un setState funcional para evitar re-renders. |
| [Patrones modernos de estilos en React Native](reglas/interfaz-de-usuario/ui-estilos.md) | Al escribir estilos de React Native (bordes redondeados, espaciado entre elementos, sombras, degradados, jerarquía de texto): usa `borderCurve: 'continuous'` con `borderRadius`, `gap` en lugar de margin, `boxShadow` como string CSS en lugar de `shadowColor` o `elevation`, `experimental_backgroundImage` en lugar de librerías de degradados, y peso y color en lugar de muchos `fontSize`. |
| [Usa contentInset para el espaciado dinámico del ScrollView](reglas/interfaz-de-usuario/ui-scrollview-content-inset.md) | Al agregar espacio arriba o abajo de un `ScrollView` que cambia en runtime (por el teclado, toolbars o contenido dinámico) y se está usando `paddingBottom` en `contentContainerStyle`: usa `contentInset` junto con `scrollIndicatorInsets`, que no recalculan el layout; para un espaciado estático, el padding está bien. |
| [Usa contentInsetAdjustmentBehavior para las safe areas](reglas/interfaz-de-usuario/ui-safe-area-scroll.md) | Al manejar la safe area (notch, status bar) en una pantalla con `ScrollView`, o cuando ves un `SafeAreaView` envolviendo el scroll o `useSafeAreaInsets` con padding manual: usa `contentInsetAdjustmentBehavior='automatic'` en el `ScrollView` raíz. |
| [Usa expo-image para imágenes optimizadas](reglas/interfaz-de-usuario/ui-expo-image.md) | Al mostrar cualquier imagen en la app (avatares, imágenes remotas) con el `Image` de `react-native`, o cuando necesitas caché, placeholders con blurhash, transiciones o prioridad de carga: usa el `Image` de `expo-image` (`placeholder`, `contentFit`, `transition`, `priority`, `cachePolicy`, `recyclingKey`), o `SolitoImage` para web y nativo. |
| [Usa Galeria para galerías de imágenes y lightbox](reglas/interfaz-de-usuario/ui-galeria-de-imagenes.md) | Al implementar una galería de imágenes o un visor en pantalla completa que se abre al tocar una imagen (lightbox), sobre todo si se está armando con un `Modal` y estado propio: usa `@nandorojo/galeria` (`Galeria`, `Galeria.Image`) con `expo-image`, que da shared element transitions, pinch-to-zoom y pan-to-close. |
| [Usa menús nativos para dropdowns y context menus](reglas/interfaz-de-usuario/ui-menus.md) | Al crear un dropdown, un menú de opciones o un context menu de long-press (con ítems destructivos, checkboxes o submenús), sobre todo si se está armando a mano con `Pressable` y una `View` con posición absoluta: usa menús nativos con zeego (`zeego/dropdown-menu`, `zeego/context-menu`). |
| [Usa modales nativos en lugar de bottom sheets basados en JS](reglas/interfaz-de-usuario/ui-modales-nativos.md) | Al mostrar un bottom sheet, un form sheet o un modal, o cuando ves una librería de bottom sheet basada en JS (`snapPoints`, `sheetRef.current?.expand()`): usa el `<Modal>` nativo con `presentationStyle='formSheet'`, o `presentation: 'formSheet'` con `sheetAllowedDetents` en React Navigation v7. |
| [Usa Pressable en lugar de los componentes Touchable](reglas/interfaz-de-usuario/ui-pressable.md) | Al crear un botón o un elemento táctil, o cuando ves `TouchableOpacity` o `TouchableHighlight`: usa `Pressable` de `react-native`, o el de `react-native-gesture-handler` dentro de listas desplazables; para animar el press (scale, opacity) se usa `GestureDetector`. |

### [10. Design System (MEDIUM)](reglas/design-system/)

| Título y ruta archivo | ¿Cuándo leerlo? |
| --- | --- |
| [Usa compound components en lugar de children polimórficos](reglas/design-system/design-system-compound-components.md) | Al crear componentes de un design system que reciben `children` de tipo `string \| React.ReactNode` y deciden con `typeof children === 'string'` si envolverlos en `<Text>` (botones, chips, badges), o que aceptan props como `icon`: usa compound components (`Button`, `ButtonText`, `ButtonIcon`) y deja que solo los componentes `*Text` reciban strings. |

### [11. Monorepo (LOW)](reglas/monorepo/)

| Título y ruta archivo | ¿Cuándo leerlo? |
| --- | --- |
| [Instala las dependencias nativas en el directorio de la app](reglas/monorepo/monorepo-dependencias-nativas-en-la-app.md) | En un monorepo, cuando un paquete compartido (`packages/ui`) usa una dependencia con código nativo (`react-native-reanimated`) o el autolinking no enlaza un módulo nativo: instala esa dependencia también en el `package.json` de la app nativa, porque el autolinking solo escanea el `node_modules` de la app. |
| [Usa una única versión de cada dependencia en todo el monorepo](reglas/monorepo/monorepo-version-unica-de-dependencias.md) | En un monorepo, al agregar o actualizar una dependencia en varios paquetes, o cuando hay versiones distintas o rangos (`^3.0.0` y `^3.5.0`) que duplican código en el bundle: usa una única versión exacta en todos los paquetes, forzada en la raíz con `overrides` de pnpm o npm, `resolutions` de yarn o syncpack. |

### [12. Dependencias de terceros (LOW)](reglas/dependencias-de-terceros/)

| Título y ruta archivo | ¿Cuándo leerlo? |
| --- | --- |
| [Importa desde la carpeta del design system](reglas/dependencias-de-terceros/imports-carpeta-del-design-system.md) | Al importar componentes básicos de `react-native` o de librerías de UI (`View`, `Text`, `Button`) en el código de la app, o al crear la carpeta de componentes compartidos: re-exporta esas dependencias desde una carpeta del design system (`@/components/view`) y haz que la app importe desde ahí, para poder cambiarlas de forma global. |

### [13. JavaScript (LOW)](reglas/javascript/)

| Título y ruta archivo | ¿Cuándo leerlo? |
| --- | --- |
| [Haz hoisting de la creación de formatters de Intl](reglas/javascript/js-hoist-intl.md) | Al formatear fechas, monedas, porcentajes o tiempos relativos con `Intl.DateTimeFormat`, `Intl.NumberFormat` o `Intl.RelativeTimeFormat` dentro de un componente, del render o de un bucle: crea el formatter una sola vez a nivel de módulo, o con `useMemo` si el locale es dinámico. |

### [14. Fuentes (LOW)](reglas/fuentes/)

| Título y ruta archivo | ¿Cuándo leerlo? |
| --- | --- |
| [Carga las fuentes de forma nativa en tiempo de build](reglas/fuentes/fonts-config-plugin.md) | Al agregar fuentes personalizadas a una app de Expo, o cuando ves `useFonts` o `Font.loadAsync` con una pantalla que espera a que carguen: incrusta las fuentes en tiempo de build con el config plugin de `expo-font` en `app.json` y ejecuta `npx expo prebuild`. |
