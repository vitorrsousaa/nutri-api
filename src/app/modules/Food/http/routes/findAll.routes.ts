import { Router } from 'express';

import FoodModule from '../../module';

const findAllFoodRoutes = Router();

findAllFoodRoutes.get('/:origin', FoodModule.getController('findAll'));

export default findAllFoodRoutes;
