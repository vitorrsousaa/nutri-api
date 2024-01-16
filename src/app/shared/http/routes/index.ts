import { Router } from 'express';

import authRoutes from '../../../modules/Auth/http/routes';
import patientRoutes from '../../../modules/Patient/http/routes';
import planningMealRoutes from '../../../modules/PlanningMeal/http/routes';
import authHandler from '../middlewares/authHandler';

const routes = Router();

routes.use('/api', authRoutes);
routes.use('/api', authHandler, patientRoutes);
routes.use('/api', authHandler, planningMealRoutes);

export default routes;
