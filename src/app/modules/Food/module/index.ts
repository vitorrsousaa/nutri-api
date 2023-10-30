import prisma from '../../../shared/database/prisma';
import FoodRepositories from '../../../shared/database/repositories/food';
import FoodController, { optionsController } from '../controller';
import FindAllFoodService from '../services/FindAll';
import FindAllByGroupFoodService from '../services/FindAllByGroup';

const foodRepositoriesInstance = new FoodRepositories(prisma);

class FoodModule {
  private controller: FoodController;

  constructor() {
    this.controller = new FoodController(
      new FindAllFoodService(foodRepositoriesInstance),
      new FindAllByGroupFoodService(foodRepositoriesInstance)
    );
  }

  getController(controller: optionsController) {
    return this.controller[controller];
  }
}

export default new FoodModule();
