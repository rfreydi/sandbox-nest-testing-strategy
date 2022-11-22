export const envFilePath =
  process.env.NODE_ENV === 'test'
    ? '.env.test'
    : ['.env.development.local', '.env.development', '.env.production'];
