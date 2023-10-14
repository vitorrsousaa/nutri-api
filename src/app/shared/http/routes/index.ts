import { Router } from 'express';

import authRoutes from '../../../modules/Auth/http/routes';
import patientRoutes from '../../../modules/Patient/http/routes';
import userRoutes from '../../../modules/User/http/routes';

const routes = Router();

routes.use('/api', authRoutes);
routes.use('/api', patientRoutes);
routes.use('/api', userRoutes);

export default routes;
