---
title: Medir las dimensiones de las vistas
impact: MEDIUM
impactDescription: medición síncrona, evita re-renders innecesarios
tags: layout, measurement, onLayout, useLayoutEffect
---

## Medir las dimensiones de las vistas

Usa tanto `useLayoutEffect` (síncrono) como `onLayout` (para las actualizaciones). La medición
síncrona te da el tamaño inicial de inmediato; `onLayout` lo mantiene actualizado
cuando la vista cambia. Para los estados no primitivos, usa un dispatch updater para
comparar los valores y evitar re-renders innecesarios.

**Solo la altura:**

```tsx
import { useLayoutEffect, useRef, useState } from 'react'
import { View, LayoutChangeEvent } from 'react-native'

function MeasuredBox({ children }: { children: React.ReactNode }) {
  const ref = useRef<View>(null)
  const [height, setHeight] = useState<number | undefined>(undefined)

  useLayoutEffect(() => {
    // Medición síncrona al montar (RN 0.82+)
    const rect = ref.current?.getBoundingClientRect()
    if (rect) setHeight(rect.height)
    // Antes de 0.82: ref.current?.measure((x, y, w, h) => setHeight(h))
  }, [])

  const onLayout = (e: LayoutChangeEvent) => {
    setHeight(e.nativeEvent.layout.height)
  }

  return (
    <View ref={ref} onLayout={onLayout}>
      {children}
    </View>
  )
}
```

**Ambas dimensiones:**

```tsx
import { useLayoutEffect, useRef, useState } from 'react'
import { View, LayoutChangeEvent } from 'react-native'

type Size = { width: number; height: number }

function MeasuredBox({ children }: { children: React.ReactNode }) {
  const ref = useRef<View>(null)
  const [size, setSize] = useState<Size | undefined>(undefined)

  useLayoutEffect(() => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) setSize({ width: rect.width, height: rect.height })
  }, [])

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout
    setSize((prev) => {
      // para estados no primitivos, compara los valores antes de disparar un re-render
      if (prev?.width === width && prev?.height === height) return prev
      return { width, height }
    })
  }

  return (
    <View ref={ref} onLayout={onLayout}>
      {children}
    </View>
  )
}
```

Usa el setState funcional para comparar; no leas el estado directamente en el callback.
