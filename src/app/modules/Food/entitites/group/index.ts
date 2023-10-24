import { z } from 'zod';

export const GroupFoodEnum = z.enum([
  'FRUIT',
  'PROTEIN',
  'CARB',
  'LEGUMES',
  'CEREAL',
  'OTHERS',
]);

export type TGroupFood = z.infer<typeof GroupFoodEnum>;
