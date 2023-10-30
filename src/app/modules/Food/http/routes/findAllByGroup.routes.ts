import { Router } from 'express';

import FoodModule from '../../module';

const findAllByGroupFoodRoutes = Router();

findAllByGroupFoodRoutes.get(
  '/:group',
  FoodModule.getController('findAllByGroup')
);

export default findAllByGroupFoodRoutes;
