import { Router } from 'express';

import FoodModule from '../../module';

const findAllFoodRoutes = Router();

findAllFoodRoutes.get('/', FoodModule.getController('findAll'));

export default findAllFoodRoutes;
