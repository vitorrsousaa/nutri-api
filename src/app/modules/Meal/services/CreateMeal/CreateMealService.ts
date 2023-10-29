import MealRepositories from '../../../../shared/database/repositories/meal';
import { createMealDTO } from '../../dtos/create-meal-dto';

export class CreateMealService {
  constructor(private readonly mealRepositories: MealRepositories) {}

  async execute(createMealDTO: createMealDTO) {
    return createMealDTO;
  }
}
