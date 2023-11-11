import prisma from '../../../shared/database/prisma';
import FoodRepositories from '../../../shared/database/repositories/food';
import FoodController, { optionsController } from '../controller';
import FindAllFoodService from '../services/FindAll';

const foodRepositoriesInstance = new FoodRepositories(prisma);

class FoodModule {
  private controller: FoodController;

  constructor() {
    this.controller = new FoodController(
      new FindAllFoodService(foodRepositoriesInstance)
    );
  }

  getController(controller: optionsController) {
    return this.controller[controller];
  }
}

export default new FoodModule();
