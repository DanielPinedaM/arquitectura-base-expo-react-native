---
title: Usa un virtualizador de listas para cualquier lista
impact: HIGH
impactDescription: menos memoria, montajes más rápidos
tags: lists, performance, virtualization, scrollview
---

## Usa un virtualizador de listas para cualquier lista

Usa un virtualizador de listas como LegendList o FlashList en lugar de ScrollView con
children mapeados, incluso para listas cortas. Los virtualizadores solo renderizan los elementos visibles,
lo que reduce el uso de memoria y el tiempo de montaje. ScrollView renderiza todos los children de entrada,
lo que se vuelve costoso rápidamente.

**Incorrecto (ScrollView renderiza todos los elementos a la vez):**

```tsx
function Feed({ items }: { items: Item[] }) {
  return (
    <ScrollView>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </ScrollView>
  )
}
// 50 elementos = 50 componentes montados, aunque solo 10 sean visibles
```

**Correcto (el virtualizador renderiza solo los elementos visibles):**

```tsx
import { LegendList } from '@legendapp/list'

function Feed({ items }: { items: Item[] }) {
  return (
    <LegendList
      data={items}
      // si no estás usando React Compiler, envuelve estos con useCallback
      renderItem={({ item }) => <ItemCard item={item} />}
      keyExtractor={(item) => item.id}
      estimatedItemSize={80}
    />
  )
}
// Solo ~10-15 elementos visibles montados a la vez
```

**Alternativa (FlashList):**

```tsx
import { FlashList } from '@shopify/flash-list'

function Feed({ items }: { items: Item[] }) {
  return (
    <FlashList
      data={items}
      // si no estás usando React Compiler, envuelve estos con useCallback
      renderItem={({ item }) => <ItemCard item={item} />}
      keyExtractor={(item) => item.id}
    />
  )
}
```

Los beneficios aplican a cualquier pantalla con contenido desplazable: perfiles, configuración, feeds,
resultados de búsqueda. Usa la virtualización por defecto.
