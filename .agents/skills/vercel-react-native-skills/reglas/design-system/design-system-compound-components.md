---
title: Usa compound components en lugar de children polimórficos
impact: MEDIUM
impactDescription: composición flexible, API más clara
tags: design-system, components, composition
---

## Usa compound components en lugar de children polimórficos

No crees componentes que puedan aceptar un string si no son un nodo de texto. Si
un componente puede recibir un string como hijo, debe ser un componente `*Text`
dedicado. Para componentes como los botones, que pueden tener tanto un View (o
Pressable) junto con texto, usa compound components, como `Button`,
`ButtonText` y `ButtonIcon`.

**Incorrecto (children polimórficos):**

```tsx
import { Pressable, Text } from 'react-native'

type ButtonProps = {
  children: string | React.ReactNode
  icon?: React.ReactNode
}

function Button({ children, icon }: ButtonProps) {
  return (
    <Pressable>
      {icon}
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </Pressable>
  )
}

// El uso es ambiguo
<Button icon={<Icon />}>Save</Button>
<Button><CustomText>Save</CustomText></Button>
```

**Correcto (compound components):**

```tsx
import { Pressable, Text } from 'react-native'

function Button({ children }: { children: React.ReactNode }) {
  return <Pressable>{children}</Pressable>
}

function ButtonText({ children }: { children: React.ReactNode }) {
  return <Text>{children}</Text>
}

function ButtonIcon({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

// El uso es explícito y componible
<Button>
  <ButtonIcon><SaveIcon /></ButtonIcon>
  <ButtonText>Save</ButtonText>
</Button>

<Button>
  <ButtonText>Cancel</ButtonText>
</Button>
```
