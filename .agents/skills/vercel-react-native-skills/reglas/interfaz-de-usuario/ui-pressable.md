---
title: Usa Pressable en lugar de los componentes Touchable
impact: LOW
impactDescription: API moderna, más flexible
tags: ui, pressable, touchable, gestures
---

## Usa Pressable en lugar de los componentes Touchable

Nunca uses `TouchableOpacity` ni `TouchableHighlight`. En su lugar, usa `Pressable` de
`react-native` o de `react-native-gesture-handler`.

**Incorrecto (componentes Touchable legacy):**

```tsx
import { TouchableOpacity } from 'react-native'

function MyButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Text>Press me</Text>
    </TouchableOpacity>
  )
}
```

**Correcto (Pressable):**

```tsx
import { Pressable } from 'react-native'

function MyButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <Text>Press me</Text>
    </Pressable>
  )
}
```

**Correcto (Pressable de gesture handler para listas):**

```tsx
import { Pressable } from 'react-native-gesture-handler'

function ListItem({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <Text>Item</Text>
    </Pressable>
  )
}
```

Usa el Pressable de `react-native-gesture-handler` dentro de listas desplazables para una mejor
coordinación de gestos, siempre que también estés usando el ScrollView de
`react-native-gesture-handler`.

**Para estados de press animados (cambios de scale, opacity):** Usa `GestureDetector`
con shared values de Reanimated en lugar del style callback de Pressable. Consulta la
regla `animation-gesture-detector-press`.
