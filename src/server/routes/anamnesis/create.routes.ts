import { Router } from 'express';

import { makeCreateAnamnesisController } from '../../../factories/anamnesis/controllers/makeCreateAnamnesisController';
import { makeMiddlewareAuthorizationPatientModification } from '../../../factories/middlewares/makeMiddlewareAuthorizationPatientModification';
import { middlewareAdapter } from '../../adapters/middlewareAdapter';
import { routeAdapter } from '../../adapters/routeAdapter';

const createAnamnesisRoutes = Router();

createAnamnesisRoutes.post(
  '/:patientId',
  (req, res, next) => {
    // #swagger.tags = ['Anamnesis Template']

    next();
  },
  middlewareAdapter(makeMiddlewareAuthorizationPatientModification()),
  routeAdapter(makeCreateAnamnesisController())
);

export default createAnamnesisRoutes;
