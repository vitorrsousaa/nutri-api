import { Router } from 'express';

import PlanningMealModule from '../../module';

const createPlanningMealRoutes = Router();

createPlanningMealRoutes.post(
  '/create/:id',
  PlanningMealModule.getController('create')
);

export default createPlanningMealRoutes;
