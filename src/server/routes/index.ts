import { Router } from 'express';

import { makeAuthenticationMiddleware } from '../../factories/middlewares/makeAuthenticationMiddleware';
import { middlewareAdapter } from '../adapters/middlewareAdapter';

import foodRoutes from './food';
const routes = Router();

routes.use(
  '/api',
  middlewareAdapter(makeAuthenticationMiddleware()),
  foodRoutes
);

export default routes;
