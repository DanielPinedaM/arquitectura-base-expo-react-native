---
title: Usa GestureDetector para estados de press animados
impact: MEDIUM
impactDescription: animaciones en el UI thread, feedback de press más fluido
tags: animation, gestures, press, reanimated
---

## Usa GestureDetector para estados de press animados

Para estados de press animados (scale, opacity al presionar), usa `GestureDetector` con
`Gesture.Tap()` y shared values en lugar de
`onPressIn`/`onPressOut` de Pressable. Los callbacks de gestos se ejecutan en el UI thread como worklets; no hay
ida y vuelta al JS thread para las animaciones de press.

**Incorrecto (Pressable con callbacks en el JS thread):**

```tsx
import { Pressable } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'

function AnimatedButton({ onPress }: { onPress: () => void }) {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => (scale.value = withTiming(0.95))}
      onPressOut={() => (scale.value = withTiming(1))}
    >
      <Animated.View style={animatedStyle}>
        <Text>Press me</Text>
      </Animated.View>
    </Pressable>
  )
}
```

**Correcto (GestureDetector con worklets en el UI thread):**

```tsx
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  runOnJS,
} from 'react-native-reanimated'

function AnimatedButton({ onPress }: { onPress: () => void }) {
  // Almacena el ESTADO del press (0 = no presionado, 1 = presionado)
  const pressed = useSharedValue(0)

  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.set(withTiming(1))
    })
    .onFinalize(() => {
      pressed.set(withTiming(0))
    })
    .onEnd(() => {
      runOnJS(onPress)()
    })

  // Deriva los valores visuales a partir del estado
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(withTiming(pressed.get()), [0, 1], [1, 0.95]) },
    ],
  }))

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={animatedStyle}>
        <Text>Press me</Text>
      </Animated.View>
    </GestureDetector>
  )
}
```

Almacena el **estado** del press (0 o 1) y luego deriva el scale mediante `interpolate`.
Esto mantiene el shared value como ground truth. Usa `runOnJS` para llamar funciones JS
desde worklets. Usa `.set()` y `.get()` para la compatibilidad con React Compiler.

Referencia:
[Gesture Handler Tap Gesture](https://docs.swmansion.com/react-native-gesture-handler/docs/gestures/tap-gesture)
