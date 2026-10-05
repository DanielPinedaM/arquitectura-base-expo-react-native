---
title: Nunca rastrees la posición del scroll en useState
impact: HIGH
impactDescription: evita el render thrashing durante el scroll
tags: scroll, performance, reanimated, useRef
---

## Nunca rastrees la posición del scroll en useState

Nunca almacenes la posición del scroll en `useState`. Los eventos de scroll se disparan rápidamente: las actualizaciones
de estado provocan render thrashing y frames perdidos. Usa un shared value de Reanimated
para las animaciones o una ref para un rastreo no reactivo.

**Incorrecto (useState provoca jank):**

```tsx
import { useState } from 'react'
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'

function Feed() {
  const [scrollY, setScrollY] = useState(0)

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollY(e.nativeEvent.contentOffset.y) // hace re-render en cada frame
  }

  return <ScrollView onScroll={onScroll} scrollEventThrottle={16} />
}
```

**Correcto (Reanimated para animaciones):**

```tsx
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated'

function Feed() {
  const scrollY = useSharedValue(0)

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y // se ejecuta en el UI thread, sin re-render
    },
  })

  return (
    <Animated.ScrollView
      onScroll={onScroll}
      // un número más alto tiene mejor rendimiento, pero se dispara con menos frecuencia.
      // quita esto si necesitas mayor precisión por encima del rendimiento.
      scrollEventThrottle={16}
    />
  )
}
```

**Correcto (ref para un rastreo no reactivo):**

```tsx
import { useRef } from 'react'
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'

function Feed() {
  const scrollY = useRef(0)

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.current = e.nativeEvent.contentOffset.y // sin re-render
  }

  return <ScrollView onScroll={onScroll} scrollEventThrottle={16} />
}
```
