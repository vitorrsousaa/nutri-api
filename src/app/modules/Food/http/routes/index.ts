import { Router } from 'express';

import findAllFoodRoutes from './findAll.routes';
import findAllByGroupFoodRoutes from './findAllByGroup.routes';

const foodRoutes = Router();

foodRoutes.use('/food', findAllFoodRoutes);
foodRoutes.use('/food', findAllByGroupFoodRoutes);

export default foodRoutes;
