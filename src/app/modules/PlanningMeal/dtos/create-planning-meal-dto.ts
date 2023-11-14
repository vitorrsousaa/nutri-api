import * as z from 'zod';

import { OriginFoodEnum } from '../../../shared/entities/TOriginFood';

export const CreatePlanningMealSchema = z.object({
  description: z.string().optional(),
  meals: z
    .array(
      z.object({
        name: z.string().min(1, 'Name cannot be empty'),
        time: z.string().min(1, 'Time cannot be empty'),
        foods: z.array(
          z.object({
            id: z.string().min(1, 'Id cannot be empty'),
            name: z.string().min(1, 'Name cannot be empty'),
            origin: OriginFoodEnum,
            quantity: z.number().min(1, 'Quantity cannot be empty'),
            calories: z.number().min(1, 'calories cannot be empty'),
            protein: z.number().min(1, 'protein cannot be empty'),
            fat: z.number().min(1, 'fat cannot be empty'),
            carb: z.number().min(1, 'carb cannot be empty'),
            baseUnit: z.string().min(1, 'baseUnit cannot be empty'),
          })
        ),
      })
    )
    .nonempty()
    .min(1, 'Meals cannot be empty'),
});

export type ICreatePlanningMealDTO = z.infer<typeof CreatePlanningMealSchema>;
