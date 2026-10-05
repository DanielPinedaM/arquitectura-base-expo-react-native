---
title: Desestructura las funciones al inicio del render (React Compiler)
impact: HIGH
impactDescription: referencias estables, menos re-renders
tags: rerender, hooks, performance, react-compiler
---

## Desestructura las funciones al inicio del render

Esta regla solo aplica si estás usando React Compiler.

Desestructura las funciones de los hooks al inicio del scope del render. Nunca accedas con punto a
objetos para llamar funciones. Las funciones desestructuradas son referencias estables; acceder con punto
crea nuevas referencias y rompe la memoization.

**Incorrecto (acceder con punto al objeto):**

```tsx
import { useRouter } from 'expo-router'

function SaveButton(props) {
  const router = useRouter()

  // mal: react-compiler usará como clave de la caché "props" y "router", que son objetos que cambian en cada render
  const handlePress = () => {
    props.onSave()
    router.push('/success') // referencia inestable
  }

  return <Button onPress={handlePress}>Save</Button>
}
```

**Correcto (desestructura al inicio):**

```tsx
import { useRouter } from 'expo-router'

function SaveButton({ onSave }) {
  const { push } = useRouter()

  // bien: react-compiler usará como clave push y onSave
  const handlePress = () => {
    onSave()
    push('/success') // referencia estable
  }

  return <Button onPress={handlePress}>Save</Button>
}
```
