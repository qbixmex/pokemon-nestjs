export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV ?? 'dev',
  mongoUrl: process.env.MONGO_URL,
  port: Number(process.env.PORT) ?? 3000,
  defaultLimit: Number(process.env.DEFAULT_LIMIT) ?? 5,
});
