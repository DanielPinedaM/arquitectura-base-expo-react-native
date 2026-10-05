---
title: Minimiza las variables de estado y deriva los valores
impact: MEDIUM
impactDescription: menos re-renders, menos desincronización del estado
tags: state, derived-state, hooks, optimization
---

## Minimiza las variables de estado y deriva los valores

Usa la menor cantidad posible de variables de estado. Si un valor puede calcularse a partir del estado o de las props existentes, derívalo durante el render en lugar de almacenarlo en el estado. El estado redundante provoca re-renders innecesarios y puede desincronizarse.

**Incorrecto (estado redundante):**

```tsx
function Cart({ items }: { items: Item[] }) {
  const [total, setTotal] = useState(0)
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    setTotal(items.reduce((sum, item) => sum + item.price, 0))
    setItemCount(items.length)
  }, [items])

  return (
    <View>
      <Text>{itemCount} items</Text>
      <Text>Total: ${total}</Text>
    </View>
  )
}
```

**Correcto (valores derivados):**

```tsx
function Cart({ items }: { items: Item[] }) {
  const total = items.reduce((sum, item) => sum + item.price, 0)
  const itemCount = items.length

  return (
    <View>
      <Text>{itemCount} items</Text>
      <Text>Total: ${total}</Text>
    </View>
  )
}
```

**Otro ejemplo:**

```tsx
// Incorrecto: almacenar firstName, lastName Y fullName
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [fullName, setFullName] = useState('')

// Correcto: deriva fullName
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const fullName = `${firstName} ${lastName}`
```

El estado debe ser la fuente de verdad mínima. Todo lo demás se deriva.

Referencia: [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
