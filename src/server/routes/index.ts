import { makeAuthenticationMiddleware } from '@godiet-factories/middlewares/makeAuthenticationMiddleware';

import { Router } from 'express';

import { middlewareAdapter } from '../adapters/middlewareAdapter';

import foodRoutes from './food';
const routes = Router();

routes.use(
  '/api',
  middlewareAdapter(makeAuthenticationMiddleware()),
  foodRoutes
);

export default routes;
