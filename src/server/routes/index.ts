import { Router } from 'express';

import { makeAuthenticationMiddleware } from '../../factories/middlewares/makeAuthenticationMiddleware';
import { middlewareAdapter } from '../adapters/middlewareAdapter';

import anamnesisRoutes from './anamnesis';
import anamnesisTemplateRoutes from './anamnesisTemplate';
import authRoutes from './auth';
import foodRoutes from './food';
const routes = Router();

routes.use('/api', authRoutes);

routes.use(
  '/api',
  middlewareAdapter(makeAuthenticationMiddleware()),
  foodRoutes
);

routes.use(
  '/api',
  middlewareAdapter(makeAuthenticationMiddleware()),
  anamnesisTemplateRoutes
);

routes.use(
  '/api',
  middlewareAdapter(makeAuthenticationMiddleware()),
  anamnesisRoutes
);

export default routes;
