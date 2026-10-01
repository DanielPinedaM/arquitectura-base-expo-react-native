---
title: El estado debe representar el ground truth
impact: HIGH
impactDescription: lógica más limpia, depuración más sencilla, una única fuente de verdad
tags: state, derived-state, reanimated, hooks
---

## El estado debe representar el ground truth

Las variables de estado, tanto `useState` de React como los shared values de Reanimated, deben
representar el estado real de algo (p. ej., `pressed`, `progress`, `isOpen`),
no valores visuales derivados (p. ej., `scale`, `opacity`, `translateY`). Deriva
los valores visuales a partir del estado mediante cómputo o interpolación.

**Incorrecto (almacenar la salida visual):**

```tsx
const scale = useSharedValue(1)

const tap = Gesture.Tap()
  .onBegin(() => {
    scale.set(withTiming(0.95))
  })
  .onFinalize(() => {
    scale.set(withTiming(1))
  })

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.get() }],
}))
```

**Correcto (almacenar el estado, derivar lo visual):**

```tsx
const pressed = useSharedValue(0) // 0 = no presionado, 1 = presionado

const tap = Gesture.Tap()
  .onBegin(() => {
    pressed.set(withTiming(1))
  })
  .onFinalize(() => {
    pressed.set(withTiming(0))
  })

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: interpolate(pressed.get(), [0, 1], [1, 0.95]) }],
}))
```

**Por qué es importante:**

Las variables de estado deben representar el "estado" real, no necesariamente un resultado
final deseado.

1. **Una única fuente de verdad** — El estado (`pressed`) describe lo que está
   ocurriendo; lo visual se deriva
2. **Más fácil de extender** — Agregar opacity, rotación u otros efectos solo
   requiere más interpolaciones a partir del mismo estado
3. **Depuración** — Inspeccionar `pressed = 1` es más claro que `scale = 0.95`
4. **Lógica reutilizable** — El mismo valor `pressed` puede controlar múltiples propiedades
   visuales

**El mismo principio para el estado de React:**

```tsx
// Incorrecto: almacenar valores derivados
const [isExpanded, setIsExpanded] = useState(false)
const [height, setHeight] = useState(0)

useEffect(() => {
  setHeight(isExpanded ? 200 : 0)
}, [isExpanded])

// Correcto: deriva a partir del estado
const [isExpanded, setIsExpanded] = useState(false)
const height = isExpanded ? 200 : 0
```

El estado es la verdad mínima. Todo lo demás se deriva.
