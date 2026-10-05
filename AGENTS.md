# Descripción del Proyecto
Arquitectura base agnóstica a las features para iniciar un nuevo proyecto en Expo y React Native, configurada para trabajar con IA

# Ejecución de Proyecto

* Runtime: Node.js 24
* Administrador de versiones: fnm
* Manejador de paquetes: pnpm
* Archivo de bloqueo: pnpm-lock.yaml

# Reglas **OBLIGATORIAS** de Expo

## Fuentes de consulta
Antes de editar código y responder, consulta solo las fuentes cuya columna **¿Cuándo leerlo?** coincida con la tarea, y aplica a la vez las reglas y la documentación consultadas.

Cuando las fuentes se contradicen, gana la de número menor en la columna **Prioridad**:

| Prioridad | Fuente | ¿Qué es? | ¿Cuándo leerlo? |
| --- | --- | --- | --- |
| 1 | [Skill `expo-conventions`](.agents/skills/expo-conventions/SKILL.md) | Reglas propias del proyecto | Antes de crear, mover, modificar o revisar código, y al responder cómo se hace algo en este proyecto. |
| 2 | [Skill `vercel-react-native-skills`](.agents/skills/vercel-react-native-skills/SKILL.md) | Reglas de terceros de Vercel: rendimiento de React y Expo | Al crear, modificar o revisar componentes, páginas u obtención de datos, y al optimizar el rendimiento o el bundle. |
| 3 | [Skill `vercel-composition-patterns`](.agents/skills/vercel-composition-patterns/SKILL.md) | Reglas de terceros: composición de componentes de React (Vercel) | Al crear, modificar o revisar la API de un componente reutilizable: props booleanas, compound components, render props, context providers o `forwardRef`. |
| 4 | [llms.txt de Expo](https://docs.expo.dev/llms.txt) | Tabla de contenido con enlaces a la documentación oficial de Expo | Leer solo el índice no basta: abre las páginas enlazadas que correspondan. Hazlo al responder sobre una API de Expo, al usarla (aunque creas conocerla) y ante errores. |
| 5 | Datos de entrenamiento | Tu conocimiento previo | Puedes usarlo, pero las fuentes anteriores tienen prioridad: este proyecto usa Expo 57, cuyos breaking changes pueden haberlo dejado desactualizado. Que esté desactualizado no significa que esté mal; solo que puede no aplicar a esta versión. |

## Preguntar
Si detectas un error, una inconsistencia o una ambigüedad, o tienes alguna duda, detente y pregúntame antes de escribir o modificar código. No supongas cómo debe implementarse algo.

**Razón:** preguntar cuesta menos que revisar y deshacer código basado en una suposición incorrecta.

## Nuevos Modulos
Priorizar los módulos recomendados de Expo sobre las bibliotecas de terceros y verificar sus habilidades antes de agregar dependencias. Consulta la documentación: https://docs.expo.dev/versions/latest/index.md
