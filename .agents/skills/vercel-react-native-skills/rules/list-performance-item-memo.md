---
title: Pasa primitivos a los elementos de la lista para la memoization
impact: HIGH
impactDescription: permite una comparación efectiva con memo()
tags: lists, performance, memo, primitives
---

## Pasa primitivos a los elementos de la lista para la memoization

Cuando sea posible, pasa solo valores primitivos (strings, numbers, booleans) como props
a los componentes de los elementos de la lista. Los primitivos permiten que la comparación superficial en `memo()`
funcione correctamente, omitiendo re-renders cuando los valores no han cambiado.

**Incorrecto (una prop de tipo objeto requiere una comparación profunda):**

```tsx
type User = { id: string; name: string; email: string; avatar: string }

const UserRow = memo(function UserRow({ user }: { user: User }) {
  // memo() compara user por referencia, no por valor
  // Si el padre crea un nuevo objeto user, esto hace re-render aunque los datos sean iguales
  return <Text>{user.name}</Text>
})

renderItem={({ item }) => <UserRow user={item} />}
```

Esto aún puede optimizarse, pero es más difícil de memoizar correctamente.

**Correcto (las props primitivas permiten una comparación superficial):**

```tsx
const UserRow = memo(function UserRow({
  id,
  name,
  email,
}: {
  id: string
  name: string
  email: string
}) {
  // memo() compara cada primitivo directamente
  // Hace re-render solo si id, name o email realmente cambiaron
  return <Text>{name}</Text>
})

renderItem={({ item }) => (
  <UserRow id={item.id} name={item.name} email={item.email} />
)}
```

**Pasa solo lo que necesitas:**

```tsx
// Incorrecto: pasar el item completo cuando solo necesitas name
<UserRow user={item} />

// Correcto: pasa solo los campos que usa el componente
<UserRow name={item.name} avatarUrl={item.avatar} />
```

**Para los callbacks, haz hoisting o usa el ID del item:**

```tsx
// Incorrecto: una función inline crea una nueva referencia
<UserRow name={item.name} onPress={() => handlePress(item.id)} />

// Correcto: pasa el ID, manéjalo en el hijo
<UserRow id={item.id} name={item.name} />

const UserRow = memo(function UserRow({ id, name }: Props) {
  const handlePress = useCallback(() => {
    // usa id aquí
  }, [id])
  return <Pressable onPress={handlePress}><Text>{name}</Text></Pressable>
})
```

Las props primitivas hacen que la memoization sea predecible y efectiva.

**Nota:** Si tienes React Compiler habilitado, no necesitas usar
`memo()` ni `useCallback()`, pero lo relativo a las referencias de objetos sigue aplicando.
