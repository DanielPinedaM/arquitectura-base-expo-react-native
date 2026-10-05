---
title: Carga las fuentes de forma nativa en tiempo de build
impact: LOW
impactDescription: fuentes disponibles al iniciar, sin carga asíncrona
tags: fonts, expo, performance, config-plugin
---

## Usa el config plugin de Expo para cargar fuentes

Usa el config plugin de `expo-font` para incrustar las fuentes en tiempo de build en lugar de
`useFonts` o `Font.loadAsync`. Las fuentes incrustadas son más eficientes.

**Incorrecto (carga asíncrona de fuentes):**

```tsx
import { useFonts } from 'expo-font'
import { Text, View } from 'react-native'

function App() {
  const [fontsLoaded] = useFonts({
    'Geist-Bold': require('./assets/fonts/Geist-Bold.otf'),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View>
      <Text style={{ fontFamily: 'Geist-Bold' }}>Hello</Text>
    </View>
  )
}
```

**Correcto (config plugin, fuentes incrustadas en el build):**

```json
// app.json
{
  "expo": {
    "plugins": [
      [
        "expo-font",
        {
          "fonts": ["./assets/fonts/Geist-Bold.otf"]
        }
      ]
    ]
  }
}
```

```tsx
import { Text, View } from 'react-native'

function App() {
  // No se necesita un estado de carga: la fuente ya está disponible
  return (
    <View>
      <Text style={{ fontFamily: 'Geist-Bold' }}>Hello</Text>
    </View>
  )
}
```

Después de agregar las fuentes al config plugin, ejecuta `npx expo prebuild` y vuelve a hacer build de la
app nativa.

Referencia:
[Documentación de Expo Font](https://docs.expo.dev/versions/latest/sdk/font/)
