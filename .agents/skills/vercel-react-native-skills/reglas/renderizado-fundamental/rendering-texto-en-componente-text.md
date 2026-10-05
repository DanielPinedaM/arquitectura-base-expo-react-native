---
title: Envuelve los strings en componentes Text
impact: CRITICAL
impactDescription: evita crashes en runtime
tags: rendering, text, core
---

## Envuelve los strings en componentes Text

Los strings deben renderizarse dentro de `<Text>`. React Native hace crash si un string es un
hijo directo de `<View>`.

**Incorrecto (hace crash):**

```tsx
import { View } from 'react-native'

function Greeting({ name }: { name: string }) {
  return <View>Hello, {name}!</View>
}
// Error: Text strings must be rendered within a <Text> component.
```

**Correcto:**

```tsx
import { View, Text } from 'react-native'

function Greeting({ name }: { name: string }) {
  return (
    <View>
      <Text>Hello, {name}!</Text>
    </View>
  )
}
```
