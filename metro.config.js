import { getDefaultConfig } from "expo/metro-config.js";

// #region configurar variables de entorno
import { environment as localhost } from "./environments/environment.localhost.ts";
import { environment as prod } from "./environments/environment.prod.ts";
import { environment as test } from "./environments/environment.test.ts";

const ENVIRONMENTS = { localhost, test, prod };

const { APP_ENV } = process.env;

if (!Object.hasOwn(ENVIRONMENTS, APP_ENV ?? "")) {
  throw new Error(
    `❌ [metro.config.js] APP_ENV="${APP_ENV ?? ""}" no corresponde a ningún archivo de environments/.\n\n` +
      `Ambientes disponibles: ${Object.keys(ENVIRONMENTS).join(", ")}.\n\n` +
      "Ejecutar Expo con los scripts de package.json, que ya definen APP_ENV: " +
      "start:local, start:test, start:prod, build:android:test, build:android:prod, build:ios:test o build:ios:prod.",
  );
}

const environment = ENVIRONMENTS[APP_ENV];

const reservedVariables = Object.keys(environment).filter(
  (variable) =>
    variable.startsWith("EXPO_") && !variable.startsWith("EXPO_PUBLIC_"),
);

if (reservedVariables.length > 0) {
  throw new Error(
    `❌ [metro.config.js] environments/environment.${APP_ENV}.ts declara variables reservadas por Expo: ` +
      `${reservedVariables.join(", ")}. Cambiarles el nombre.`,
  );
}

const publicVariables = Object.fromEntries(
  Object.entries(environment).filter(
    ([variable]) =>
      variable === "NODE_ENV" || variable.startsWith("EXPO_PUBLIC_"),
  ),
);

process.env.APP_ENV_PUBLIC_VARIABLES = JSON.stringify(publicVariables);

for (const [variable, value] of Object.entries(environment)) {
  if (variable !== "NODE_ENV") {
    process.env[variable] =
      typeof value === "string" ? value : JSON.stringify(value);
  }
}

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(import.meta.dirname);

config.cacheVersion = [
  config.cacheVersion,
  process.env.APP_ENV_PUBLIC_VARIABLES,
  ...Object.keys(process.env)
    .filter((variable) => variable.startsWith("EXPO_PUBLIC_"))
    .sort()
    .map((variable) => `${variable}=${process.env[variable]}`),
].join("\n");
// #endregion configurar variables de entorno<<

export default config;
