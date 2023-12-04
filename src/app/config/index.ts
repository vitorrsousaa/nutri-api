// src/config.ts

import dotenv from 'dotenv';
import * as z from 'zod';

// Definindo o esquema usando Zod
import { envSchema } from './envSchema';

// Carregando variáveis de ambiente
dotenv.config();

// Validando as variáveis de ambiente
try {
  envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('Erro nas variáveis de ambiente:', error.errors);
    process.exit(1);
  }
}

class Config {
  static PORT = process.env.PORT || '3001';
  static AUTH_SECRET = process.env.AUTH_SECRET as string;
}

export default Config;
