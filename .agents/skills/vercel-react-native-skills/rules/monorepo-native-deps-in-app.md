---
title: Instala las dependencias nativas en el directorio de la app
impact: CRITICAL
impactDescription: necesario para que funcione el autolinking
tags: monorepo, native, autolinking, installation
---

## Instala las dependencias nativas en el directorio de la app

En un monorepo, los paquetes con código nativo deben instalarse directamente en el directorio
de la app nativa. El autolinking solo escanea el `node_modules` de la app; no
encontrará las dependencias nativas instaladas en otros paquetes.

**Incorrecto (dependencia nativa solo en el paquete compartido):**

```
packages/
  ui/
    package.json  # tiene react-native-reanimated
  app/
    package.json  # le falta react-native-reanimated
```

El autolinking falla: el código nativo no se enlaza.

**Correcto (dependencia nativa en el directorio de la app):**

```
packages/
  ui/
    package.json  # tiene react-native-reanimated
  app/
    package.json  # también tiene react-native-reanimated
```

```json
// packages/app/package.json
{
  "dependencies": {
    "react-native-reanimated": "3.16.1"
  }
}
```

Aunque el paquete compartido use la dependencia nativa, la app también debe listarla
para que el autolinking detecte y enlace el código nativo.
