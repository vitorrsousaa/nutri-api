import * as z from 'zod';

import { ZodError } from '../error';

export default function returnErrorMissingField<S extends z.ZodType>(
  schema: S,
  request: unknown
): z.SafeParseSuccess<z.output<S>>['data'] {
  const result = schema.safeParse(request);

  if (!result.success) {
    throw new ZodError(result.error);
  }

  return result.data;
}
