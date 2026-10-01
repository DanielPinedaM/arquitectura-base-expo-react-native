---
title: Anima transform y opacity en lugar de propiedades de layout
impact: HIGH
impactDescription: animaciones aceleradas por GPU, sin recálculo de layout
tags: animation, performance, reanimated, transform, opacity
---

## Anima transform y opacity en lugar de propiedades de layout

Evita animar `width`, `height`, `top`, `left`, `margin` o `padding`. Estas disparan el recálculo del layout en cada frame. En su lugar, usa `transform` (scale, translate) y `opacity`, que se ejecutan en la GPU sin disparar el layout.

**Incorrecto (anima height, dispara el layout en cada frame):**

```tsx
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

function CollapsiblePanel({ expanded }: { expanded: boolean }) {
  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(expanded ? 200 : 0), // dispara el layout en cada frame
    overflow: 'hidden',
  }))

  return <Animated.View style={animatedStyle}>{children}</Animated.View>
}
```

**Correcto (anima scaleY, acelerado por GPU):**

```tsx
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

function CollapsiblePanel({ expanded }: { expanded: boolean }) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scaleY: withTiming(expanded ? 1 : 0) },
    ],
    opacity: withTiming(expanded ? 1 : 0),
  }))

  return (
    <Animated.View style={[{ height: 200, transformOrigin: 'top' }, animatedStyle]}>
      {children}
    </Animated.View>
  )
}
```

**Correcto (anima translateY para animaciones de deslizamiento):**

```tsx
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

function SlideIn({ visible }: { visible: boolean }) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: withTiming(visible ? 0 : 100) },
    ],
    opacity: withTiming(visible ? 1 : 0),
  }))

  return <Animated.View style={animatedStyle}>{children}</Animated.View>
}
```

Propiedades aceleradas por GPU: `transform` (translate, scale, rotate), `opacity`. Todo lo demás dispara el layout.
