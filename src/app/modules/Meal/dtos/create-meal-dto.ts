import * as z from 'zod';

import { MealFoodSchema } from '../../../shared/entities/TMealFood';

export const CreateMealSchema = z.object({
  name: z.string(),
  time: z.string(),
  mealFoods: z.array(MealFoodSchema),
});

export type createMealDTO = z.infer<typeof CreateMealSchema>;
