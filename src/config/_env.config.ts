export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV ?? 'dev',
  mongoUrl: process.env.MONGO_URL,
  port: Number(process.env.PORT),
  defaultLimit: Number(process.env.DEFAULT_LIMIT),
  defaultOffset: Number(process.env.DEFAULT_OFFSET),
});
