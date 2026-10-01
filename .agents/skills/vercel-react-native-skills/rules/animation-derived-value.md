---
title: Prefiere useDerivedValue en lugar de useAnimatedReaction
impact: MEDIUM
impactDescription: código más limpio, rastreo automático de dependencias
tags: animation, reanimated, derived-value
---

## Prefiere useDerivedValue en lugar de useAnimatedReaction

Al derivar un shared value a partir de otro, usa `useDerivedValue` en lugar de
`useAnimatedReaction`. Los derived values son declarativos, rastrean automáticamente
las dependencias y devuelven un valor que puedes usar directamente. Las animated reactions son
para efectos secundarios, no para derivaciones.

**Incorrecto (useAnimatedReaction para derivación):**

```tsx
import { useSharedValue, useAnimatedReaction } from 'react-native-reanimated'

function MyComponent() {
  const progress = useSharedValue(0)
  const opacity = useSharedValue(1)

  useAnimatedReaction(
    () => progress.value,
    (current) => {
      opacity.value = 1 - current
    }
  )

  // ...
}
```

**Correcto (useDerivedValue):**

```tsx
import { useSharedValue, useDerivedValue } from 'react-native-reanimated'

function MyComponent() {
  const progress = useSharedValue(0)

  const opacity = useDerivedValue(() => 1 - progress.get())

  // ...
}
```

Usa `useAnimatedReaction` solo para efectos secundarios que no producen un valor
(p. ej., disparar haptics, logging, llamar a `runOnJS`).

Referencia:
[Reanimated useDerivedValue](https://docs.swmansion.com/react-native-reanimated/docs/core/useDerivedValue)
