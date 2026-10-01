---
title: Usa tipos de elementos para listas heterogéneas
impact: HIGH
impactDescription: reciclaje eficiente, menos layout thrashing
tags: list, performance, recycling, heterogeneous, LegendList
---

## Usa tipos de elementos para listas heterogéneas

Cuando una lista tiene diferentes layouts de elementos (mensajes, imágenes, encabezados, etc.), usa un
campo `type` en cada elemento y proporciona `getItemType` a la lista. Esto coloca los elementos
en pools de reciclaje separados, de modo que un componente de mensaje nunca se recicle como un
componente de imagen.

**Incorrecto (un solo componente con condicionales):**

```tsx
type Item = { id: string; text?: string; imageUrl?: string; isHeader?: boolean }

function ListItem({ item }: { item: Item }) {
  if (item.isHeader) {
    return <HeaderItem title={item.text} />
  }
  if (item.imageUrl) {
    return <ImageItem url={item.imageUrl} />
  }
  return <MessageItem text={item.text} />
}

function Feed({ items }: { items: Item[] }) {
  return (
    <LegendList
      data={items}
      renderItem={({ item }) => <ListItem item={item} />}
      recycleItems
    />
  )
}
```

**Correcto (elementos tipados con componentes separados):**

```tsx
type HeaderItem = { id: string; type: 'header'; title: string }
type MessageItem = { id: string; type: 'message'; text: string }
type ImageItem = { id: string; type: 'image'; url: string }
type FeedItem = HeaderItem | MessageItem | ImageItem

function Feed({ items }: { items: FeedItem[] }) {
  return (
    <LegendList
      data={items}
      keyExtractor={(item) => item.id}
      getItemType={(item) => item.type}
      renderItem={({ item }) => {
        switch (item.type) {
          case 'header':
            return <SectionHeader title={item.title} />
          case 'message':
            return <MessageRow text={item.text} />
          case 'image':
            return <ImageRow url={item.url} />
        }
      }}
      recycleItems
    />
  )
}
```

**Por qué es importante:**

- **Eficiencia del reciclaje**: Los elementos con el mismo tipo comparten un pool de reciclaje
- **Sin layout thrashing**: Un encabezado nunca se recicla como una celda de imagen
- **Type safety**: TypeScript puede acotar el tipo del elemento en cada rama
- **Mejor estimación del tamaño**: Usa `getEstimatedItemSize` con `itemType` para
  estimaciones precisas por tipo

```tsx
<LegendList
  data={items}
  keyExtractor={(item) => item.id}
  getItemType={(item) => item.type}
  getEstimatedItemSize={(index, item, itemType) => {
    switch (itemType) {
      case 'header':
        return 48
      case 'message':
        return 72
      case 'image':
        return 300
      default:
        return 72
    }
  }}
  renderItem={({ item }) => {
    /* ... */
  }}
  recycleItems
/>
```

Referencia:
[LegendList getItemType](https://legendapp.com/open-source/list/api/props/#getitemtype-v2)
