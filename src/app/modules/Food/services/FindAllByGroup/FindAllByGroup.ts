import FoodRepositories from '../../../../shared/database/repositories/food';
import { TGroupFood } from '../../entities/group';

export class FindAllByGroupFoodService {
  constructor(private readonly foodRepositories: FoodRepositories) {}

  async execute(groupFood: TGroupFood) {
    const foods = await this.foodRepositories.findAll({
      where: {
        group: groupFood,
      },
    });

    return foods;
  }
}
