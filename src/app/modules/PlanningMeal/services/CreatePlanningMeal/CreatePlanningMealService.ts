import * as z from 'zod';

import PlanningMealRepositories from '../../../../shared/database/repositories/planningMeal/PlanningMealRepositories';
import { OriginFoodEnum } from '../../../../shared/entities/TOriginFood';
import { ZodError } from '../../../../shared/error';
import ValidatePatientOwnershipService from '../../../../shared/services/ValidatePatientOwnership';
import { ICreatePlanningMealDTO } from '../../dtos/create-planning-meal-dto';

export const CreatePlanningMealOutputSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  patientId: z.string().uuid(),
  description: z.string().optional(),
});

export class CreatePlanningMealService {
  constructor(
    private readonly planningMealRepositories: PlanningMealRepositories,
    private readonly validatePatientOwnershipService: ValidatePatientOwnershipService
  ) {}

  async execute(
    createPlanningMealDTO: ICreatePlanningMealDTO,
    userId: string,
    patientId: string
  ) {
    await this.validatePatientOwnershipService.validate(userId, patientId);

    const { meals, description } = createPlanningMealDTO;

    await this.validateOriginFood(meals);

    const createMealDTO = this.mapperMealToPrisma(meals);

    const planningMeal = await this.planningMealRepositories.create({
      data: {
        description,
        patientId,
        userId,
        meals: {
          create: createMealDTO,
        },
      },
      include: {
        meals: {
          include: {
            mealFoods: true,
          },
        },
      },
    });

    return planningMeal;
  }

  private async validateOriginFood(meals: ICreatePlanningMealDTO['meals']) {
    meals.map((meal) =>
      meal.foods.map((food) => {
        const result = OriginFoodEnum.safeParse(food.origin);

        if (!result.success) {
          throw new ZodError(result.error);
        }
      })
    );
  }

  private mapperMealToPrisma(meals: ICreatePlanningMealDTO['meals']) {
    return meals.map((meal) => {
      const { name, foods } = meal;

      return {
        name: name,
        time: new Date().toISOString(),
        mealFoods: {
          create: foods.map((food) => ({
            name: food.name,
            calories: food.calories,
            carb: food.carb,
            fat: food.fat,
            protein: food.protein,
            quantity: food.quantity,
            foodOrigin: food.origin,
            foodId: food.id,
          })),
        },
      };
    });
  }
}
