import { Router } from 'express';

import patientRoutes from '../../../modules/Patient/http/routes';
import planningMealRoutes from '../../../modules/PlanningMeal/http/routes';
import authHandler from '../middlewares/authHandler';

const routes = Router();

routes.use('/api', authHandler, patientRoutes);
routes.use('/api', authHandler, planningMealRoutes);

export default routes;
