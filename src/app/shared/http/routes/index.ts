import { Router } from 'express';

import authRoutes from '../../../modules/Auth/http/routes';

const routes = Router();

routes.use('/api', authRoutes);

export default routes;
