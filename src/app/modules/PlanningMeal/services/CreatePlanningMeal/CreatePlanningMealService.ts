import * as z from 'zod';

import PlanningMealRepositories from '../../../../shared/database/repositories/planningMeal';
import { OriginFoodEnum } from '../../../../shared/entities/TOriginFood';
import { ZodError } from '../../../../shared/error';
import { IValidatePatientHasPlanning } from '../../../../shared/services/ValidatePatientHasPlanning';
import ValidatePatientOwnershipService from '../../../../shared/services/ValidatePatientOwnership';
import { ICreatePlanningMealDTO } from '../../dtos/create-planning-meal-dto';

export const CreatePlanningMealOutputSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  patientId: z.string().uuid(),
  description: z.string().optional(),
  createdAt: z.date(),
  endsIn: z.date(),
});

export class CreatePlanningMealService {
  constructor(
    private readonly planningMealRepositories: PlanningMealRepositories,
    private readonly validatePatientOwnershipService: ValidatePatientOwnershipService,
    private readonly validatePatientHasPlanning: IValidatePatientHasPlanning
  ) {}

  async execute(
    createPlanningMealDTO: ICreatePlanningMealDTO,
    userId: string,
    patientId: string
  ) {
    await this.validate(userId, patientId);

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

  private async validate(userId: string, patientId: string) {
    return Promise.all([
      this.validatePatientOwnershipService.validate(userId, patientId),
      this.validatePatientHasPlanning.validate({ patientId }),
    ]);
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
            baseUnit: food.baseUnit,
          })),
        },
      };
    });
  }
}
