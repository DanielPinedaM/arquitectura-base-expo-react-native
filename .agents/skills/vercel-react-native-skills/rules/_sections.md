# Secciones

Este archivo define todas las secciones, su orden, niveles de impacto y descripciones.
El ID de la sección (entre paréntesis) es el prefijo del nombre de archivo que se usa para agrupar las reglas.

---

## 1. Renderizado fundamental (rendering)

**Impacto:** CRITICAL  
**Descripción:** Reglas fundamentales de renderizado de React Native. Incumplirlas provoca
crashes en runtime o UI rota.

## 2. Rendimiento de listas (list-performance)

**Impacto:** HIGH  
**Descripción:** Optimización de listas virtualizadas (FlatList, LegendList, FlashList)
para un scroll fluido y actualizaciones rápidas.

## 3. Animación (animation)

**Impacto:** HIGH  
**Descripción:** Animaciones aceleradas por GPU, patrones de Reanimated y cómo evitar el
render thrashing durante los gestos.

## 4. Rendimiento del scroll (scroll)

**Impacto:** HIGH  
**Descripción:** Rastrear la posición del scroll sin provocar render thrashing.

## 5. Navegación (navigation)

**Impacto:** HIGH  
**Descripción:** Uso de navigators nativos para la navegación con stack y tabs en lugar de
alternativas basadas en JS.

## 6. Estado de React (react-state)

**Impacto:** MEDIUM  
**Descripción:** Patrones para gestionar el estado de React y evitar stale closures y
re-renders innecesarios.

## 7. Arquitectura del estado (state)

**Impacto:** MEDIUM  
**Descripción:** Principios de ground truth para las variables de estado y los valores derivados.

## 8. React Compiler (react-compiler)

**Impacto:** MEDIUM  
**Descripción:** Patrones de compatibilidad de React Compiler con React Native y
Reanimated.

## 9. Interfaz de usuario (ui)

**Impacto:** MEDIUM  
**Descripción:** Patrones de UI nativos para imágenes, menús, modales, estilos e
interfaces consistentes con la plataforma.

## 10. Design System (design-system)

**Impacto:** MEDIUM  
**Descripción:** Patrones de arquitectura para construir librerías de componentes
mantenibles.

## 11. Monorepo (monorepo)

**Impacto:** LOW  
**Descripción:** Gestión de dependencias y configuración de módulos nativos en
monorepos.

## 12. Dependencias de terceros (imports)

**Impacto:** LOW  
**Descripción:** Envolver y re-exportar las dependencias de terceros para la
mantenibilidad.

## 13. JavaScript (js)

**Impacto:** LOW  
**Descripción:** Micro-optimizaciones como hacer hoisting de la creación de objetos costosos.

## 14. Fuentes (fonts)

**Impacto:** LOW  
**Descripción:** Carga nativa de fuentes para un mejor rendimiento.
