import { z } from 'zod';

export const GroupFoodSchema = z.enum([
  'FRUIT',
  'PROTEIN',
  'CARB',
  'CEREAL',
  'OTHERS',
]);

export type TGroupFood = z.infer<typeof GroupFoodSchema>;
