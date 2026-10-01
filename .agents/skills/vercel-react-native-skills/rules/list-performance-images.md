---
title: Usa imágenes comprimidas en las listas
impact: HIGH
impactDescription: tiempos de carga más rápidos, menos memoria
tags: lists, images, performance, optimization
---

## Usa imágenes comprimidas en las listas

Carga siempre imágenes comprimidas y de tamaño apropiado en las listas. Las imágenes en resolución
completa consumen memoria excesiva y provocan jank en el scroll. Solicita thumbnails a
tu servidor o usa un CDN de imágenes con parámetros de redimensionamiento.

**Incorrecto (imágenes en resolución completa):**

```tsx
function ProductItem({ product }: { product: Product }) {
  return (
    <View>
      {/* Imagen de 4000x3000 cargada para un thumbnail de 100x100 */}
      <Image
        source={{ uri: product.imageUrl }}
        style={{ width: 100, height: 100 }}
      />
      <Text>{product.name}</Text>
    </View>
  )
}
```

**Correcto (solicita una imagen de tamaño apropiado):**

```tsx
function ProductItem({ product }: { product: Product }) {
  // Solicita una imagen de 200x200 (2x para retina)
  const thumbnailUrl = `${product.imageUrl}?w=200&h=200&fit=cover`

  return (
    <View>
      <Image
        source={{ uri: thumbnailUrl }}
        style={{ width: 100, height: 100 }}
        contentFit='cover'
      />
      <Text>{product.name}</Text>
    </View>
  )
}
```

Usa un componente de imagen optimizado con soporte integrado de caché y placeholders,
como `expo-image` o `SolitoImage` (que usa `expo-image` internamente).
Solicita las imágenes al doble (2x) del tamaño de visualización para las pantallas retina.
