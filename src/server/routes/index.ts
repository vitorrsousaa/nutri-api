import { Router } from 'express';

import { makeAuthenticationMiddleware } from '../../factories/middlewares/makeAuthenticationMiddleware';
import { middlewareAdapter } from '../adapters/middlewareAdapter';

import anamnesisTemplateRoutes from './anamnesisTemplate';
import foodRoutes from './food';
const routes = Router();

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

export default routes;
