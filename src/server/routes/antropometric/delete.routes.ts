import { makeControllerDeleteAntropometric } from '@godiet-factories/antropometric/controllers/makeControllerDeleteAntropometric';

import { Router } from 'express';

import { makeMiddlewareAuthorizationPatientModification } from '../../../factories/middlewares/makeMiddlewareAuthorizationPatientModification';
import { middlewareAdapter } from '../../adapters/middlewareAdapter';
import { routeAdapter } from '../../adapters/routeAdapter';

const deleteAntropometricRoutes = Router();

deleteAntropometricRoutes.delete(
  '/:patientId',
  (req, res, next) => {
    // #swagger.tags = ['Antropometric Template']

    next();
  },
  middlewareAdapter(makeMiddlewareAuthorizationPatientModification()),
  routeAdapter(makeControllerDeleteAntropometric())
);

export default deleteAntropometricRoutes;
