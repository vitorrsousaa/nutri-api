import { makeControllerFindAllAntropometric } from '@godiet-factories/antropometric/controllers/makeControllerFindAllAntropometric';

import { Router } from 'express';

import { makeMiddlewareAuthorizationPatientModification } from '../../../factories/middlewares/makeMiddlewareAuthorizationPatientModification';
import { middlewareAdapter } from '../../adapters/middlewareAdapter';
import { routeAdapter } from '../../adapters/routeAdapter';

const findAllAntropometricRoutes = Router();

findAllAntropometricRoutes.get(
  '/:patientId',
  (req, res, next) => {
    // #swagger.tags = ['Antropometric Template']

    next();
  },
  middlewareAdapter(makeMiddlewareAuthorizationPatientModification()),
  routeAdapter(makeControllerFindAllAntropometric())
);

export default findAllAntropometricRoutes;
