---
title: Usa contentInset para el espaciado dinámico del ScrollView
impact: LOW
impactDescription: actualizaciones más fluidas, sin recálculo de layout
tags: scrollview, layout, contentInset, performance
---

## Usa contentInset para el espaciado dinámico del ScrollView

Al agregar espacio en la parte superior o inferior de un ScrollView que puede cambiar
(teclado, toolbars, contenido dinámico), usa `contentInset` en lugar de padding.
Cambiar `contentInset` no dispara el recálculo del layout: ajusta el
área de scroll sin volver a renderizar el contenido.

**Incorrecto (el padding provoca recálculo de layout):**

```tsx
function Feed({ bottomOffset }: { bottomOffset: number }) {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: bottomOffset }}>
      {children}
    </ScrollView>
  )
}
// Cambiar bottomOffset dispara un recálculo completo del layout
```

**Correcto (contentInset para el espaciado dinámico):**

```tsx
function Feed({ bottomOffset }: { bottomOffset: number }) {
  return (
    <ScrollView
      contentInset={{ bottom: bottomOffset }}
      scrollIndicatorInsets={{ bottom: bottomOffset }}
    >
      {children}
    </ScrollView>
  )
}
// Cambiar bottomOffset solo ajusta los límites del scroll
```

Usa `scrollIndicatorInsets` junto con `contentInset` para mantener alineado el indicador de
scroll. Para un espaciado estático que nunca cambia, el padding está bien.
