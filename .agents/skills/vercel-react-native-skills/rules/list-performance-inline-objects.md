---
title: Evita objetos inline en renderItem
impact: HIGH
impactDescription: evita re-renders innecesarios de los elementos de lista memoizados
tags: lists, performance, flatlist, virtualization, memo
---

## Evita objetos inline en renderItem

No crees nuevos objetos dentro de `renderItem` para pasarlos como props. Los objetos inline
crean nuevas referencias en cada render, lo que rompe la memoization. En su lugar, pasa valores
primitivos directamente desde `item`.

**Incorrecto (un objeto inline rompe la memoization):**

```tsx
function UserList({ users }: { users: User[] }) {
  return (
    <LegendList
      data={users}
      renderItem={({ item }) => (
        <UserRow
          // Mal: nuevo objeto en cada render
          user={{ id: item.id, name: item.name, avatar: item.avatar }}
        />
      )}
    />
  )
}
```

**Incorrecto (objeto de estilo inline):**

```tsx
renderItem={({ item }) => (
  <UserRow
    name={item.name}
    // Mal: nuevo objeto de estilo en cada render
    style={{ backgroundColor: item.isActive ? 'green' : 'gray' }}
  />
)}
```

**Correcto (pasa el item directamente o primitivos):**

```tsx
function UserList({ users }: { users: User[] }) {
  return (
    <LegendList
      data={users}
      renderItem={({ item }) => (
        // Bien: pasa el item directamente
        <UserRow user={item} />
      )}
    />
  )
}
```

**Correcto (pasa primitivos, deriva dentro del hijo):**

```tsx
renderItem={({ item }) => (
  <UserRow
    id={item.id}
    name={item.name}
    isActive={item.isActive}
  />
)}

const UserRow = memo(function UserRow({ id, name, isActive }: Props) {
  // Bien: deriva el estilo dentro del componente memoizado
  const backgroundColor = isActive ? 'green' : 'gray'
  return <View style={[styles.row, { backgroundColor }]}>{/* ... */}</View>
})
```

**Correcto (haz hoisting de los estilos estáticos al scope del módulo):**

```tsx
const activeStyle = { backgroundColor: 'green' }
const inactiveStyle = { backgroundColor: 'gray' }

renderItem={({ item }) => (
  <UserRow
    name={item.name}
    // Bien: referencias estables
    style={item.isActive ? activeStyle : inactiveStyle}
  />
)}
```

Pasar primitivos o referencias estables permite que `memo()` omita re-renders cuando
los valores reales no han cambiado.

**Nota:** Si tienes React Compiler habilitado, este maneja la memoization
automáticamente y estas optimizaciones manuales se vuelven menos críticas.
