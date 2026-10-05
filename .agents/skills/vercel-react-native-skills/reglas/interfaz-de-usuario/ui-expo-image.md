---
title: Usa expo-image para imágenes optimizadas
impact: HIGH
impactDescription: eficiencia de memoria, caché, placeholders con blurhash, carga progresiva
tags: images, performance, expo-image, ui
---

## Usa expo-image para imágenes optimizadas

Usa `expo-image` en lugar del `Image` de React Native. Proporciona una caché eficiente en memoria, placeholders con blurhash, carga progresiva y un mejor rendimiento para las listas.

**Incorrecto (Image de React Native):**

```tsx
import { Image } from 'react-native'

function Avatar({ url }: { url: string }) {
  return <Image source={{ uri: url }} style={styles.avatar} />
}
```

**Correcto (expo-image):**

```tsx
import { Image } from 'expo-image'

function Avatar({ url }: { url: string }) {
  return <Image source={{ uri: url }} style={styles.avatar} />
}
```

**Con placeholder de blurhash:**

```tsx
<Image
  source={{ uri: url }}
  placeholder={{ blurhash: 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.' }}
  contentFit="cover"
  transition={200}
  style={styles.image}
/>
```

**Con prioridad y caché:**

```tsx
<Image
  source={{ uri: url }}
  priority="high"
  cachePolicy="memory-disk"
  style={styles.hero}
/>
```

**Props clave:**

- `placeholder` — Blurhash o thumbnail mientras carga
- `contentFit` — `cover`, `contain`, `fill`, `scale-down`
- `transition` — Duración del fade-in (ms)
- `priority` — `low`, `normal`, `high`
- `cachePolicy` — `memory`, `disk`, `memory-disk`, `none`
- `recyclingKey` — Key única para el reciclaje en listas

Para multiplataforma (web + nativo), usa `SolitoImage` de `solito/image`, que usa `expo-image` internamente.

Referencia: [expo-image](https://docs.expo.dev/versions/latest/sdk/image/)
