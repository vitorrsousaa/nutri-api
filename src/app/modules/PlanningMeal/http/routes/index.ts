import { Router } from 'express';

import createPlanningMealRoutes from './create.routes';

const planningMealRoutes = Router();

planningMealRoutes.use('/planning', createPlanningMealRoutes);

export default planningMealRoutes;
