export interface Environment {
  NODE_ENV: "localhost" | "production" | "test";
  EXPO_PUBLIC_API: string;

  auth: {
    user: string;
    password: string;
  };
}
