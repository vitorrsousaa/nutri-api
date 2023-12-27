import MealFoodRepositories from '../../../../shared/database/repositories/mealFood';
import { ICreateMealFoodDTO } from '../../dtos/create-meal-food-dto';

export class CreateMealFoodService {
  constructor(private readonly mealFoodRepositories: MealFoodRepositories) {}

  async execute(createMealFoodDTO: ICreateMealFoodDTO) {
    const {
      calories,
      carb,
      fat,
      foodId,
      foodOrigin,
      name,
      protein,
      quantity,
      baseUnit,
    } = createMealFoodDTO;

    const mealFood = await this.mealFoodRepositories.create({
      data: {
        quantity,
        foodId,
        calories,
        carb,
        fat,
        foodOrigin,
        name,
        protein,
        baseUnit,
      },
    });

    return mealFood;
  }
}
