import { ZodError as TZodError } from 'zod';

class ZodError {
  public readonly message: { field: string | number; message: string }[];
  public readonly statusCode: number;

  constructor(error: TZodError) {
    this.message = error.errors.map((error) => {
      return {
        field: error.path[0],
        message: error.message,
      };
    });
    this.statusCode = 400;
  }
}

export default ZodError;
