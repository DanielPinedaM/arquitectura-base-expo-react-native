---
title: Usa un estado de fallback en lugar de initialState
impact: MEDIUM
impactDescription: fallbacks reactivos sin sincronización
tags: state, hooks, derived-state, props, initialState
---

## Usa un estado de fallback en lugar de initialState

Usa `undefined` como estado inicial y nullish coalescing (`??`) para recurrir a los
valores del padre o del servidor. El estado representa solo la intención del usuario: `undefined` significa
"el usuario aún no ha elegido". Esto permite fallbacks reactivos que se actualizan cuando la
fuente cambia, no solo en el render inicial.

**Incorrecto (sincroniza el estado, pierde la reactividad):**

```tsx
type Props = { fallbackEnabled: boolean }

function Toggle({ fallbackEnabled }: Props) {
  const [enabled, setEnabled] = useState(defaultEnabled)
  // Si fallbackEnabled cambia, el estado queda desactualizado
  // El estado mezcla la intención del usuario con el valor por defecto

  return <Switch value={enabled} onValueChange={setEnabled} />
}
```

**Correcto (el estado es la intención del usuario, fallback reactivo):**

```tsx
type Props = { fallbackEnabled: boolean }

function Toggle({ fallbackEnabled }: Props) {
  const [_enabled, setEnabled] = useState<boolean | undefined>(undefined)
  const enabled = _enabled ?? defaultEnabled
  // undefined = el usuario no lo ha tocado, recurre a la prop
  // Si defaultEnabled cambia, el componente lo refleja
  // Una vez que el usuario interactúa, su elección persiste

  return <Switch value={enabled} onValueChange={setEnabled} />
}
```

**Con datos del servidor:**

```tsx
function ProfileForm({ data }: { data: User }) {
  const [_theme, setTheme] = useState<string | undefined>(undefined)
  const theme = _theme ?? data.theme
  // Muestra el valor del servidor hasta que el usuario lo sobrescribe
  // Un refetch del servidor actualiza el fallback automáticamente

  return <ThemePicker value={theme} onChange={setTheme} />
}
```
