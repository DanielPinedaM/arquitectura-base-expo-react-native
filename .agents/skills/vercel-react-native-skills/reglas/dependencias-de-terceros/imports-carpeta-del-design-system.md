---
title: Importa desde la carpeta del design system
impact: LOW
impactDescription: permite cambios globales y una refactorización sencilla
tags: imports, architecture, design-system
---

## Importa desde la carpeta del design system

Re-exporta las dependencias desde una carpeta del design system. El código de la app importa desde ahí,
no directamente desde los paquetes. Esto permite cambios globales y una refactorización sencilla.

**Incorrecto (importa directamente desde el paquete):**

```tsx
import { View, Text } from 'react-native'
import { Button } from '@ui/button'

function Profile() {
  return (
    <View>
      <Text>Hello</Text>
      <Button>Save</Button>
    </View>
  )
}
```

**Correcto (importa desde el design system):**

```tsx
// components/view.tsx
import { View as RNView } from 'react-native'

// ideal: elige las props que realmente vas a usar para controlar la implementación
export function View(
  props: Pick<React.ComponentProps<typeof RNView>, 'style' | 'children'>
) {
  return <RNView {...props} />
}
```

```tsx
// components/text.tsx
export { Text } from 'react-native'
```

```tsx
// components/button.tsx
export { Button } from '@ui/button'
```

```tsx
import { View } from '@/components/view'
import { Text } from '@/components/text'
import { Button } from '@/components/button'

function Profile() {
  return (
    <View>
      <Text>Hello</Text>
      <Button>Save</Button>
    </View>
  )
}
```

Empieza simplemente re-exportando. Personaliza más adelante sin cambiar el código de la app.
