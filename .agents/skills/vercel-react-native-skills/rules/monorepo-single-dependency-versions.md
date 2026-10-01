---
title: Usa una única versión de cada dependencia en todo el monorepo
impact: MEDIUM
impactDescription: evita bundles duplicados y conflictos de versiones
tags: monorepo, dependencies, installation
---

## Usa una única versión de cada dependencia en todo el monorepo

Usa una única versión de cada dependencia en todos los paquetes de tu monorepo.
Prefiere versiones exactas en lugar de rangos. Múltiples versiones provocan código duplicado en
los bundles, conflictos en runtime y un comportamiento inconsistente entre paquetes.

Usa una herramienta como syncpack para hacer cumplir esto. Como último recurso, usa resolutions de yarn
u overrides de npm.

**Incorrecto (rangos de versiones, múltiples versiones):**

```json
// packages/app/package.json
{
  "dependencies": {
    "react-native-reanimated": "^3.0.0"
  }
}

// packages/ui/package.json
{
  "dependencies": {
    "react-native-reanimated": "^3.5.0"
  }
}
```

**Correcto (versiones exactas, una única fuente de verdad):**

```json
// package.json (raíz)
{
  "pnpm": {
    "overrides": {
      "react-native-reanimated": "3.16.1"
    }
  }
}

// packages/app/package.json
{
  "dependencies": {
    "react-native-reanimated": "3.16.1"
  }
}

// packages/ui/package.json
{
  "dependencies": {
    "react-native-reanimated": "3.16.1"
  }
}
```

Usa la funcionalidad de override/resolution de tu gestor de paquetes para hacer cumplir las versiones en
la raíz. Al agregar dependencias, especifica versiones exactas sin `^` ni `~`.
