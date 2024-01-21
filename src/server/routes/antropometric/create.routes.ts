import { makeControllerCreateAntropometric } from '@godiet-factories/antropometric/controllers/makeControllerCreateAntropometric';

import { Router } from 'express';

import { makeMiddlewareAuthorizationPatientModification } from '../../../factories/middlewares/makeMiddlewareAuthorizationPatientModification';
import { middlewareAdapter } from '../../adapters/middlewareAdapter';
import { routeAdapter } from '../../adapters/routeAdapter';

const createAntropometricRoutes = Router();

createAntropometricRoutes.post(
  '/:patientId',
  (req, res, next) => {
    // #swagger.tags = ['Antropometric Template']

    next();
  },
  middlewareAdapter(makeMiddlewareAuthorizationPatientModification()),
  routeAdapter(makeControllerCreateAntropometric())
);

export default createAntropometricRoutes;
