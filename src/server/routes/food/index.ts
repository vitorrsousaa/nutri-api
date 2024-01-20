import { Router } from 'express';

import findAllFoodRoutes from './findAll.routes';

const foodRoutes = Router();

foodRoutes.use(findAllFoodRoutes);

export default foodRoutes;
