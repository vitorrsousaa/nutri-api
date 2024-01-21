import { Router } from 'express';

import { makeAuthenticationMiddleware } from '../../factories/middlewares/makeAuthenticationMiddleware';
import { middlewareAdapter } from '../adapters/middlewareAdapter';

import anamnesisRoutes from './anamnesis';
import anamnesisTemplateRoutes from './anamnesisTemplate';
import antropometricRoutes from './antropometric';
import authRoutes from './auth';
import foodRoutes from './food';
import patientRoutes from './patient';
import userRoutes from './user';

const routes = Router();

routes.use('/api/auth', authRoutes);

routes.use(
  '/api/patient',
  middlewareAdapter(makeAuthenticationMiddleware()),
  patientRoutes
);

routes.use(
  '/api/food',
  middlewareAdapter(makeAuthenticationMiddleware()),
  foodRoutes
);

routes.use(
  '/api/anamnesis-template',
  middlewareAdapter(makeAuthenticationMiddleware()),
  anamnesisTemplateRoutes
);

routes.use(
  '/api/anamnesis',
  middlewareAdapter(makeAuthenticationMiddleware()),
  anamnesisRoutes
);

routes.use(
  '/api/user',
  middlewareAdapter(makeAuthenticationMiddleware()),
  userRoutes
);

routes.use(
  '/api/antropometric',
  middlewareAdapter(makeAuthenticationMiddleware()),
  antropometricRoutes
);

export default routes;
