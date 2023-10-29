import MealFoodRepositories from '../../../../shared/database/repositories/mealFood';

export class CreateMealFoodService {
  constructor(private readonly mealFoodRepositories: MealFoodRepositories) {}

  async execute(quantity: number, foodId: string) {
    const mealFood = await this.mealFoodRepositories.create({
      data: {
        quantity,
        foodId,
      },
    });

    return mealFood;
  }
}
