---
title: Optimiza el rendimiento de las listas con referencias de objetos estables
impact: CRITICAL
impactDescription: la virtualización depende de la estabilidad de las referencias
tags: lists, performance, flatlist, virtualization
---

## Optimiza el rendimiento de las listas con referencias de objetos estables

No hagas map ni filter de los datos antes de pasarlos a listas virtualizadas. La virtualización
depende de la estabilidad de las referencias de los objetos para saber qué cambió: las nuevas referencias provocan
re-renders completos de todos los elementos visibles. Intenta evitar renders frecuentes a
nivel del padre de la lista.

Cuando sea necesario, usa selectores de context dentro de los elementos de la lista.

**Incorrecto (crea nuevas referencias de objetos en cada pulsación de tecla):**

```tsx
function DomainSearch() {
  const { keyword, setKeyword } = useKeywordZustandState()
  const { data: tlds } = useTlds()

  // Mal: crea nuevos objetos en cada render, reasignando el padre de toda la lista en cada pulsación de tecla
  const domains = tlds.map((tld) => ({
    domain: `${keyword}.${tld.name}`,
    tld: tld.name,
    price: tld.price,
  }))

  return (
    <>
      <TextInput value={keyword} onChangeText={setKeyword} />
      <LegendList
        data={domains}
        renderItem={({ item }) => <DomainItem item={item} keyword={keyword} />}
      />
    </>
  )
}
```

**Correcto (referencias estables, transforma dentro de los elementos):**

```tsx
const renderItem = ({ item }) => <DomainItem tld={item} />

function DomainSearch() {
  const { data: tlds } = useTlds()

  return (
    <LegendList
      // bien: mientras los datos sean estables, LegendList no hará re-render de toda la lista
      data={tlds}
      renderItem={renderItem}
    />
  )
}

function DomainItem({ tld }: { tld: Tld }) {
  // bien: transforma dentro de los elementos y no pases los datos dinámicos como prop
  // bien: usa una función selector de zustand para recibir de vuelta un string estable
  const domain = useKeywordZustandState((s) => s.keyword + '.' + tld.name)
  return <Text>{domain}</Text>
}
```

**Actualizar la referencia del array padre:**

Crear una nueva instancia del array puede estar bien, siempre que las referencias de sus objetos
internos sean estables. Por ejemplo, si ordenas una lista de objetos:

```tsx
// bien: crea una nueva instancia del array sin mutar los objetos internos
// bien: la referencia del array padre no se ve afectada al escribir y actualizar "keyword"
const sortedTlds = tlds.toSorted((a, b) => a.name.localeCompare(b.name))

return <LegendList data={sortedTlds} renderItem={renderItem} />
```

Aunque esto crea una nueva instancia del array `sortedTlds`, las referencias de los objetos
internos son estables.

**Con zustand para datos dinámicos (evita re-renders del padre):**

```tsx
const useSearchStore = create<{ keyword: string }>(() => ({ keyword: '' }))

function DomainSearch() {
  const { data: tlds } = useTlds()

  return (
    <>
      <SearchInput />
      <LegendList
        data={tlds}
        // si no estás usando React Compiler, envuelve renderItem con useCallback
        renderItem={({ item }) => <DomainItem tld={item} />}
      />
    </>
  )
}

function DomainItem({ tld }: { tld: Tld }) {
  // Selecciona solo lo que necesitas: el componente solo hace re-render cuando cambia keyword
  const keyword = useSearchStore((s) => s.keyword)
  const domain = `${keyword}.${tld.name}`
  return <Text>{domain}</Text>
}
```

Ahora la virtualización puede omitir los elementos que no han cambiado al escribir. Solo los elementos
visibles (~20) hacen re-render en cada pulsación de tecla, en lugar del padre.

**Derivar el estado dentro de los elementos de la lista a partir de los datos del padre (evita re-renders
del padre):**

Para los componentes donde los datos son condicionales según el estado del padre, este
patrón es aún más importante. Por ejemplo, si estás verificando si un elemento está
marcado como favorito, alternar los favoritos solo hace re-render de un componente si el propio elemento
se encarga de acceder al estado en lugar del padre:

```tsx
function DomainItemFavoriteButton({ tld }: { tld: Tld }) {
  const isFavorited = useFavoritesStore((s) => s.favorites.has(tld.id))
  return <TldFavoriteButton isFavorited={isFavorited} />
}
```

Nota: si estás usando React Compiler, puedes leer los valores de React Context
directamente dentro de los elementos de la lista. Aunque esto es ligeramente más lento que usar un
selector de Zustand en la mayoría de los casos, el efecto puede ser insignificante.
