import * as z from 'zod';

export default function verifyObject<S extends z.ZodType>(
  schema: S,
  objectToCheck: Record<string, unknown>
): boolean {
  try {
    schema.parse(objectToCheck);
    return true;
  } catch (error) {
    return false;
  }
}
