---
title: Usa .get() y .set() para los shared values de Reanimated (no .value)
impact: LOW
impactDescription: necesario para la compatibilidad con React Compiler
tags: reanimated, react-compiler, shared-values
---

## Usa .get() y .set() para los shared values con React Compiler

Con React Compiler habilitado, usa `.get()` y `.set()` en lugar de leer o
escribir `.value` directamente en los shared values de Reanimated. El compiler no puede rastrear
el acceso a propiedades; los métodos explícitos aseguran un comportamiento correcto.

**Incorrecto (falla con React Compiler):**

```tsx
import { useSharedValue } from 'react-native-reanimated'

function Counter() {
  const count = useSharedValue(0)

  const increment = () => {
    count.value = count.value + 1 // queda excluido de react compiler
  }

  return <Button onPress={increment} title={`Count: ${count.value}`} />
}
```

**Correcto (compatible con React Compiler):**

```tsx
import { useSharedValue } from 'react-native-reanimated'

function Counter() {
  const count = useSharedValue(0)

  const increment = () => {
    count.set(count.get() + 1)
  }

  return <Button onPress={increment} title={`Count: ${count.get()}`} />
}
```

Consulta la
[documentación de Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/core/useSharedValue/#react-compiler-support)
para más información.
