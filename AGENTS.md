# Descripción del Proyecto
Arquitectura base agnóstica a las features para iniciar un nuevo proyecto en Expo y React Native, configurada para trabajar con IA

# Ejecución del Proyecto

* **Runtime:** Node.js 24
* **Administrador de versiones:** pnpm, a partir de pnpm 12 no es necesario fnm ni nvm
* **Manejador de paquetes:** pnpm
* **Archivo de bloqueo:** pnpm-lock.yaml

# Reglas **OBLIGATORIAS** de Expo

## Preguntar
Las modificaciones triviales se implementan directamente; las de complejidad media o alta, solo después de utilizar la [skill `question-me`](.agents/skills/question-me/SKILL.md)

**Razón:** preguntar cuesta menos que revisar y deshacer código basado en una suposición incorrecta.

## Fuentes de consulta
Antes de editar código y responder, consulta solo las fuentes cuya columna **¿Cuándo leerlo?** coincida con la tarea, y aplica a la vez las reglas y la documentación consultadas.

Cuando las fuentes se contradicen, gana la de número menor en la columna **Prioridad**:

| Prioridad | Fuente | ¿Qué es? | ¿Cuándo leerlo? |
| --- | --- | --- | --- |
| 1 | [Skill `expo-conventions`](.agents/skills/expo-conventions/SKILL.md) | Reglas propias del proyecto | Al decidir dónde va un archivo o carpeta, cómo se nombra, qué librería o componente del proyecto usar y cómo se estiliza, y al responder cómo se hace algo en este proyecto |
| 2 | [Skill `vercel-react-native-skills`](.agents/skills/vercel-react-native-skills/SKILL.md) | Reglas de terceros de Vercel sobre rendimiento de React y Expo | Al crear, modificar o revisar componentes, páginas u obtención de datos, y al optimizar el rendimiento o el bundle |
| 3 | [Skill `vercel-composition-patterns`](.agents/skills/vercel-composition-patterns/SKILL.md) | Reglas de terceros de Vercel sobre composición de componentes de React | Al crear, modificar o revisar la API de un componente reutilizable: props booleanas, compound components, render props, context providers o `forwardRef` |
| 4 | [Skill `expo-58.0.19-docs`](.agents/skills/expo-58.0.19-docs/SKILL.md) | [Documentación oficial de Expo](https://docs.expo.dev/llms.txt) | Al responder y usar APIs de **Expo** (aunque creas conocerla) |
| 5 | [Skill `react-native-0.88.0-docs`](.agents/skills/react-native-0.88.0-docs/SKILL.md) | [Documentación oficial de React Native](https://reactnative.dev/llms.txt) | Al responder y usar APIs de **React Native** (aunque creas conocerla) |
| 6 | [Skill `zod-4`](.agents/skills/zod-4/SKILL.md) | Breaking changes de Zod 4 | Al responder preguntas y editar codigo de Zod |
| 7 | Datos de entrenamiento | Tu conocimiento previo | Puedes usarlo, pero las fuentes anteriores tienen prioridad: este proyecto usa Expo 58, React Native 0.88 y Zod 4, cuyos breaking changes pueden dejar tus datos de entrenamiento desactualizados. Que esté desactualizado no significa que esté mal; solo que puede no aplicar a esta versión. |

## Nuevos Modulos
Priorizar los módulos recomendados de Expo sobre las bibliotecas de terceros y verificar sus habilidades antes de agregar dependencias. Consulta la documentación: https://docs.expo.dev/versions/latest/index.md
