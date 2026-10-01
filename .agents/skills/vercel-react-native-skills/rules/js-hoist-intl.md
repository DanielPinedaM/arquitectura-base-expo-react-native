---
title: Haz hoisting de la creación de formatters de Intl
impact: LOW-MEDIUM
impactDescription: evita la recreación costosa de objetos
tags: javascript, intl, optimization, memoization
---

## Haz hoisting de la creación de formatters de Intl

No crees `Intl.DateTimeFormat`, `Intl.NumberFormat` ni
`Intl.RelativeTimeFormat` dentro del render o de bucles. Son costosos de
instanciar. Haz hoisting al scope del módulo cuando el locale/las opciones sean estáticos.

**Incorrecto (nuevo formatter en cada render):**

```tsx
function Price({ amount }: { amount: number }) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  return <Text>{formatter.format(amount)}</Text>
}
```

**Correcto (con hoisting al scope del módulo):**

```tsx
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function Price({ amount }: { amount: number }) {
  return <Text>{currencyFormatter.format(amount)}</Text>
}
```

**Para locales dinámicos, memoiza:**

```tsx
const dateFormatter = useMemo(
  () => new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }),
  [locale]
)
```

**Formatters comunes a los que hacer hoisting:**

```tsx
// Formatters a nivel de módulo
const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })
const timeFormatter = new Intl.DateTimeFormat('en-US', { timeStyle: 'short' })
const percentFormatter = new Intl.NumberFormat('en-US', { style: 'percent' })
const relativeFormatter = new Intl.RelativeTimeFormat('en-US', {
  numeric: 'auto',
})
```

Crear objetos `Intl` es significativamente más costoso que crear `RegExp` u objetos
simples: cada instanciación analiza los datos del locale y construye tablas de búsqueda internas.
