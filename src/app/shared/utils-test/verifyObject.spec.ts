import * as z from 'zod';

import verifyObject from './verifyObject';

const schema = z.object({
  name: z.string(),
  email: z.string(),
  id: z.number(),
});

describe('VerifyObject function util', () => {
  it('should return true for a valid object', () => {
    const validObject = {
      name: 'John Doe',
      email: 'john@example.com',
      id: 123,
    };

    const result = verifyObject(schema, validObject);

    expect(result).toBe(true);
  });

  it('should return false for an object with missing properties', () => {
    const invalidObject = {
      name: 'Alice Smith',
      email: 'alice@example.com',
    };

    const result = verifyObject(schema, invalidObject);

    expect(result).toBe(false);
  });

  it('should return false for an object with properties of the wrong type', () => {
    const invalidObject = {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      id: 'not_a_number',
    };

    const result = verifyObject(schema, invalidObject);

    expect(result).toBe(false);
  });
});
