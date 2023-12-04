import * as z from 'zod';

export const envSchema = z.object({
  PORT: z.string().default('3001'),
  DATABASE_URL: z.string().url(),
  AUTH_SECRET: z.string(),
  RESEND_API_KEY: z.string(),
});
