import { z } from 'zod';

export const OriginFoodEnum = z.enum(['TACO', 'CUSTOM']);

export type IOriginFoodEnum = z.infer<typeof OriginFoodEnum>;
