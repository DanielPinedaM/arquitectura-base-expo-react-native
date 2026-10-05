---
title: Mantén ligeros los elementos de la lista
impact: HIGH
impactDescription: reduce el tiempo de render de los elementos visibles durante el scroll
tags: lists, performance, virtualization, hooks
---

## Mantén ligeros los elementos de la lista

Los elementos de la lista deben ser lo menos costosos posible de renderizar. Minimiza los hooks, evita
las queries y limita el acceso a React Context. Las listas virtualizadas renderizan muchos elementos
durante el scroll: los elementos costosos provocan jank.

**Incorrecto (elemento de lista pesado):**

```tsx
function ProductRow({ id }: { id: string }) {
  // Mal: query dentro del elemento de la lista
  const { data: product } = useQuery(['product', id], () => fetchProduct(id))
  // Mal: múltiples accesos a context
  const theme = useContext(ThemeContext)
  const user = useContext(UserContext)
  const cart = useContext(CartContext)
  // Mal: cómputo costoso
  const recommendations = useMemo(
    () => computeRecommendations(product),
    [product]
  )

  return <View>{/* ... */}</View>
}
```

**Correcto (elemento de lista ligero):**

```tsx
function ProductRow({ name, price, imageUrl }: Props) {
  // Bien: recibe solo primitivos, hooks mínimos
  return (
    <View>
      <Image source={{ uri: imageUrl }} />
      <Text>{name}</Text>
      <Text>{price}</Text>
    </View>
  )
}
```

**Mueve la obtención de datos al padre:**

```tsx
// El padre obtiene todos los datos una sola vez
function ProductList() {
  const { data: products } = useQuery(['products'], fetchProducts)

  return (
    <LegendList
      data={products}
      renderItem={({ item }) => (
        <ProductRow name={item.name} price={item.price} imageUrl={item.image} />
      )}
    />
  )
}
```

**Para valores compartidos, usa selectores de Zustand en lugar de Context:**

```tsx
// Incorrecto: Context provoca re-render cuando cambia cualquier valor del carrito
function ProductRow({ id, name }: Props) {
  const { items } = useContext(CartContext)
  const inCart = items.includes(id)
  // ...
}

// Correcto: el selector de Zustand solo hace re-render cuando cambia este valor específico
function ProductRow({ id, name }: Props) {
  // usa Set.has (creado una sola vez en la raíz) en lugar de Array.includes()
  const inCart = useCartStore((s) => s.items.has(id))
  // ...
}
```

**Reglas para los elementos de la lista:**

- Sin queries ni obtención de datos
- Sin cómputos costosos (muévelos al padre o memoízalos a nivel del padre)
- Prefiere selectores de Zustand en lugar de React Context
- Minimiza los hooks useState/useEffect
- Pasa valores precalculados como props

El objetivo: los elementos de la lista deben ser funciones de renderizado simples que reciban props y
devuelvan JSX.
