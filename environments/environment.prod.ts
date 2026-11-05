import type { Environment } from "@/environments/data-types/interfaces/environment.interface";

/**
 * variables de entorno de PRODUCCIÓN
 *
 * - NODE_ENV: es el valor de environment.NODE_ENV y de process.env.NODE_ENV en el código de la app
 * - Con el prefijo EXPO_PUBLIC_: se incrustan en la app y se leen en el código con environment.EXPO_PUBLIC_<VARIABLE>
 * - Sin el prefijo: solo están disponibles durante el desarrollo o la compilación (servidor), no dentro de la app móvil
 * - Los valores pueden ser textos u objetos anidados */
export const environment: Environment = {
  NODE_ENV: "production",
  EXPO_PUBLIC_API: "https://aqui escribir dominio de PRODUCCION/api/v1/",

  auth: {
    user: "aqui escribir usuario quemado en login en PRODUCCION",
    password: "aqui escribir contraseña quemada en login en PRODUCCION",
  },
};
