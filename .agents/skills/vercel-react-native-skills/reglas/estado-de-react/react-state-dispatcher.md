---
title: Dispatch updaters de useState para el estado que depende del valor actual
impact: MEDIUM
impactDescription: evita stale closures, evita re-renders innecesarios
tags: state, hooks, useState, callbacks
---

## Usa dispatch updaters para el estado que depende del valor actual

Cuando el siguiente estado depende del estado actual, usa un dispatch updater
(`setState(prev => ...)`) en lugar de leer la variable de estado directamente en un
callback. Esto evita stale closures y asegura que estés comparando contra el
valor más reciente.

**Incorrecto (lee el estado directamente):**

```tsx
const [size, setSize] = useState<Size | undefined>(undefined)

const onLayout = (e: LayoutChangeEvent) => {
  const { width, height } = e.nativeEvent.layout
  // size puede estar desactualizado en este closure
  if (size?.width !== width || size?.height !== height) {
    setSize({ width, height })
  }
}
```

**Correcto (dispatch updater):**

```tsx
const [size, setSize] = useState<Size | undefined>(undefined)

const onLayout = (e: LayoutChangeEvent) => {
  const { width, height } = e.nativeEvent.layout
  setSize((prev) => {
    if (prev?.width === width && prev?.height === height) return prev
    return { width, height }
  })
}
```

Devolver el valor anterior desde el updater omite el re-render.

Para los estados primitivos, no necesitas comparar los valores antes de disparar un
re-render.

**Incorrecto (comparación innecesaria para un estado primitivo):**

```tsx
const [size, setSize] = useState<Size | undefined>(undefined)

const onLayout = (e: LayoutChangeEvent) => {
  const { width, height } = e.nativeEvent.layout
  setSize((prev) => (prev === width ? prev : width))
}
```

**Correcto (establece el estado primitivo directamente):**

```tsx
const [size, setSize] = useState<Size | undefined>(undefined)

const onLayout = (e: LayoutChangeEvent) => {
  const { width, height } = e.nativeEvent.layout
  setSize(width)
}
```

Sin embargo, si el siguiente estado depende del estado actual, aun así debes usar un
dispatch updater.

**Incorrecto (lee el estado directamente desde el callback):**

```tsx
const [count, setCount] = useState(0)

const onTap = () => {
  setCount(count + 1)
}
```

**Correcto (dispatch updater):**

```tsx
const [count, setCount] = useState(0)

const onTap = () => {
  setCount((prev) => prev + 1)
}
```
