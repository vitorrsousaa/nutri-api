import FoodRepositories from '../../../../shared/database/repositories/food';

export class FindAllFoodService {
  constructor(private readonly foodRepositories: FoodRepositories) {}

  async execute() {
    const foods = await this.foodRepositories.findAll({
      orderBy: {
        name: 'asc',
      },
    });

    return foods;
  }
}
