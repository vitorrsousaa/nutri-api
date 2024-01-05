import FindAllFoodService from '@godiet-modules/Food/services/FindAll';

import prisma from '../../../app/shared/database/prisma';
import FoodRepositories from '../../../app/shared/database/repositories/food';

export function makeFindAllFoodService() {
  const foodRepositories = new FoodRepositories(prisma);

  return new FindAllFoodService(foodRepositories);
}
