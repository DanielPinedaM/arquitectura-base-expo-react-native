---
title: Patrones modernos de estilos en React Native
impact: MEDIUM
impactDescription: diseño consistente, bordes más suaves, layouts más limpios
tags: styling, css, layout, shadows, gradients
---

## Patrones modernos de estilos en React Native

Sigue estos patrones de estilos para un código de React Native más limpio y consistente.

**Usa siempre `borderCurve: 'continuous'` con `borderRadius`:**

```tsx
// Incorrecto
{ borderRadius: 12 }

// Correcto – esquinas más suaves al estilo de iOS
{ borderRadius: 12, borderCurve: 'continuous' }
```

**Usa `gap` en lugar de margin para el espaciado entre elementos:**

```tsx
// Incorrecto – margin en los hijos
<View>
  <Text style={{ marginBottom: 8 }}>Title</Text>
  <Text style={{ marginBottom: 8 }}>Subtitle</Text>
</View>

// Correcto – gap en el padre
<View style={{ gap: 8 }}>
  <Text>Title</Text>
  <Text>Subtitle</Text>
</View>
```

**Usa `padding` para el espacio interior y `gap` para el espacio entre elementos:**

```tsx
<View style={{ padding: 16, gap: 12 }}>
  <Text>First</Text>
  <Text>Second</Text>
</View>
```

**Usa `experimental_backgroundImage` para los degradados lineales:**

```tsx
// Incorrecto – librería de degradados de terceros
<LinearGradient colors={['#000', '#fff']} />

// Correcto – sintaxis nativa de degradados CSS
<View
  style={{
    experimental_backgroundImage: 'linear-gradient(to bottom, #000, #fff)',
  }}
/>
```

**Usa la sintaxis de string de CSS `boxShadow` para las sombras:**

```tsx
// Incorrecto – objetos de sombra legacy o elevation
{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1 }
{ elevation: 4 }

// Correcto – sintaxis CSS de box-shadow
{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }
```

**Evita múltiples tamaños de fuente – usa el peso y el color para dar énfasis:**

```tsx
// Incorrecto – tamaños de fuente variables para la jerarquía
<Text style={{ fontSize: 18 }}>Title</Text>
<Text style={{ fontSize: 14 }}>Subtitle</Text>
<Text style={{ fontSize: 12 }}>Caption</Text>

// Correcto – tamaño consistente, varía el peso y el color
<Text style={{ fontWeight: '600' }}>Title</Text>
<Text style={{ color: '#666' }}>Subtitle</Text>
<Text style={{ color: '#999' }}>Caption</Text>
```

Limitar los tamaños de fuente crea consistencia visual. En su lugar, usa `fontWeight` (bold/semibold)
y colores en escala de grises para la jerarquía.
