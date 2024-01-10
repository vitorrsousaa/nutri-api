import dotenv from 'dotenv';
import { ZodError } from 'zod';

import { envSchema } from './app/config/envSchema';
import prisma from './app/shared/database/prisma';
import server from './server';

dotenv.config();

(async () => {
  try {
    await prisma.$connect();

    console.log('Parsing environment variables...');
    const processEnv = envSchema.parse(process.env);
    console.log('Environment variables: ' + '\x1b[32m%s\x1b[0m', 'Success');

    const port = processEnv.PORT;

    server.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Error in environment variables:', error.errors);
    } else {
      console.log(error);
    }
  }
})();
