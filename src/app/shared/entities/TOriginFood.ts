import { z } from 'zod';

export const OriginFoodEnum = z.enum(['DATABASE', 'CUSTOM']);

export type IOriginFoodEnum = z.infer<typeof OriginFoodEnum>;
