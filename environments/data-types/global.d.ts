import type { Environment } from "@/environments/data-types/interfaces/environment.interface";

type PublicVariable =
  | "NODE_ENV"
  | Extract<keyof Environment, `EXPO_PUBLIC_${string}`>;

declare global {
  const environment: Readonly<Pick<Environment, PublicVariable>>;
}
