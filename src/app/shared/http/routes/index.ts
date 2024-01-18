import { Router } from 'express';

import planningMealRoutes from '../../../modules/PlanningMeal/http/routes';
import authHandler from '../middlewares/authHandler';

const routes = Router();

routes.use('/api', authHandler, planningMealRoutes);

export default routes;
