# Skills de React Native

**Versión 1.0.0**  
Ingeniería  
Enero de 2026

> **Nota:**  
> Este documento está pensado principalmente para que lo sigan agentes y LLMs al mantener,  
> generar o refactorizar codebases de React Native. Los humanos  
> también pueden encontrarlo útil, pero las indicaciones aquí están optimizadas para la automatización  
> y la consistencia en flujos de trabajo asistidos por IA.

---

## Tabla de contenidos

1. [Renderizado fundamental](#1-renderizado-fundamental) — **CRITICAL**
   - 1.1 [Nunca uses && con valores potencialmente falsy](#11-nunca-uses--con-valores-potencialmente-falsy)
   - 1.2 [Envuelve los strings en componentes Text](#12-envuelve-los-strings-en-componentes-text)
2. [Rendimiento de listas](#2-rendimiento-de-listas) — **HIGH**
   - 2.1 [Evita objetos inline en renderItem](#21-evita-objetos-inline-en-renderitem)
   - 2.2 [Haz hoisting de los callbacks a la raíz de las listas](#22-haz-hoisting-de-los-callbacks-a-la-raíz-de-las-listas)
   - 2.3 [Mantén ligeros los elementos de la lista](#23-mantén-ligeros-los-elementos-de-la-lista)
   - 2.4 [Optimiza el rendimiento de las listas con referencias de objetos estables](#24-optimiza-el-rendimiento-de-las-listas-con-referencias-de-objetos-estables)
   - 2.5 [Pasa primitivos a los elementos de la lista para la memoization](#25-pasa-primitivos-a-los-elementos-de-la-lista-para-la-memoization)
   - 2.6 [Usa un virtualizador de listas para cualquier lista](#26-usa-un-virtualizador-de-listas-para-cualquier-lista)
   - 2.7 [Usa imágenes comprimidas en las listas](#27-usa-imágenes-comprimidas-en-las-listas)
   - 2.8 [Usa tipos de elementos para listas heterogéneas](#28-usa-tipos-de-elementos-para-listas-heterogéneas)
3. [Animación](#3-animación) — **HIGH**
   - 3.1 [Anima transform y opacity en lugar de propiedades de layout](#31-anima-transform-y-opacity-en-lugar-de-propiedades-de-layout)
   - 3.2 [Prefiere useDerivedValue en lugar de useAnimatedReaction](#32-prefiere-usederivedvalue-en-lugar-de-useanimatedreaction)
   - 3.3 [Usa GestureDetector para estados de press animados](#33-usa-gesturedetector-para-estados-de-press-animados)
4. [Rendimiento del scroll](#4-rendimiento-del-scroll) — **HIGH**
   - 4.1 [Nunca rastrees la posición del scroll en useState](#41-nunca-rastrees-la-posición-del-scroll-en-usestate)
5. [Navegación](#5-navegación) — **HIGH**
   - 5.1 [Usa navigators nativos para la navegación](#51-usa-navigators-nativos-para-la-navegación)
6. [Estado de React](#6-estado-de-react) — **MEDIUM**
   - 6.1 [Minimiza las variables de estado y deriva los valores](#61-minimiza-las-variables-de-estado-y-deriva-los-valores)
   - 6.2 [Usa un estado de fallback en lugar de initialState](#62-usa-un-estado-de-fallback-en-lugar-de-initialstate)
   - 6.3 [Dispatch updaters de useState para el estado que depende del valor actual](#63-dispatch-updaters-de-usestate-para-el-estado-que-depende-del-valor-actual)
7. [Arquitectura del estado](#7-arquitectura-del-estado) — **MEDIUM**
   - 7.1 [El estado debe representar el ground truth](#71-el-estado-debe-representar-el-ground-truth)
8. [React Compiler](#8-react-compiler) — **MEDIUM**
   - 8.1 [Desestructura las funciones al inicio del render (React Compiler)](#81-desestructura-las-funciones-al-inicio-del-render-react-compiler)
   - 8.2 [Usa .get() y .set() para los shared values de Reanimated (no .value)](#82-usa-get-y-set-para-los-shared-values-de-reanimated-no-value)
9. [Interfaz de usuario](#9-interfaz-de-usuario) — **MEDIUM**
   - 9.1 [Medir las dimensiones de las vistas](#91-medir-las-dimensiones-de-las-vistas)
   - 9.2 [Patrones modernos de estilos en React Native](#92-patrones-modernos-de-estilos-en-react-native)
   - 9.3 [Usa contentInset para el espaciado dinámico del ScrollView](#93-usa-contentinset-para-el-espaciado-dinámico-del-scrollview)
   - 9.4 [Usa contentInsetAdjustmentBehavior para las safe areas](#94-usa-contentinsetadjustmentbehavior-para-las-safe-areas)
   - 9.5 [Usa expo-image para imágenes optimizadas](#95-usa-expo-image-para-imágenes-optimizadas)
   - 9.6 [Usa Galeria para galerías de imágenes y lightbox](#96-usa-galeria-para-galerías-de-imágenes-y-lightbox)
   - 9.7 [Usa menús nativos para dropdowns y context menus](#97-usa-menús-nativos-para-dropdowns-y-context-menus)
   - 9.8 [Usa modales nativos en lugar de bottom sheets basados en JS](#98-usa-modales-nativos-en-lugar-de-bottom-sheets-basados-en-js)
   - 9.9 [Usa Pressable en lugar de los componentes Touchable](#99-usa-pressable-en-lugar-de-los-componentes-touchable)
10. [Design System](#10-design-system) — **MEDIUM**

- 10.1 [Usa compound components en lugar de children polimórficos](#101-usa-compound-components-en-lugar-de-children-polimórficos)

11. [Monorepo](#11-monorepo) — **LOW**

- 11.1 [Instala las dependencias nativas en el directorio de la app](#111-instala-las-dependencias-nativas-en-el-directorio-de-la-app)
- 11.2 [Usa una única versión de cada dependencia en todo el monorepo](#112-usa-una-única-versión-de-cada-dependencia-en-todo-el-monorepo)

12. [Dependencias de terceros](#12-dependencias-de-terceros) — **LOW**

- 12.1 [Importa desde la carpeta del design system](#121-importa-desde-la-carpeta-del-design-system)

13. [JavaScript](#13-javascript) — **LOW**

- 13.1 [Haz hoisting de la creación de formatters de Intl](#131-haz-hoisting-de-la-creación-de-formatters-de-intl)

14. [Fuentes](#14-fuentes) — **LOW**

- 14.1 [Carga las fuentes de forma nativa en tiempo de build](#141-carga-las-fuentes-de-forma-nativa-en-tiempo-de-build)

---

## 1. Renderizado fundamental

**Impacto: CRITICAL**

Reglas fundamentales de renderizado de React Native. Incumplirlas provoca
crashes en runtime o UI rota.

### 1.1 Nunca uses && con valores potencialmente falsy

**Impacto: CRITICAL (evita crashes en producción)**

Nunca uses `{value && <Component />}` cuando `value` pueda ser un string vacío o

`0`. Estos son falsy pero renderizables en JSX: React Native intentará renderizarlos como

texto fuera de un componente `<Text>`, lo que provoca un crash grave en producción.

**Incorrecto: crash si count es 0 o name es ""**

```tsx
function Profile({ name, count }: { name: string; count: number }) {
  return (
    <View>
      {name && <Text>{name}</Text>}
      {count && <Text>{count} items</Text>}
    </View>
  );
}
// Si name="" o count=0, renderiza el valor falsy → crash
```

**Correcto: ternario con null**

```tsx
function Profile({ name, count }: { name: string; count: number }) {
  return (
    <View>
      {name ? <Text>{name}</Text> : null}
      {count ? <Text>{count} items</Text> : null}
    </View>
  );
}
```

**Correcto: conversión explícita a booleano**

```tsx
function Profile({ name, count }: { name: string; count: number }) {
  return (
    <View>
      {!!name && <Text>{name}</Text>}
      {!!count && <Text>{count} items</Text>}
    </View>
  );
}
```

**Mejor: early return**

```tsx
function Profile({ name, count }: { name: string; count: number }) {
  if (!name) return null;

  return (
    <View>
      <Text>{name}</Text>
      {count > 0 ? <Text>{count} items</Text> : null}
    </View>
  );
}
```

Los early returns son lo más claro. Al usar condicionales inline, prefiere el ternario o

las verificaciones booleanas explícitas.

**Regla de lint:** Habilita `react/jsx-no-leaked-render` de

[eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-leaked-render.md)

para detectar esto automáticamente.

### 1.2 Envuelve los strings en componentes Text

**Impacto: CRITICAL (evita crashes en runtime)**

Los strings deben renderizarse dentro de `<Text>`. React Native hace crash si un string es un

hijo directo de `<View>`.

**Incorrecto: hace crash**

```tsx
import { View } from "react-native";

function Greeting({ name }: { name: string }) {
  return <View>Hello, {name}!</View>;
}
// Error: Text strings must be rendered within a <Text> component.
```

**Correcto:**

```tsx
import { View, Text } from "react-native";

function Greeting({ name }: { name: string }) {
  return (
    <View>
      <Text>Hello, {name}!</Text>
    </View>
  );
}
```

---

## 2. Rendimiento de listas

**Impacto: HIGH**

Optimización de listas virtualizadas (FlatList, LegendList, FlashList)
para un scroll fluido y actualizaciones rápidas.

### 2.1 Evita objetos inline en renderItem

**Impacto: HIGH (evita re-renders innecesarios de los elementos de lista memoizados)**

No crees nuevos objetos dentro de `renderItem` para pasarlos como props. Los objetos inline

crean nuevas referencias en cada render, lo que rompe la memoization. En su lugar, pasa valores

primitivos directamente desde `item`.

**Incorrecto: un objeto inline rompe la memoization**

```tsx
function UserList({ users }: { users: User[] }) {
  return (
    <LegendList
      data={users}
      renderItem={({ item }) => (
        <UserRow
          // Mal: nuevo objeto en cada render
          user={{ id: item.id, name: item.name, avatar: item.avatar }}
        />
      )}
    />
  );
}
```

**Incorrecto: objeto de estilo inline**

```tsx
renderItem={({ item }) => (
  <UserRow
    name={item.name}
    // Mal: nuevo objeto de estilo en cada render
    style={{ backgroundColor: item.isActive ? 'green' : 'gray' }}
  />
)}
```

**Correcto: pasa el item directamente o primitivos**

```tsx
function UserList({ users }: { users: User[] }) {
  return (
    <LegendList
      data={users}
      renderItem={({ item }) => (
        // Bien: pasa el item directamente
        <UserRow user={item} />
      )}
    />
  );
}
```

**Correcto: pasa primitivos, deriva dentro del hijo**

```tsx
renderItem={({ item }) => (
  <UserRow
    id={item.id}
    name={item.name}
    isActive={item.isActive}
  />
)}

const UserRow = memo(function UserRow({ id, name, isActive }: Props) {
  // Bien: deriva el estilo dentro del componente memoizado
  const backgroundColor = isActive ? 'green' : 'gray'
  return <View style={[styles.row, { backgroundColor }]}>{/* ... */}</View>
})
```

**Correcto: haz hoisting de los estilos estáticos al scope del módulo**

```tsx
const activeStyle = { backgroundColor: 'green' }
const inactiveStyle = { backgroundColor: 'gray' }

renderItem={({ item }) => (
  <UserRow
    name={item.name}
    // Bien: referencias estables
    style={item.isActive ? activeStyle : inactiveStyle}
  />
)}
```

Pasar primitivos o referencias estables permite que `memo()` omita re-renders cuando

los valores reales no han cambiado.

**Nota:** Si tienes React Compiler habilitado, este maneja la memoization

automáticamente y estas optimizaciones manuales se vuelven menos críticas.

### 2.2 Haz hoisting de los callbacks a la raíz de las listas

**Impacto: MEDIUM (Menos re-renders y listas más rápidas)**

Al pasar funciones callback a los elementos de una lista, crea una única instancia del

callback en la raíz de la lista. Luego, los elementos deben llamarlo con un identificador

único.

**Incorrecto: crea un nuevo callback en cada render**

```typescript
return (
  <LegendList
    renderItem={({ item }) => {
      // mal: crea un nuevo callback en cada render
      const onPress = () => handlePress(item.id)
      return <Item key={item.id} item={item} onPress={onPress} />
    }}
  />
)
```

**Correcto: una única instancia de la función pasada a cada elemento**

```typescript
const onPress = useCallback(() => handlePress(item.id), [handlePress, item.id])

return (
  <LegendList
    renderItem={({ item }) => (
      <Item key={item.id} item={item} onPress={onPress} />
    )}
  />
)
```

Referencia: [https://example.com](https://example.com)

### 2.3 Mantén ligeros los elementos de la lista

**Impacto: HIGH (reduce el tiempo de render de los elementos visibles durante el scroll)**

Los elementos de la lista deben ser lo menos costosos posible de renderizar. Minimiza los hooks, evita

las queries y limita el acceso a React Context. Las listas virtualizadas renderizan muchos elementos

durante el scroll: los elementos costosos provocan jank.

**Incorrecto: elemento de lista pesado**

```tsx
function ProductRow({ id }: { id: string }) {
  // Mal: query dentro del elemento de la lista
  const { data: product } = useQuery(["product", id], () => fetchProduct(id));
  // Mal: múltiples accesos a context
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const cart = useContext(CartContext);
  // Mal: cómputo costoso
  const recommendations = useMemo(
    () => computeRecommendations(product),
    [product],
  );

  return <View>{/* ... */}</View>;
}
```

**Correcto: elemento de lista ligero**

```tsx
function ProductRow({ name, price, imageUrl }: Props) {
  // Bien: recibe solo primitivos, hooks mínimos
  return (
    <View>
      <Image source={{ uri: imageUrl }} />
      <Text>{name}</Text>
      <Text>{price}</Text>
    </View>
  );
}
```

**Mueve la obtención de datos al padre:**

```tsx
// El padre obtiene todos los datos una sola vez
function ProductList() {
  const { data: products } = useQuery(["products"], fetchProducts);

  return (
    <LegendList
      data={products}
      renderItem={({ item }) => (
        <ProductRow name={item.name} price={item.price} imageUrl={item.image} />
      )}
    />
  );
}
```

**Para valores compartidos, usa selectores de Zustand en lugar de Context:**

```tsx
// Incorrecto: Context provoca re-render cuando cambia cualquier valor del carrito
function ProductRow({ id, name }: Props) {
  const { items } = useContext(CartContext);
  const inCart = items.includes(id);
  // ...
}

// Correcto: el selector de Zustand solo hace re-render cuando cambia este valor específico
function ProductRow({ id, name }: Props) {
  // usa Set.has (creado una sola vez en la raíz) en lugar de Array.includes()
  const inCart = useCartStore((s) => s.items.has(id));
  // ...
}
```

**Lineamientos para los elementos de la lista:**

- Sin queries ni obtención de datos

- Sin cómputos costosos (muévelos al padre o memoízalos a nivel del padre)

- Prefiere selectores de Zustand en lugar de React Context

- Minimiza los hooks useState/useEffect

- Pasa valores precalculados como props

El objetivo: los elementos de la lista deben ser funciones de renderizado simples que reciban props y

devuelvan JSX.

### 2.4 Optimiza el rendimiento de las listas con referencias de objetos estables

**Impacto: CRITICAL (la virtualización depende de la estabilidad de las referencias)**

No hagas map ni filter de los datos antes de pasarlos a listas virtualizadas. La virtualización

depende de la estabilidad de las referencias de los objetos para saber qué cambió: las nuevas referencias provocan

re-renders completos de todos los elementos visibles. Intenta evitar renders frecuentes a

nivel del padre de la lista.

Cuando sea necesario, usa selectores de context dentro de los elementos de la lista.

**Incorrecto: crea nuevas referencias de objetos en cada pulsación de tecla**

```tsx
function DomainSearch() {
  const { keyword, setKeyword } = useKeywordZustandState();
  const { data: tlds } = useTlds();

  // Mal: crea nuevos objetos en cada render, reasignando el padre de toda la lista en cada pulsación de tecla
  const domains = tlds.map((tld) => ({
    domain: `${keyword}.${tld.name}`,
    tld: tld.name,
    price: tld.price,
  }));

  return (
    <>
      <TextInput value={keyword} onChangeText={setKeyword} />
      <LegendList
        data={domains}
        renderItem={({ item }) => <DomainItem item={item} keyword={keyword} />}
      />
    </>
  );
}
```

**Correcto: referencias estables, transforma dentro de los elementos**

```tsx
const renderItem = ({ item }) => <DomainItem tld={item} />;

function DomainSearch() {
  const { data: tlds } = useTlds();

  return (
    <LegendList
      // bien: mientras los datos sean estables, LegendList no hará re-render de toda la lista
      data={tlds}
      renderItem={renderItem}
    />
  );
}

function DomainItem({ tld }: { tld: Tld }) {
  // bien: transforma dentro de los elementos y no pases los datos dinámicos como prop
  // bien: usa una función selector de zustand para recibir de vuelta un string estable
  const domain = useKeywordZustandState((s) => s.keyword + "." + tld.name);
  return <Text>{domain}</Text>;
}
```

**Actualizar la referencia del array padre:**

```tsx
// bien: crea una nueva instancia del array sin mutar los objetos internos
// bien: la referencia del array padre no se ve afectada al escribir y actualizar "keyword"
const sortedTlds = tlds.toSorted((a, b) => a.name.localeCompare(b.name));

return <LegendList data={sortedTlds} renderItem={renderItem} />;
```

Crear una nueva instancia del array puede estar bien, siempre que las referencias de sus objetos

internos sean estables. Por ejemplo, si ordenas una lista de objetos:

Aunque esto crea una nueva instancia del array `sortedTlds`, las referencias de los objetos

internos son estables.

**Con zustand para datos dinámicos: evita re-renders del padre**

```tsx
function DomainItemFavoriteButton({ tld }: { tld: Tld }) {
  const isFavorited = useFavoritesStore((s) => s.favorites.has(tld.id));
  return <TldFavoriteButton isFavorited={isFavorited} />;
}
```

Ahora la virtualización puede omitir los elementos que no han cambiado al escribir. Solo los elementos

visibles (~20) hacen re-render en cada pulsación de tecla, en lugar del padre.

\*\*Derivar el estado dentro de los elementos de la lista a partir de los datos del padre (evita re-renders

del padre):\*\*

Para los componentes donde los datos son condicionales según el estado del padre, este

patrón es aún más importante. Por ejemplo, si estás verificando si un elemento está

marcado como favorito, alternar los favoritos solo hace re-render de un componente si el propio elemento

se encarga de acceder al estado en lugar del padre:

Nota: si estás usando React Compiler, puedes leer los valores de React Context

directamente dentro de los elementos de la lista. Aunque esto es ligeramente más lento que usar un

selector de Zustand en la mayoría de los casos, el efecto puede ser insignificante.

### 2.5 Pasa primitivos a los elementos de la lista para la memoization

**Impacto: HIGH (permite una comparación efectiva con memo())**

Cuando sea posible, pasa solo valores primitivos (strings, numbers, booleans) como props

a los componentes de los elementos de la lista. Los primitivos permiten que la comparación superficial en `memo()`

funcione correctamente, omitiendo re-renders cuando los valores no han cambiado.

**Incorrecto: una prop de tipo objeto requiere una comparación profunda**

```tsx
type User = { id: string; name: string; email: string; avatar: string }

const UserRow = memo(function UserRow({ user }: { user: User }) {
  // memo() compara user por referencia, no por valor
  // Si el padre crea un nuevo objeto user, esto hace re-render aunque los datos sean iguales
  return <Text>{user.name}</Text>
})

renderItem={({ item }) => <UserRow user={item} />}
```

Esto aún puede optimizarse, pero es más difícil de memoizar correctamente.

**Correcto: las props primitivas permiten una comparación superficial**

```tsx
const UserRow = memo(function UserRow({
  id,
  name,
  email,
}: {
  id: string
  name: string
  email: string
}) {
  // memo() compara cada primitivo directamente
  // Hace re-render solo si id, name o email realmente cambiaron
  return <Text>{name}</Text>
})

renderItem={({ item }) => (
  <UserRow id={item.id} name={item.name} email={item.email} />
)}
```

**Pasa solo lo que necesitas:**

```tsx
// Incorrecto: pasar el item completo cuando solo necesitas name
<UserRow user={item} />

// Correcto: pasa solo los campos que usa el componente
<UserRow name={item.name} avatarUrl={item.avatar} />
```

**Para los callbacks, haz hoisting o usa el ID del item:**

```tsx
// Incorrecto: una función inline crea una nueva referencia
<UserRow name={item.name} onPress={() => handlePress(item.id)} />

// Correcto: pasa el ID, manéjalo en el hijo
<UserRow id={item.id} name={item.name} />

const UserRow = memo(function UserRow({ id, name }: Props) {
  const handlePress = useCallback(() => {
    // usa id aquí
  }, [id])
  return <Pressable onPress={handlePress}><Text>{name}</Text></Pressable>
})
```

Las props primitivas hacen que la memoization sea predecible y efectiva.

**Nota:** Si tienes React Compiler habilitado, no necesitas usar

`memo()` ni `useCallback()`, pero lo relativo a las referencias de objetos sigue aplicando.

### 2.6 Usa un virtualizador de listas para cualquier lista

**Impacto: HIGH (menos memoria, montajes más rápidos)**

Usa un virtualizador de listas como LegendList o FlashList en lugar de ScrollView con

children mapeados, incluso para listas cortas. Los virtualizadores solo renderizan los elementos visibles,

lo que reduce el uso de memoria y el tiempo de montaje. ScrollView renderiza todos los children de entrada,

lo que se vuelve costoso rápidamente.

**Incorrecto: ScrollView renderiza todos los elementos a la vez**

```tsx
function Feed({ items }: { items: Item[] }) {
  return (
    <ScrollView>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </ScrollView>
  );
}
// 50 elementos = 50 componentes montados, aunque solo 10 sean visibles
```

**Correcto: el virtualizador renderiza solo los elementos visibles**

```tsx
import { LegendList } from "@legendapp/list";

function Feed({ items }: { items: Item[] }) {
  return (
    <LegendList
      data={items}
      // si no estás usando React Compiler, envuelve estos con useCallback
      renderItem={({ item }) => <ItemCard item={item} />}
      keyExtractor={(item) => item.id}
      estimatedItemSize={80}
    />
  );
}
// Solo ~10-15 elementos visibles montados a la vez
```

**Alternativa: FlashList**

```tsx
import { FlashList } from "@shopify/flash-list";

function Feed({ items }: { items: Item[] }) {
  return (
    <FlashList
      data={items}
      // si no estás usando React Compiler, envuelve estos con useCallback
      renderItem={({ item }) => <ItemCard item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
}
```

Los beneficios aplican a cualquier pantalla con contenido desplazable: perfiles, configuración, feeds,

resultados de búsqueda. Usa la virtualización por defecto.

### 2.7 Usa imágenes comprimidas en las listas

**Impacto: HIGH (tiempos de carga más rápidos, menos memoria)**

Carga siempre imágenes comprimidas y de tamaño apropiado en las listas. Las imágenes en resolución

completa consumen memoria excesiva y provocan jank en el scroll. Solicita thumbnails a

tu servidor o usa un CDN de imágenes con parámetros de redimensionamiento.

**Incorrecto: imágenes en resolución completa**

```tsx
function ProductItem({ product }: { product: Product }) {
  return (
    <View>
      {/* Imagen de 4000x3000 cargada para un thumbnail de 100x100 */}
      <Image
        source={{ uri: product.imageUrl }}
        style={{ width: 100, height: 100 }}
      />
      <Text>{product.name}</Text>
    </View>
  );
}
```

**Correcto: solicita una imagen de tamaño apropiado**

```tsx
function ProductItem({ product }: { product: Product }) {
  // Solicita una imagen de 200x200 (2x para retina)
  const thumbnailUrl = `${product.imageUrl}?w=200&h=200&fit=cover`;

  return (
    <View>
      <Image
        source={{ uri: thumbnailUrl }}
        style={{ width: 100, height: 100 }}
        contentFit="cover"
      />
      <Text>{product.name}</Text>
    </View>
  );
}
```

Usa un componente de imagen optimizado con soporte integrado de caché y placeholders,

como `expo-image` o `SolitoImage` (que usa `expo-image` internamente).

Solicita las imágenes al doble (2x) del tamaño de visualización para las pantallas retina.

### 2.8 Usa tipos de elementos para listas heterogéneas

**Impacto: HIGH (reciclaje eficiente, menos layout thrashing)**

Cuando una lista tiene diferentes layouts de elementos (mensajes, imágenes, encabezados, etc.), usa un

campo `type` en cada elemento y proporciona `getItemType` a la lista. Esto coloca los elementos

en pools de reciclaje separados, de modo que un componente de mensaje nunca se recicle como un

componente de imagen.

[LegendList getItemType](https://legendapp.com/open-source/list/api/props/#getitemtype-v2)

**Incorrecto: un solo componente con condicionales**

```tsx
type Item = {
  id: string;
  text?: string;
  imageUrl?: string;
  isHeader?: boolean;
};

function ListItem({ item }: { item: Item }) {
  if (item.isHeader) {
    return <HeaderItem title={item.text} />;
  }
  if (item.imageUrl) {
    return <ImageItem url={item.imageUrl} />;
  }
  return <MessageItem text={item.text} />;
}

function Feed({ items }: { items: Item[] }) {
  return (
    <LegendList
      data={items}
      renderItem={({ item }) => <ListItem item={item} />}
      recycleItems
    />
  );
}
```

**Correcto: elementos tipados con componentes separados**

```tsx
type HeaderItem = { id: string; type: "header"; title: string };
type MessageItem = { id: string; type: "message"; text: string };
type ImageItem = { id: string; type: "image"; url: string };
type FeedItem = HeaderItem | MessageItem | ImageItem;

function Feed({ items }: { items: FeedItem[] }) {
  return (
    <LegendList
      data={items}
      keyExtractor={(item) => item.id}
      getItemType={(item) => item.type}
      renderItem={({ item }) => {
        switch (item.type) {
          case "header":
            return <SectionHeader title={item.title} />;
          case "message":
            return <MessageRow text={item.text} />;
          case "image":
            return <ImageRow url={item.url} />;
        }
      }}
      recycleItems
    />
  );
}
```

**Por qué es importante:**

```tsx
<LegendList
  data={items}
  keyExtractor={(item) => item.id}
  getItemType={(item) => item.type}
  getEstimatedItemSize={(index, item, itemType) => {
    switch (itemType) {
      case "header":
        return 48;
      case "message":
        return 72;
      case "image":
        return 300;
      default:
        return 72;
    }
  }}
  renderItem={({ item }) => {
    /* ... */
  }}
  recycleItems
/>
```

- **Eficiencia del reciclaje**: Los elementos con el mismo tipo comparten un pool de reciclaje

- **Sin layout thrashing**: Un encabezado nunca se recicla como una celda de imagen

- **Type safety**: TypeScript puede acotar el tipo del elemento en cada rama

- **Mejor estimación del tamaño**: Usa `getEstimatedItemSize` con `itemType` para

  estimaciones precisas por tipo

---

## 3. Animación

**Impacto: HIGH**

Animaciones aceleradas por GPU, patrones de Reanimated y cómo evitar el
render thrashing durante los gestos.

### 3.1 Anima transform y opacity en lugar de propiedades de layout

**Impacto: HIGH (animaciones aceleradas por GPU, sin recálculo de layout)**

Evita animar `width`, `height`, `top`, `left`, `margin` o `padding`. Estas disparan el recálculo del layout en cada frame. En su lugar, usa `transform` (scale, translate) y `opacity`, que se ejecutan en la GPU sin disparar el layout.

**Incorrecto: anima height, dispara el layout en cada frame**

```tsx
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

function CollapsiblePanel({ expanded }: { expanded: boolean }) {
  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(expanded ? 200 : 0), // dispara el layout en cada frame
    overflow: "hidden",
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
```

**Correcto: anima scaleY, acelerado por GPU**

```tsx
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

function CollapsiblePanel({ expanded }: { expanded: boolean }) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: withTiming(expanded ? 1 : 0) }],
    opacity: withTiming(expanded ? 1 : 0),
  }));

  return (
    <Animated.View
      style={[{ height: 200, transformOrigin: "top" }, animatedStyle]}
    >
      {children}
    </Animated.View>
  );
}
```

**Correcto: anima translateY para animaciones de deslizamiento**

```tsx
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

function SlideIn({ visible }: { visible: boolean }) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withTiming(visible ? 0 : 100) }],
    opacity: withTiming(visible ? 1 : 0),
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
```

Propiedades aceleradas por GPU: `transform` (translate, scale, rotate), `opacity`. Todo lo demás dispara el layout.

### 3.2 Prefiere useDerivedValue en lugar de useAnimatedReaction

**Impacto: MEDIUM (código más limpio, rastreo automático de dependencias)**

Al derivar un shared value a partir de otro, usa `useDerivedValue` en lugar de

`useAnimatedReaction`. Los derived values son declarativos, rastrean automáticamente

las dependencias y devuelven un valor que puedes usar directamente. Las animated reactions son

para efectos secundarios, no para derivaciones.

[Reanimated useDerivedValue](https://docs.swmansion.com/react-native-reanimated/docs/core/useDerivedValue)

**Incorrecto: useAnimatedReaction para derivación**

```tsx
import { useSharedValue, useAnimatedReaction } from "react-native-reanimated";

function MyComponent() {
  const progress = useSharedValue(0);
  const opacity = useSharedValue(1);

  useAnimatedReaction(
    () => progress.value,
    (current) => {
      opacity.value = 1 - current;
    },
  );

  // ...
}
```

**Correcto: useDerivedValue**

```tsx
import { useSharedValue, useDerivedValue } from "react-native-reanimated";

function MyComponent() {
  const progress = useSharedValue(0);

  const opacity = useDerivedValue(() => 1 - progress.get());

  // ...
}
```

Usa `useAnimatedReaction` solo para efectos secundarios que no producen un valor

(p. ej., disparar haptics, logging, llamar a `runOnJS`).

### 3.3 Usa GestureDetector para estados de press animados

**Impacto: MEDIUM (animaciones en el UI thread, feedback de press más fluido)**

Para estados de press animados (scale, opacity al presionar), usa `GestureDetector` con

`Gesture.Tap()` y shared values en lugar de

`onPressIn`/`onPressOut` de Pressable. Los callbacks de gestos se ejecutan en el UI thread como worklets; no hay

ida y vuelta al JS thread para las animaciones de press.

[Gesture Handler Tap Gesture](https://docs.swmansion.com/react-native-gesture-handler/docs/gestures/tap-gesture)

**Incorrecto: Pressable con callbacks en el JS thread**

```tsx
import { Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

function AnimatedButton({ onPress }: { onPress: () => void }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => (scale.value = withTiming(0.95))}
      onPressOut={() => (scale.value = withTiming(1))}
    >
      <Animated.View style={animatedStyle}>
        <Text>Press me</Text>
      </Animated.View>
    </Pressable>
  );
}
```

**Correcto: GestureDetector con worklets en el UI thread**

```tsx
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  runOnJS,
} from "react-native-reanimated";

function AnimatedButton({ onPress }: { onPress: () => void }) {
  // Almacena el ESTADO del press (0 = no presionado, 1 = presionado)
  const pressed = useSharedValue(0);

  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.set(withTiming(1));
    })
    .onFinalize(() => {
      pressed.set(withTiming(0));
    })
    .onEnd(() => {
      runOnJS(onPress)();
    });

  // Deriva los valores visuales a partir del estado
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(withTiming(pressed.get()), [0, 1], [1, 0.95]) },
    ],
  }));

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={animatedStyle}>
        <Text>Press me</Text>
      </Animated.View>
    </GestureDetector>
  );
}
```

Almacena el **estado** del press (0 o 1) y luego deriva el scale mediante `interpolate`.

Esto mantiene el shared value como ground truth. Usa `runOnJS` para llamar funciones JS

desde worklets. Usa `.set()` y `.get()` para la compatibilidad con React Compiler.

---

## 4. Rendimiento del scroll

**Impacto: HIGH**

Rastrear la posición del scroll sin provocar render thrashing.

### 4.1 Nunca rastrees la posición del scroll en useState

**Impacto: HIGH (evita el render thrashing durante el scroll)**

Nunca almacenes la posición del scroll en `useState`. Los eventos de scroll se disparan rápidamente: las actualizaciones

de estado provocan render thrashing y frames perdidos. Usa un shared value de Reanimated

para las animaciones o una ref para un rastreo no reactivo.

**Incorrecto: useState provoca jank**

```tsx
import { useState } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

function Feed() {
  const [scrollY, setScrollY] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollY(e.nativeEvent.contentOffset.y); // hace re-render en cada frame
  };

  return <ScrollView onScroll={onScroll} scrollEventThrottle={16} />;
}
```

**Correcto: Reanimated para animaciones**

```tsx
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

function Feed() {
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y; // se ejecuta en el UI thread, sin re-render
    },
  });

  return (
    <Animated.ScrollView
      onScroll={onScroll}
      // un número más alto tiene mejor rendimiento, pero se dispara con menos frecuencia.
      // quita esto si necesitas mayor precisión por encima del rendimiento.
      scrollEventThrottle={16}
    />
  );
}
```

**Correcto: ref para un rastreo no reactivo**

```tsx
import { useRef } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

function Feed() {
  const scrollY = useRef(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.current = e.nativeEvent.contentOffset.y; // sin re-render
  };

  return <ScrollView onScroll={onScroll} scrollEventThrottle={16} />;
}
```

---

## 5. Navegación

**Impacto: HIGH**

Uso de navigators nativos para la navegación con stack y tabs en lugar de
alternativas basadas en JS.

### 5.1 Usa navigators nativos para la navegación

**Impacto: HIGH (rendimiento nativo, UI apropiada para cada plataforma)**

Usa siempre navigators nativos en lugar de los basados en JS. Los navigators nativos usan

las APIs de la plataforma (UINavigationController en iOS, Fragment en Android) para un mejor

rendimiento y un comportamiento nativo.

**Para stacks:** Usa `@react-navigation/native-stack` o el stack por defecto de expo-router

(que usa native-stack). Evita `@react-navigation/stack`.

**Para tabs:** Usa `react-native-bottom-tabs` (nativo) o los native tabs de

expo-router. Evita `@react-navigation/bottom-tabs` cuando la sensación nativa sea importante.

- [React Navigation Native Stack](https://reactnavigation.org/docs/native-stack-navigator)

- [React Native Bottom Tabs con React Navigation](https://oss.callstack.com/react-native-bottom-tabs/docs/guides/usage-with-react-navigation)

- [React Native Bottom Tabs con Expo Router](https://oss.callstack.com/react-native-bottom-tabs/docs/guides/usage-with-expo-router)

- [Expo Router Native Tabs](https://docs.expo.dev/router/advanced/native-tabs)

**Incorrecto: stack navigator de JS**

```tsx
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
```

**Correcto: native stack con react-navigation**

```tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
```

**Correcto: expo-router usa native stack por defecto**

```tsx
// app/_layout.tsx
import { Stack } from "expo-router";

export default function Layout() {
  return <Stack />;
}
```

**Incorrecto: bottom tabs de JS**

```tsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

function App() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
```

**Correcto: native bottom tabs con react-navigation**

```tsx
import { createNativeBottomTabNavigator } from "@bottom-tabs/react-navigation";

const Tab = createNativeBottomTabNavigator();

function App() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => ({ sfSymbol: "house" }),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: () => ({ sfSymbol: "gear" }),
        }}
      />
    </Tab.Navigator>
  );
}
```

**Correcto: native tabs de expo-router**

```tsx
// app/(tabs)/_layout.tsx
import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="gear" md="settings" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
```

En iOS, los native tabs habilitan automáticamente `contentInsetAdjustmentBehavior` en el

primer `ScrollView` en la raíz de cada pantalla de tab, de modo que el contenido se desplaza correctamente

detrás de la tab bar translúcida. Si necesitas deshabilitar esto, usa

`disableAutomaticContentInsets` en el trigger.

**Incorrecto: componente de header personalizado**

```tsx
<Stack.Screen
  name="Profile"
  component={ProfileScreen}
  options={{
    header: () => <CustomHeader title="Profile" />,
  }}
/>
```

**Correcto: opciones de header nativas**

```tsx
<Stack.Screen
  name="Profile"
  component={ProfileScreen}
  options={{
    title: "Profile",
    headerLargeTitleEnabled: true,
    headerSearchBarOptions: {
      placeholder: "Search",
    },
  }}
/>
```

Los headers nativos soportan automáticamente los large titles de iOS, las barras de búsqueda, los efectos de desenfoque y el manejo

correcto de la safe area.

- **Rendimiento**: Las transiciones y los gestos nativos se ejecutan en el UI thread

- **Comportamiento de la plataforma**: Large titles automáticos en iOS, material design en Android

- **Integración con el sistema**: Scroll-to-top al tocar el tab, evitación de PiP, safe

  areas correctas

- **Accesibilidad**: Las funcionalidades de accesibilidad de la plataforma funcionan automáticamente

---

## 6. Estado de React

**Impacto: MEDIUM**

Patrones para gestionar el estado de React y evitar stale closures y
re-renders innecesarios.

### 6.1 Minimiza las variables de estado y deriva los valores

**Impacto: MEDIUM (menos re-renders, menos desincronización del estado)**

Usa la menor cantidad posible de variables de estado. Si un valor puede calcularse a partir del estado o de las props existentes, derívalo durante el render en lugar de almacenarlo en el estado. El estado redundante provoca re-renders innecesarios y puede desincronizarse.

**Incorrecto: estado redundante**

```tsx
function Cart({ items }: { items: Item[] }) {
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    setTotal(items.reduce((sum, item) => sum + item.price, 0));
    setItemCount(items.length);
  }, [items]);

  return (
    <View>
      <Text>{itemCount} items</Text>
      <Text>Total: ${total}</Text>
    </View>
  );
}
```

**Correcto: valores derivados**

```tsx
function Cart({ items }: { items: Item[] }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const itemCount = items.length;

  return (
    <View>
      <Text>{itemCount} items</Text>
      <Text>Total: ${total}</Text>
    </View>
  );
}
```

**Otro ejemplo:**

```tsx
// Incorrecto: almacenar firstName, lastName Y fullName
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [fullName, setFullName] = useState("");

// Correcto: deriva fullName
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const fullName = `${firstName} ${lastName}`;
```

El estado debe ser la fuente de verdad mínima. Todo lo demás se deriva.

Referencia: [https://react.dev/learn/choosing-the-state-structure](https://react.dev/learn/choosing-the-state-structure)

### 6.2 Usa un estado de fallback en lugar de initialState

**Impacto: MEDIUM (fallbacks reactivos sin sincronización)**

Usa `undefined` como estado inicial y nullish coalescing (`??`) para recurrir a los

valores del padre o del servidor. El estado representa solo la intención del usuario: `undefined` significa

"el usuario aún no ha elegido". Esto permite fallbacks reactivos que se actualizan cuando la

fuente cambia, no solo en el render inicial.

**Incorrecto: sincroniza el estado, pierde la reactividad**

```tsx
type Props = { fallbackEnabled: boolean };

function Toggle({ fallbackEnabled }: Props) {
  const [enabled, setEnabled] = useState(defaultEnabled);
  // Si fallbackEnabled cambia, el estado queda desactualizado
  // El estado mezcla la intención del usuario con el valor por defecto

  return <Switch value={enabled} onValueChange={setEnabled} />;
}
```

**Correcto: el estado es la intención del usuario, fallback reactivo**

```tsx
type Props = { fallbackEnabled: boolean };

function Toggle({ fallbackEnabled }: Props) {
  const [_enabled, setEnabled] = useState<boolean | undefined>(undefined);
  const enabled = _enabled ?? defaultEnabled;
  // undefined = el usuario no lo ha tocado, recurre a la prop
  // Si defaultEnabled cambia, el componente lo refleja
  // Una vez que el usuario interactúa, su elección persiste

  return <Switch value={enabled} onValueChange={setEnabled} />;
}
```

**Con datos del servidor:**

```tsx
function ProfileForm({ data }: { data: User }) {
  const [_theme, setTheme] = useState<string | undefined>(undefined);
  const theme = _theme ?? data.theme;
  // Muestra el valor del servidor hasta que el usuario lo sobrescribe
  // Un refetch del servidor actualiza el fallback automáticamente

  return <ThemePicker value={theme} onChange={setTheme} />;
}
```

### 6.3 Dispatch updaters de useState para el estado que depende del valor actual

**Impacto: MEDIUM (evita stale closures, evita re-renders innecesarios)**

Cuando el siguiente estado depende del estado actual, usa un dispatch updater

(`setState(prev => ...)`) en lugar de leer la variable de estado directamente en un

callback. Esto evita stale closures y asegura que estés comparando contra el

valor más reciente.

**Incorrecto: lee el estado directamente**

```tsx
const [size, setSize] = useState<Size | undefined>(undefined);

const onLayout = (e: LayoutChangeEvent) => {
  const { width, height } = e.nativeEvent.layout;
  // size puede estar desactualizado en este closure
  if (size?.width !== width || size?.height !== height) {
    setSize({ width, height });
  }
};
```

**Correcto: dispatch updater**

```tsx
const [size, setSize] = useState<Size | undefined>(undefined);

const onLayout = (e: LayoutChangeEvent) => {
  const { width, height } = e.nativeEvent.layout;
  setSize((prev) => {
    if (prev?.width === width && prev?.height === height) return prev;
    return { width, height };
  });
};
```

Devolver el valor anterior desde el updater omite el re-render.

Para los estados primitivos, no necesitas comparar los valores antes de disparar un

re-render.

**Incorrecto: comparación innecesaria para un estado primitivo**

```tsx
const [size, setSize] = useState<Size | undefined>(undefined);

const onLayout = (e: LayoutChangeEvent) => {
  const { width, height } = e.nativeEvent.layout;
  setSize((prev) => (prev === width ? prev : width));
};
```

**Correcto: establece el estado primitivo directamente**

```tsx
const [size, setSize] = useState<Size | undefined>(undefined);

const onLayout = (e: LayoutChangeEvent) => {
  const { width, height } = e.nativeEvent.layout;
  setSize(width);
};
```

Sin embargo, si el siguiente estado depende del estado actual, aun así debes usar un

dispatch updater.

**Incorrecto: lee el estado directamente desde el callback**

```tsx
const [count, setCount] = useState(0);

const onTap = () => {
  setCount(count + 1);
};
```

**Correcto: dispatch updater**

```tsx
const [count, setCount] = useState(0);

const onTap = () => {
  setCount((prev) => prev + 1);
};
```

---

## 7. Arquitectura del estado

**Impacto: MEDIUM**

Principios de ground truth para las variables de estado y los valores derivados.

### 7.1 El estado debe representar el ground truth

**Impacto: HIGH (lógica más limpia, depuración más sencilla, una única fuente de verdad)**

Las variables de estado, tanto `useState` de React como los shared values de Reanimated, deben

representar el estado real de algo (p. ej., `pressed`, `progress`, `isOpen`),

no valores visuales derivados (p. ej., `scale`, `opacity`, `translateY`). Deriva

los valores visuales a partir del estado mediante cómputo o interpolación.

**Incorrecto: almacenar la salida visual**

```tsx
const scale = useSharedValue(1);

const tap = Gesture.Tap()
  .onBegin(() => {
    scale.set(withTiming(0.95));
  })
  .onFinalize(() => {
    scale.set(withTiming(1));
  });

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.get() }],
}));
```

**Correcto: almacenar el estado, derivar lo visual**

```tsx
const pressed = useSharedValue(0); // 0 = no presionado, 1 = presionado

const tap = Gesture.Tap()
  .onBegin(() => {
    pressed.set(withTiming(1));
  })
  .onFinalize(() => {
    pressed.set(withTiming(0));
  });

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: interpolate(pressed.get(), [0, 1], [1, 0.95]) }],
}));
```

**Por qué es importante:**

Las variables de estado deben representar el "estado" real, no necesariamente un resultado

final deseado.

1. **Una única fuente de verdad** — El estado (`pressed`) describe lo que está

   ocurriendo; lo visual se deriva

2. **Más fácil de extender** — Agregar opacity, rotación u otros efectos solo

   requiere más interpolaciones a partir del mismo estado

3. **Depuración** — Inspeccionar `pressed = 1` es más claro que `scale = 0.95`

4. **Lógica reutilizable** — El mismo valor `pressed` puede controlar múltiples propiedades

   visuales

**El mismo principio para el estado de React:**

```tsx
// Incorrecto: almacenar valores derivados
const [isExpanded, setIsExpanded] = useState(false);
const [height, setHeight] = useState(0);

useEffect(() => {
  setHeight(isExpanded ? 200 : 0);
}, [isExpanded]);

// Correcto: deriva a partir del estado
const [isExpanded, setIsExpanded] = useState(false);
const height = isExpanded ? 200 : 0;
```

El estado es la verdad mínima. Todo lo demás se deriva.

---

## 8. React Compiler

**Impacto: MEDIUM**

Patrones de compatibilidad de React Compiler con React Native y
Reanimated.

### 8.1 Desestructura las funciones al inicio del render (React Compiler)

**Impacto: HIGH (referencias estables, menos re-renders)**

Esta regla solo aplica si estás usando React Compiler.

Desestructura las funciones de los hooks al inicio del scope del render. Nunca accedas con punto a

objetos para llamar funciones. Las funciones desestructuradas son referencias estables; acceder con punto

crea nuevas referencias y rompe la memoization.

**Incorrecto: acceder con punto al objeto**

```tsx
import { useRouter } from "expo-router";

function SaveButton(props) {
  const router = useRouter();

  // mal: react-compiler usará como clave de la caché "props" y "router", que son objetos que cambian en cada render
  const handlePress = () => {
    props.onSave();
    router.push("/success"); // referencia inestable
  };

  return <Button onPress={handlePress}>Save</Button>;
}
```

**Correcto: desestructura al inicio**

```tsx
import { useRouter } from "expo-router";

function SaveButton({ onSave }) {
  const { push } = useRouter();

  // bien: react-compiler usará como clave push y onSave
  const handlePress = () => {
    onSave();
    push("/success"); // referencia estable
  };

  return <Button onPress={handlePress}>Save</Button>;
}
```

### 8.2 Usa .get() y .set() para los shared values de Reanimated (no .value)

**Impacto: LOW (necesario para la compatibilidad con React Compiler)**

Con React Compiler habilitado, usa `.get()` y `.set()` en lugar de leer o

escribir `.value` directamente en los shared values de Reanimated. El compiler no puede rastrear

el acceso a propiedades; los métodos explícitos aseguran un comportamiento correcto.

**Incorrecto: falla con React Compiler**

```tsx
import { useSharedValue } from "react-native-reanimated";

function Counter() {
  const count = useSharedValue(0);

  const increment = () => {
    count.value = count.value + 1; // queda excluido de react compiler
  };

  return <Button onPress={increment} title={`Count: ${count.value}`} />;
}
```

**Correcto: compatible con React Compiler**

```tsx
import { useSharedValue } from "react-native-reanimated";

function Counter() {
  const count = useSharedValue(0);

  const increment = () => {
    count.set(count.get() + 1);
  };

  return <Button onPress={increment} title={`Count: ${count.get()}`} />;
}
```

Consulta la

[documentación de Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/core/useSharedValue/#react-compiler-support)

para más información.

---

## 9. Interfaz de usuario

**Impacto: MEDIUM**

Patrones de UI nativos para imágenes, menús, modales, estilos e
interfaces consistentes con la plataforma.

### 9.1 Medir las dimensiones de las vistas

**Impacto: MEDIUM (medición síncrona, evita re-renders innecesarios)**

Usa tanto `useLayoutEffect` (síncrono) como `onLayout` (para las actualizaciones). La medición

síncrona te da el tamaño inicial de inmediato; `onLayout` lo mantiene actualizado

cuando la vista cambia. Para los estados no primitivos, usa un dispatch updater para

comparar los valores y evitar re-renders innecesarios.

**Solo la altura:**

```tsx
import { useLayoutEffect, useRef, useState } from "react";
import { View, LayoutChangeEvent } from "react-native";

function MeasuredBox({ children }: { children: React.ReactNode }) {
  const ref = useRef<View>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    // Medición síncrona al montar (RN 0.82+)
    const rect = ref.current?.getBoundingClientRect();
    if (rect) setHeight(rect.height);
    // Antes de 0.82: ref.current?.measure((x, y, w, h) => setHeight(h))
  }, []);

  const onLayout = (e: LayoutChangeEvent) => {
    setHeight(e.nativeEvent.layout.height);
  };

  return (
    <View ref={ref} onLayout={onLayout}>
      {children}
    </View>
  );
}
```

**Ambas dimensiones:**

```tsx
import { useLayoutEffect, useRef, useState } from "react";
import { View, LayoutChangeEvent } from "react-native";

type Size = { width: number; height: number };

function MeasuredBox({ children }: { children: React.ReactNode }) {
  const ref = useRef<View>(null);
  const [size, setSize] = useState<Size | undefined>(undefined);

  useLayoutEffect(() => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) setSize({ width: rect.width, height: rect.height });
  }, []);

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize((prev) => {
      // para estados no primitivos, compara los valores antes de disparar un re-render
      if (prev?.width === width && prev?.height === height) return prev;
      return { width, height };
    });
  };

  return (
    <View ref={ref} onLayout={onLayout}>
      {children}
    </View>
  );
}
```

Usa el setState funcional para comparar; no leas el estado directamente en el callback.

### 9.2 Patrones modernos de estilos en React Native

**Impacto: MEDIUM (diseño consistente, bordes más suaves, layouts más limpios)**

Sigue estos patrones de estilos para un código de React Native más limpio y consistente.

**Usa siempre `borderCurve: 'continuous'` con `borderRadius`:**

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

### 9.3 Usa contentInset para el espaciado dinámico del ScrollView

**Impacto: LOW (actualizaciones más fluidas, sin recálculo de layout)**

Al agregar espacio en la parte superior o inferior de un ScrollView que puede cambiar

(teclado, toolbars, contenido dinámico), usa `contentInset` en lugar de padding.

Cambiar `contentInset` no dispara el recálculo del layout: ajusta el

área de scroll sin volver a renderizar el contenido.

**Incorrecto: el padding provoca recálculo de layout**

```tsx
function Feed({ bottomOffset }: { bottomOffset: number }) {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: bottomOffset }}>
      {children}
    </ScrollView>
  );
}
// Cambiar bottomOffset dispara un recálculo completo del layout
```

**Correcto: contentInset para el espaciado dinámico**

```tsx
function Feed({ bottomOffset }: { bottomOffset: number }) {
  return (
    <ScrollView
      contentInset={{ bottom: bottomOffset }}
      scrollIndicatorInsets={{ bottom: bottomOffset }}
    >
      {children}
    </ScrollView>
  );
}
// Cambiar bottomOffset solo ajusta los límites del scroll
```

Usa `scrollIndicatorInsets` junto con `contentInset` para mantener alineado el indicador de

scroll. Para un espaciado estático que nunca cambia, el padding está bien.

### 9.4 Usa contentInsetAdjustmentBehavior para las safe areas

**Impacto: MEDIUM (manejo nativo de la safe area, sin layout shifts)**

Usa `contentInsetAdjustmentBehavior="automatic"` en el ScrollView raíz en lugar de envolver el contenido en SafeAreaView o usar padding manual. Esto permite que iOS maneje los insets de la safe area de forma nativa con un comportamiento de scroll correcto.

**Incorrecto: wrapper SafeAreaView**

```tsx
import { SafeAreaView, ScrollView, View, Text } from "react-native";

function MyScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <Text>Content</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
```

**Incorrecto: padding manual de safe area**

```tsx
import { ScrollView, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function MyScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView contentContainerStyle={{ paddingTop: insets.top }}>
      <View>
        <Text>Content</Text>
      </View>
    </ScrollView>
  );
}
```

**Correcto: ajuste nativo del content inset**

```tsx
import { ScrollView, View, Text } from "react-native";

function MyScreen() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View>
        <Text>Content</Text>
      </View>
    </ScrollView>
  );
}
```

El enfoque nativo maneja las safe areas dinámicas (teclado, toolbars) y permite que el contenido se desplace detrás de la status bar de forma natural.

### 9.5 Usa expo-image para imágenes optimizadas

**Impacto: HIGH (eficiencia de memoria, caché, placeholders con blurhash, carga progresiva)**

Usa `expo-image` en lugar del `Image` de React Native. Proporciona una caché eficiente en memoria, placeholders con blurhash, carga progresiva y un mejor rendimiento para las listas.

**Incorrecto: Image de React Native**

```tsx
import { Image } from "react-native";

function Avatar({ url }: { url: string }) {
  return <Image source={{ uri: url }} style={styles.avatar} />;
}
```

**Correcto: expo-image**

```tsx
import { Image } from "expo-image";

function Avatar({ url }: { url: string }) {
  return <Image source={{ uri: url }} style={styles.avatar} />;
}
```

**Con placeholder de blurhash:**

```tsx
<Image
  source={{ uri: url }}
  placeholder={{ blurhash: "LGF5]+Yk^6#M@-5c,1J5@[or[Q6." }}
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

Referencia: [https://docs.expo.dev/versions/latest/sdk/image/](https://docs.expo.dev/versions/latest/sdk/image/)

### 9.6 Usa Galeria para galerías de imágenes y lightbox

**Impacto: MEDIUM**

Para galerías de imágenes con lightbox (tocar para pantalla completa), usa `@nandorojo/galeria`.

Proporciona shared element transitions nativas con pinch-to-zoom, zoom con doble

toque y pan-to-close. Funciona con cualquier componente de imagen, incluido `expo-image`.

**Incorrecto: implementación de modal personalizada**

```tsx
function ImageGallery({ urls }: { urls: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);

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
  );
}
```

**Correcto: Galeria con expo-image**

```tsx
import { Galeria } from "@nandorojo/galeria";
import { Image } from "expo-image";

function ImageGallery({ urls }: { urls: string[] }) {
  return (
    <Galeria urls={urls}>
      {urls.map((url, index) => (
        <Galeria.Image index={index} key={url}>
          <Image source={{ uri: url }} style={styles.thumbnail} />
        </Galeria.Image>
      ))}
    </Galeria>
  );
}
```

**Una sola imagen:**

```tsx
import { Galeria } from "@nandorojo/galeria";
import { Image } from "expo-image";

function Avatar({ url }: { url: string }) {
  return (
    <Galeria urls={[url]}>
      <Galeria.Image>
        <Image source={{ uri: url }} style={styles.avatar} />
      </Galeria.Image>
    </Galeria>
  );
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

Referencia: [https://github.com/nandorojo/galeria](https://github.com/nandorojo/galeria)

### 9.7 Usa menús nativos para dropdowns y context menus

**Impacto: HIGH (accesibilidad nativa, UX consistente con la plataforma)**

Usa los menús nativos de la plataforma en lugar de implementaciones personalizadas en JS. Los menús nativos

proporcionan accesibilidad integrada, una UX consistente con la plataforma y un mejor rendimiento.

Usa [zeego](https://zeego.dev) para menús nativos multiplataforma.

**Incorrecto: menú personalizado en JS**

```tsx
import { useState } from "react";
import { View, Pressable, Text } from "react-native";

function MyMenu() {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Pressable onPress={() => setOpen(!open)}>
        <Text>Open Menu</Text>
      </Pressable>
      {open && (
        <View style={{ position: "absolute", top: 40 }}>
          <Pressable onPress={() => console.log("edit")}>
            <Text>Edit</Text>
          </Pressable>
          <Pressable onPress={() => console.log("delete")}>
            <Text>Delete</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
```

**Correcto: menú nativo con zeego**

```tsx
import * as DropdownMenu from "zeego/dropdown-menu";

function MyMenu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Pressable>
          <Text>Open Menu</Text>
        </Pressable>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item key="edit" onSelect={() => console.log("edit")}>
          <DropdownMenu.ItemTitle>Edit</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>

        <DropdownMenu.Item
          key="delete"
          destructive
          onSelect={() => console.log("delete")}
        >
          <DropdownMenu.ItemTitle>Delete</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
```

**Context menu: long-press**

```tsx
import * as ContextMenu from "zeego/context-menu";

function MyContextMenu() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <View style={{ padding: 20 }}>
          <Text>Long press me</Text>
        </View>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item key="copy" onSelect={() => console.log("copy")}>
          <ContextMenu.ItemTitle>Copy</ContextMenu.ItemTitle>
        </ContextMenu.Item>

        <ContextMenu.Item key="paste" onSelect={() => console.log("paste")}>
          <ContextMenu.ItemTitle>Paste</ContextMenu.ItemTitle>
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
```

**Elementos checkbox:**

```tsx
import * as DropdownMenu from "zeego/dropdown-menu";

function SettingsMenu() {
  const [notifications, setNotifications] = useState(true);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Pressable>
          <Text>Settings</Text>
        </Pressable>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.CheckboxItem
          key="notifications"
          value={notifications}
          onValueChange={() => setNotifications((prev) => !prev)}
        >
          <DropdownMenu.ItemIndicator />
          <DropdownMenu.ItemTitle>Notifications</DropdownMenu.ItemTitle>
        </DropdownMenu.CheckboxItem>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
```

**Submenús:**

```tsx
import * as DropdownMenu from "zeego/dropdown-menu";

function MenuWithSubmenu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Pressable>
          <Text>Options</Text>
        </Pressable>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item key="home" onSelect={() => console.log("home")}>
          <DropdownMenu.ItemTitle>Home</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>

        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger key="more">
            <DropdownMenu.ItemTitle>More Options</DropdownMenu.ItemTitle>
          </DropdownMenu.SubTrigger>

          <DropdownMenu.SubContent>
            <DropdownMenu.Item key="settings">
              <DropdownMenu.ItemTitle>Settings</DropdownMenu.ItemTitle>
            </DropdownMenu.Item>

            <DropdownMenu.Item key="help">
              <DropdownMenu.ItemTitle>Help</DropdownMenu.ItemTitle>
            </DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
```

Referencia: [https://zeego.dev/components/dropdown-menu](https://zeego.dev/components/dropdown-menu)

### 9.8 Usa modales nativos en lugar de bottom sheets basados en JS

**Impacto: HIGH (rendimiento, gestos y accesibilidad nativos)**

Usa el `<Modal>` nativo con `presentationStyle="formSheet"` o el form sheet nativo de React Navigation

v7 en lugar de librerías de bottom sheet basadas en JS. Los modales nativos

tienen gestos integrados, accesibilidad y un mejor rendimiento. Confía en la UI nativa

para las primitivas de bajo nivel.

**Incorrecto: bottom sheet basado en JS**

```tsx
import BottomSheet from "custom-js-bottom-sheet";

function MyScreen() {
  const sheetRef = useRef<BottomSheet>(null);

  return (
    <View style={{ flex: 1 }}>
      <Button onPress={() => sheetRef.current?.expand()} title="Open" />
      <BottomSheet ref={sheetRef} snapPoints={["50%", "90%"]}>
        <View>
          <Text>Sheet content</Text>
        </View>
      </BottomSheet>
    </View>
  );
}
```

**Correcto: Modal nativo con formSheet**

```tsx
import { Modal, View, Text, Button } from "react-native";

function MyScreen() {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Button onPress={() => setVisible(true)} title="Open" />
      <Modal
        visible={visible}
        presentationStyle="formSheet"
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <View>
          <Text>Sheet content</Text>
        </View>
      </Modal>
    </View>
  );
}
```

**Correcto: form sheet nativo de React Navigation v7**

```tsx
// En tu navigator
<Stack.Screen
  name="Details"
  component={DetailsScreen}
  options={{
    presentation: "formSheet",
    sheetAllowedDetents: "fitToContents",
  }}
/>
```

Los modales nativos proporcionan swipe-to-dismiss, una evitación correcta del teclado y

accesibilidad de forma predeterminada.

### 9.9 Usa Pressable en lugar de los componentes Touchable

**Impacto: LOW (API moderna, más flexible)**

Nunca uses `TouchableOpacity` ni `TouchableHighlight`. En su lugar, usa `Pressable` de

`react-native` o de `react-native-gesture-handler`.

**Incorrecto: componentes Touchable legacy**

```tsx
import { TouchableOpacity } from "react-native";

function MyButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Text>Press me</Text>
    </TouchableOpacity>
  );
}
```

**Correcto: Pressable**

```tsx
import { Pressable } from "react-native";

function MyButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <Text>Press me</Text>
    </Pressable>
  );
}
```

**Correcto: Pressable de gesture handler para listas**

```tsx
import { Pressable } from "react-native-gesture-handler";

function ListItem({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <Text>Item</Text>
    </Pressable>
  );
}
```

Usa el Pressable de `react-native-gesture-handler` dentro de listas desplazables para una mejor

coordinación de gestos, siempre que también estés usando el ScrollView de

`react-native-gesture-handler`.

**Para estados de press animados (cambios de scale, opacity):** Usa `GestureDetector`

con shared values de Reanimated en lugar del style callback de Pressable. Consulta la

regla `animation-gesture-detector-press`.

---

## 10. Design System

**Impacto: MEDIUM**

Patrones de arquitectura para construir librerías de componentes
mantenibles.

### 10.1 Usa compound components en lugar de children polimórficos

**Impacto: MEDIUM (composición flexible, API más clara)**

No crees componentes que puedan aceptar un string si no son un nodo de texto. Si

un componente puede recibir un string como hijo, debe ser un componente `*Text`

dedicado. Para componentes como los botones, que pueden tener tanto un View (o

Pressable) junto con texto, usa compound components, como `Button`,

`ButtonText` y `ButtonIcon`.

**Incorrecto: children polimórficos**

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

**Correcto: compound components**

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

---

## 11. Monorepo

**Impacto: LOW**

Gestión de dependencias y configuración de módulos nativos en
monorepos.

### 11.1 Instala las dependencias nativas en el directorio de la app

**Impacto: CRITICAL (necesario para que funcione el autolinking)**

En un monorepo, los paquetes con código nativo deben instalarse directamente en el directorio

de la app nativa. El autolinking solo escanea el `node_modules` de la app; no

encontrará las dependencias nativas instaladas en otros paquetes.

**Incorrecto: dependencia nativa solo en el paquete compartido**

```typescript
packages/
  ui/
    package.json  # tiene react-native-reanimated
  app/
    package.json  # le falta react-native-reanimated
```

El autolinking falla: el código nativo no se enlaza.

**Correcto: dependencia nativa en el directorio de la app**

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

### 11.2 Usa una única versión de cada dependencia en todo el monorepo

**Impacto: MEDIUM (evita bundles duplicados y conflictos de versiones)**

Usa una única versión de cada dependencia en todos los paquetes de tu monorepo.

Prefiere versiones exactas en lugar de rangos. Múltiples versiones provocan código duplicado en

los bundles, conflictos en runtime y un comportamiento inconsistente entre paquetes.

Usa una herramienta como syncpack para hacer cumplir esto. Como último recurso, usa resolutions de yarn

u overrides de npm.

**Incorrecto: rangos de versiones, múltiples versiones**

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

**Correcto: versiones exactas, una única fuente de verdad**

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

---

## 12. Dependencias de terceros

**Impacto: LOW**

Envolver y re-exportar las dependencias de terceros para la
mantenibilidad.

### 12.1 Importa desde la carpeta del design system

**Impacto: LOW (permite cambios globales y una refactorización sencilla)**

Re-exporta las dependencias desde una carpeta del design system. El código de la app importa desde ahí,

no directamente desde los paquetes. Esto permite cambios globales y una refactorización sencilla.

**Incorrecto: importa directamente desde el paquete**

```tsx
import { View, Text } from "react-native";
import { Button } from "@ui/button";

function Profile() {
  return (
    <View>
      <Text>Hello</Text>
      <Button>Save</Button>
    </View>
  );
}
```

**Correcto: importa desde el design system**

```tsx
import { View } from "@/components/view";
import { Text } from "@/components/text";
import { Button } from "@/components/button";

function Profile() {
  return (
    <View>
      <Text>Hello</Text>
      <Button>Save</Button>
    </View>
  );
}
```

Empieza simplemente re-exportando. Personaliza más adelante sin cambiar el código de la app.

---

## 13. JavaScript

**Impacto: LOW**

Micro-optimizaciones como hacer hoisting de la creación de objetos costosos.

### 13.1 Haz hoisting de la creación de formatters de Intl

**Impacto: LOW-MEDIUM (evita la recreación costosa de objetos)**

No crees `Intl.DateTimeFormat`, `Intl.NumberFormat` ni

`Intl.RelativeTimeFormat` dentro del render o de bucles. Son costosos de

instanciar. Haz hoisting al scope del módulo cuando el locale/las opciones sean estáticos.

**Incorrecto: nuevo formatter en cada render**

```tsx
function Price({ amount }: { amount: number }) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return <Text>{formatter.format(amount)}</Text>;
}
```

**Correcto: con hoisting al scope del módulo**

```tsx
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function Price({ amount }: { amount: number }) {
  return <Text>{currencyFormatter.format(amount)}</Text>;
}
```

**Para locales dinámicos, memoiza:**

```tsx
const dateFormatter = useMemo(
  () => new Intl.DateTimeFormat(locale, { dateStyle: "medium" }),
  [locale],
);
```

**Formatters comunes a los que hacer hoisting:**

```tsx
// Formatters a nivel de módulo
const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });
const timeFormatter = new Intl.DateTimeFormat("en-US", { timeStyle: "short" });
const percentFormatter = new Intl.NumberFormat("en-US", { style: "percent" });
const relativeFormatter = new Intl.RelativeTimeFormat("en-US", {
  numeric: "auto",
});
```

Crear objetos `Intl` es significativamente más costoso que crear `RegExp` u objetos

simples: cada instanciación analiza los datos del locale y construye tablas de búsqueda internas.

---

## 14. Fuentes

**Impacto: LOW**

Carga nativa de fuentes para un mejor rendimiento.

### 14.1 Carga las fuentes de forma nativa en tiempo de build

**Impacto: LOW (fuentes disponibles al iniciar, sin carga asíncrona)**

Usa el config plugin de `expo-font` para incrustar las fuentes en tiempo de build en lugar de

`useFonts` o `Font.loadAsync`. Las fuentes incrustadas son más eficientes.

[Documentación de Expo Font](https://docs.expo.dev/versions/latest/sdk/font/)

**Incorrecto: carga asíncrona de fuentes**

```tsx
import { useFonts } from "expo-font";
import { Text, View } from "react-native";

function App() {
  const [fontsLoaded] = useFonts({
    "Geist-Bold": require("./assets/fonts/Geist-Bold.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <Text style={{ fontFamily: "Geist-Bold" }}>Hello</Text>
    </View>
  );
}
```

**Correcto: config plugin, fuentes incrustadas en el build**

```tsx
import { Text, View } from "react-native";

function App() {
  // No se necesita un estado de carga: la fuente ya está disponible
  return (
    <View>
      <Text style={{ fontFamily: "Geist-Bold" }}>Hello</Text>
    </View>
  );
}
```

Después de agregar las fuentes al config plugin, ejecuta `npx expo prebuild` y vuelve a hacer build de la

app nativa.

---

## Referencias

1. [https://react.dev](https://react.dev)
2. [https://reactnative.dev](https://reactnative.dev)
3. [https://docs.swmansion.com/react-native-reanimated](https://docs.swmansion.com/react-native-reanimated)
4. [https://docs.swmansion.com/react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler)
5. [https://docs.expo.dev](https://docs.expo.dev)
6. [https://legendapp.com/open-source/legend-list](https://legendapp.com/open-source/legend-list)
7. [https://github.com/nandorojo/galeria](https://github.com/nandorojo/galeria)
8. [https://zeego.dev](https://zeego.dev)
