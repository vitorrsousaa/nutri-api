import { Router } from 'express';

import authRoutes from '../../../modules/Auth/http/routes';
import foodRoutes from '../../../modules/Food/http/routes';
import patientRoutes from '../../../modules/Patient/http/routes';
import userRoutes from '../../../modules/User/http/routes';
import authHandler from '../middlewares/authHandler';

const routes = Router();

routes.use('/api', authRoutes);
routes.use('/api', authHandler, patientRoutes);
routes.use('/api', authHandler, userRoutes);
routes.use('/api', authHandler, foodRoutes);

export default routes;
