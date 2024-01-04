import { Router } from 'express';

import findAllFoodRoutes from './findAll.routes';

const foodRoutes = Router();

foodRoutes.use('/food', findAllFoodRoutes);

export default foodRoutes;
