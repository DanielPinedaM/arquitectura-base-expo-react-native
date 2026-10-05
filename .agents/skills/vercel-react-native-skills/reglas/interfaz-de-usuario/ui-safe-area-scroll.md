---
title: Usa contentInsetAdjustmentBehavior para las safe areas
impact: MEDIUM
impactDescription: manejo nativo de la safe area, sin layout shifts
tags: safe-area, scrollview, layout
---

## Usa contentInsetAdjustmentBehavior para las safe areas

Usa `contentInsetAdjustmentBehavior="automatic"` en el ScrollView raíz en lugar de envolver el contenido en SafeAreaView o usar padding manual. Esto permite que iOS maneje los insets de la safe area de forma nativa con un comportamiento de scroll correcto.

**Incorrecto (wrapper SafeAreaView):**

```tsx
import { SafeAreaView, ScrollView, View, Text } from 'react-native'

function MyScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <Text>Content</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
```

**Incorrecto (padding manual de safe area):**

```tsx
import { ScrollView, View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

function MyScreen() {
  const insets = useSafeAreaInsets()

  return (
    <ScrollView contentContainerStyle={{ paddingTop: insets.top }}>
      <View>
        <Text>Content</Text>
      </View>
    </ScrollView>
  )
}
```

**Correcto (ajuste nativo del content inset):**

```tsx
import { ScrollView, View, Text } from 'react-native'

function MyScreen() {
  return (
    <ScrollView contentInsetAdjustmentBehavior='automatic'>
      <View>
        <Text>Content</Text>
      </View>
    </ScrollView>
  )
}
```

El enfoque nativo maneja las safe areas dinámicas (teclado, toolbars) y permite que el contenido se desplace detrás de la status bar de forma natural.
