import * as z from 'zod';

import { OriginFoodEnum } from '../../../shared/entities/TOriginFood';

export const CreateMealFoodSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().min(1),
  calories: z.number().min(1),
  protein: z.number().min(1),
  fat: z.number().min(1),
  carb: z.number().min(1),
  foodOrigin: OriginFoodEnum,
  foodId: z.string().min(1),
});

export type ICreateMealFoodDTO = z.infer<typeof CreateMealFoodSchema>;
