// #region configurar variables de entorno
function inlinePublicVariables({ types: t }, { variables }) {
  return {
    name: "inline-public-environment-variables",
    visitor: {
      Identifier(path, state) {
        if (state.filename?.includes("node_modules")) return;
        if (path.node.name !== "environment" || !path.isReferencedIdentifier())
          return;
        if (path.scope.hasBinding("environment", true)) return;

        const { parentPath } = path;
        const isPropertyAccess =
          parentPath.isMemberExpression({
            object: path.node,
            computed: false,
          }) && Object.hasOwn(variables, parentPath.node.property.name);

        if (isPropertyAccess) {
          parentPath.replaceWith(
            t.valueToNode(variables[parentPath.node.property.name]),
          );
        } else {
          path.replaceWith(t.valueToNode(variables));
        }
      },

      MemberExpression(path, state) {
        if (state.filename?.includes("node_modules")) return;
        if (
          path.node.computed ||
          !path.get("object").matchesPattern("process.env")
        )
          return;
        if (path.parentPath.isAssignmentExpression({ left: path.node })) return;

        const variable = path.node.property.name;

        if (Object.hasOwn(variables, variable)) {
          path.replaceWith(t.valueToNode(variables[variable]));
        }
      },
    },
  };
}
// #endregion configurar variables de entorno

export default function babelConfig(api) {
  api.cache.using(() => process.env.APP_ENV_PUBLIC_VARIABLES);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        inlinePublicVariables,
        { variables: JSON.parse(process.env.APP_ENV_PUBLIC_VARIABLES ?? "{}") },
      ],
    ],
  };
}
