import { Router } from 'express';

import createPlanningMealRoutes from './create.routes';
import deletePlanningMealRoutes from './delete.routes';

const planningMealRoutes = Router();

planningMealRoutes.use('/planning', createPlanningMealRoutes);
planningMealRoutes.use('/planning', deletePlanningMealRoutes);

export default planningMealRoutes;
