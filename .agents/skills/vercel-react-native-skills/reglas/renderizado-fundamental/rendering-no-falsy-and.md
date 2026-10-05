---
title: Nunca uses && con valores potencialmente falsy
impact: CRITICAL
impactDescription: evita crashes en producción
tags: rendering, conditional, jsx, crash
---

## Nunca uses && con valores potencialmente falsy

Nunca uses `{value && <Component />}` cuando `value` pueda ser un string vacío o
`0`. Estos son falsy pero renderizables en JSX: React Native intentará renderizarlos como
texto fuera de un componente `<Text>`, lo que provoca un crash grave en producción.

**Incorrecto (crash si count es 0 o name es ""):**

```tsx
function Profile({ name, count }: { name: string; count: number }) {
  return (
    <View>
      {name && <Text>{name}</Text>}
      {count && <Text>{count} items</Text>}
    </View>
  )
}
// Si name="" o count=0, renderiza el valor falsy → crash
```

**Correcto (ternario con null):**

```tsx
function Profile({ name, count }: { name: string; count: number }) {
  return (
    <View>
      {name ? <Text>{name}</Text> : null}
      {count ? <Text>{count} items</Text> : null}
    </View>
  )
}
```

**Correcto (conversión explícita a booleano):**

```tsx
function Profile({ name, count }: { name: string; count: number }) {
  return (
    <View>
      {!!name && <Text>{name}</Text>}
      {!!count && <Text>{count} items</Text>}
    </View>
  )
}
```

**Mejor (early return):**

```tsx
function Profile({ name, count }: { name: string; count: number }) {
  if (!name) return null

  return (
    <View>
      <Text>{name}</Text>
      {count > 0 ? <Text>{count} items</Text> : null}
    </View>
  )
}
```

Los early returns son lo más claro. Al usar condicionales inline, prefiere el ternario o
las verificaciones booleanas explícitas.

**Regla de lint:** Habilita `react/jsx-no-leaked-render` de
[eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-leaked-render.md)
para detectar esto automáticamente.
