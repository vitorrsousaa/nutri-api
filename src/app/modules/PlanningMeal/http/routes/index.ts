import { Router } from 'express';

import createPlanningMealRoutes from './create.routes';
import findPlanningByPatientId from './findPlanningByPatientId.routes';

const planningMealRoutes = Router();

planningMealRoutes.use('/planning', createPlanningMealRoutes);
planningMealRoutes.use('/planning', findPlanningByPatientId);

export default planningMealRoutes;
