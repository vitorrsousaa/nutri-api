import { Router } from 'express';

import authRoutes from '../../../modules/Auth/http/routes';
import patientRoutes from '../../../modules/Patient/http/routes';

const routes = Router();

routes.use('/api', authRoutes);
routes.use('/api', patientRoutes);

export default routes;
