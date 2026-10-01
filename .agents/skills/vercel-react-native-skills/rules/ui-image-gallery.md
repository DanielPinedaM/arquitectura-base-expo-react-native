---
title: Usa Galeria para galerías de imágenes y lightbox
impact: MEDIUM
impactDescription:
  shared element transitions nativas, pinch-to-zoom, pan-to-close
tags: images, gallery, lightbox, expo-image, ui
---

## Usa Galeria para galerías de imágenes y lightbox

Para galerías de imágenes con lightbox (tocar para pantalla completa), usa `@nandorojo/galeria`.
Proporciona shared element transitions nativas con pinch-to-zoom, zoom con doble
toque y pan-to-close. Funciona con cualquier componente de imagen, incluido `expo-image`.

**Incorrecto (implementación de modal personalizada):**

```tsx
function ImageGallery({ urls }: { urls: string[] }) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <>
      {urls.map((url) => (
        <Pressable key={url} onPress={() => setSelected(url)}>
          <Image source={{ uri: url }} style={styles.thumbnail} />
        </Pressable>
      ))}
      <Modal visible={!!selected} onRequestClose={() => setSelected(null)}>
        <Image source={{ uri: selected! }} style={styles.fullscreen} />
      </Modal>
    </>
  )
}
```

**Correcto (Galeria con expo-image):**

```tsx
import { Galeria } from '@nandorojo/galeria'
import { Image } from 'expo-image'

function ImageGallery({ urls }: { urls: string[] }) {
  return (
    <Galeria urls={urls}>
      {urls.map((url, index) => (
        <Galeria.Image index={index} key={url}>
          <Image source={{ uri: url }} style={styles.thumbnail} />
        </Galeria.Image>
      ))}
    </Galeria>
  )
}
```

**Una sola imagen:**

```tsx
import { Galeria } from '@nandorojo/galeria'
import { Image } from 'expo-image'

function Avatar({ url }: { url: string }) {
  return (
    <Galeria urls={[url]}>
      <Galeria.Image>
        <Image source={{ uri: url }} style={styles.avatar} />
      </Galeria.Image>
    </Galeria>
  )
}
```

**Con thumbnails de baja resolución y pantalla completa de alta resolución:**

```tsx
<Galeria urls={highResUrls}>
  {lowResUrls.map((url, index) => (
    <Galeria.Image index={index} key={url}>
      <Image source={{ uri: url }} style={styles.thumbnail} />
    </Galeria.Image>
  ))}
</Galeria>
```

**Con FlashList:**

```tsx
<Galeria urls={urls}>
  <FlashList
    data={urls}
    renderItem={({ item, index }) => (
      <Galeria.Image index={index}>
        <Image source={{ uri: item }} style={styles.thumbnail} />
      </Galeria.Image>
    )}
    numColumns={3}
    estimatedItemSize={100}
  />
</Galeria>
```

Funciona con `expo-image`, `SolitoImage`, el Image de `react-native` o cualquier componente
de imagen.

Referencia: [Galeria](https://github.com/nandorojo/galeria)
