import * as z from 'zod';

export const UserSchema = z.object({
  email: z.string().email({ message: 'Invalid e-mail format' }),
  password: z.string().min(8),
});

export type TUser = z.infer<typeof UserSchema>;
