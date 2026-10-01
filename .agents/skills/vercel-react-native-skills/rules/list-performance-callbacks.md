---
title: Haz hoisting de los callbacks a la raíz de las listas
impact: MEDIUM
impactDescription: Menos re-renders y listas más rápidas
tags: tag1, tag2
---

## Callbacks para el rendimiento de listas

**Impacto: HIGH (Menos re-renders y listas más rápidas)**

Al pasar funciones callback a los elementos de una lista, crea una única instancia del
callback en la raíz de la lista. Luego, los elementos deben llamarlo con un identificador
único.

**Incorrecto (crea un nuevo callback en cada render):**

```typescript
return (
  <LegendList
    renderItem={({ item }) => {
      // mal: crea un nuevo callback en cada render
      const onPress = () => handlePress(item.id)
      return <Item key={item.id} item={item} onPress={onPress} />
    }}
  />
)
```

**Correcto (una única instancia de la función pasada a cada elemento):**

```typescript
const onPress = useCallback(() => handlePress(item.id), [handlePress, item.id])

return (
  <LegendList
    renderItem={({ item }) => (
      <Item key={item.id} item={item} onPress={onPress} />
    )}
  />
)
```

Referencia: [Enlace a la documentación o recurso](https://example.com)
