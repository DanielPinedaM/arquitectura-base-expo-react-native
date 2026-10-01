---
title: Usa modales nativos en lugar de bottom sheets basados en JS
impact: HIGH
impactDescription: rendimiento, gestos y accesibilidad nativos
tags: modals, bottom-sheet, native, react-navigation
---

## Usa modales nativos en lugar de bottom sheets basados en JS

Usa el `<Modal>` nativo con `presentationStyle="formSheet"` o el form sheet nativo de React Navigation
v7 en lugar de librerías de bottom sheet basadas en JS. Los modales nativos
tienen gestos integrados, accesibilidad y un mejor rendimiento. Confía en la UI nativa
para las primitivas de bajo nivel.

**Incorrecto (bottom sheet basado en JS):**

```tsx
import BottomSheet from 'custom-js-bottom-sheet'

function MyScreen() {
  const sheetRef = useRef<BottomSheet>(null)

  return (
    <View style={{ flex: 1 }}>
      <Button onPress={() => sheetRef.current?.expand()} title='Open' />
      <BottomSheet ref={sheetRef} snapPoints={['50%', '90%']}>
        <View>
          <Text>Sheet content</Text>
        </View>
      </BottomSheet>
    </View>
  )
}
```

**Correcto (Modal nativo con formSheet):**

```tsx
import { Modal, View, Text, Button } from 'react-native'

function MyScreen() {
  const [visible, setVisible] = useState(false)

  return (
    <View style={{ flex: 1 }}>
      <Button onPress={() => setVisible(true)} title='Open' />
      <Modal
        visible={visible}
        presentationStyle='formSheet'
        animationType='slide'
        onRequestClose={() => setVisible(false)}
      >
        <View>
          <Text>Sheet content</Text>
        </View>
      </Modal>
    </View>
  )
}
```

**Correcto (form sheet nativo de React Navigation v7):**

```tsx
// En tu navigator
<Stack.Screen
  name='Details'
  component={DetailsScreen}
  options={{
    presentation: 'formSheet',
    sheetAllowedDetents: 'fitToContents',
  }}
/>
```

Los modales nativos proporcionan swipe-to-dismiss, una evitación correcta del teclado y
accesibilidad de forma predeterminada.
