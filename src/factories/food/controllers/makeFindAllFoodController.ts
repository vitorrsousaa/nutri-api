import FindAllFoodController from '../../../app/modules/Food/controllers/FindAllFoodController';
import { makeFindAllFoodService } from '../services/makeFindAllFoodService';

export function makeFindAllFoodController() {
  const findAllFoodService = makeFindAllFoodService();

  return new FindAllFoodController(findAllFoodService);
}
