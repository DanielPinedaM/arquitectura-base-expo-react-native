---
title: Usa navigators nativos para la navegación
impact: HIGH
impactDescription: rendimiento nativo, UI apropiada para cada plataforma
tags: navigation, react-navigation, expo-router, native-stack, tabs
---

## Usa navigators nativos para la navegación

Usa siempre navigators nativos en lugar de los basados en JS. Los navigators nativos usan
las APIs de la plataforma (UINavigationController en iOS, Fragment en Android) para un mejor
rendimiento y un comportamiento nativo.

**Para stacks:** Usa `@react-navigation/native-stack` o el stack por defecto de expo-router
(que usa native-stack). Evita `@react-navigation/stack`.

**Para tabs:** Usa `react-native-bottom-tabs` (nativo) o los native tabs de
expo-router. Evita `@react-navigation/bottom-tabs` cuando la sensación nativa sea importante.

### Navegación con stack

**Incorrecto (stack navigator de JS):**

```tsx
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Details' component={DetailsScreen} />
    </Stack.Navigator>
  )
}
```

**Correcto (native stack con react-navigation):**

```tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Details' component={DetailsScreen} />
    </Stack.Navigator>
  )
}
```

**Correcto (expo-router usa native stack por defecto):**

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router'

export default function Layout() {
  return <Stack />
}
```

### Navegación con tabs

**Incorrecto (bottom tabs de JS):**

```tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

function App() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Settings' component={SettingsScreen} />
    </Tab.Navigator>
  )
}
```

**Correcto (native bottom tabs con react-navigation):**

```tsx
import { createNativeBottomTabNavigator } from '@bottom-tabs/react-navigation'

const Tab = createNativeBottomTabNavigator()

function App() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: () => ({ sfSymbol: 'house' }),
        }}
      />
      <Tab.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          tabBarIcon: () => ({ sfSymbol: 'gear' }),
        }}
      />
    </Tab.Navigator>
  )
}
```

**Correcto (native tabs de expo-router):**

```tsx
// app/(tabs)/_layout.tsx
import { NativeTabs } from 'expo-router/unstable-native-tabs'

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name='index'>
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf='house.fill' md='home' />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name='settings'>
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf='gear' md='settings' />
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
```

En iOS, los native tabs habilitan automáticamente `contentInsetAdjustmentBehavior` en el
primer `ScrollView` en la raíz de cada pantalla de tab, de modo que el contenido se desplaza correctamente
detrás de la tab bar translúcida. Si necesitas deshabilitar esto, usa
`disableAutomaticContentInsets` en el trigger.

### Prefiere las opciones de header nativas en lugar de componentes personalizados

**Incorrecto (componente de header personalizado):**

```tsx
<Stack.Screen
  name='Profile'
  component={ProfileScreen}
  options={{
    header: () => <CustomHeader title='Profile' />,
  }}
/>
```

**Correcto (opciones de header nativas):**

```tsx
<Stack.Screen
  name='Profile'
  component={ProfileScreen}
  options={{
    title: 'Profile',
    headerLargeTitleEnabled: true,
    headerSearchBarOptions: {
      placeholder: 'Search',
    },
  }}
/>
```

Los headers nativos soportan automáticamente los large titles de iOS, las barras de búsqueda, los efectos de desenfoque y el manejo
correcto de la safe area.

### Por qué navigators nativos

- **Rendimiento**: Las transiciones y los gestos nativos se ejecutan en el UI thread
- **Comportamiento de la plataforma**: Large titles automáticos en iOS, material design en Android
- **Integración con el sistema**: Scroll-to-top al tocar el tab, evitación de PiP, safe
  areas correctas
- **Accesibilidad**: Las funcionalidades de accesibilidad de la plataforma funcionan automáticamente

Referencia:

- [React Navigation Native Stack](https://reactnavigation.org/docs/native-stack-navigator)
- [React Native Bottom Tabs con React Navigation](https://oss.callstack.com/react-native-bottom-tabs/docs/guides/usage-with-react-navigation)
- [React Native Bottom Tabs con Expo Router](https://oss.callstack.com/react-native-bottom-tabs/docs/guides/usage-with-expo-router)
- [Expo Router Native Tabs](https://docs.expo.dev/router/advanced/native-tabs)
