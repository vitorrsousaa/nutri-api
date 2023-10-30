import * as z from 'zod';

export const MealFoodSchema = z.object({
  quantity: z.number().positive(),
});

export type TMealFood = z.infer<typeof MealFoodSchema>;
