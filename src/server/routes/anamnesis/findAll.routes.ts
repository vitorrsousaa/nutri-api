import { Router } from 'express';

import { makeControllerFindAllAnamnesis } from '../../../factories/anamnesis/controllers/makeControllerFindAllAnamnesis';
import { makeMiddlewareAuthorizationPatientModification } from '../../../factories/middlewares/makeMiddlewareAuthorizationPatientModification';
import { middlewareAdapter } from '../../adapters/middlewareAdapter';
import { routeAdapter } from '../../adapters/routeAdapter';

const findAllAnamnesisRoutes = Router();

findAllAnamnesisRoutes.get(
  '/:patientId',
  (req, res, next) => {
    // #swagger.tags = ['Anamnesis Template']

    next();
  },
  middlewareAdapter(makeMiddlewareAuthorizationPatientModification()),
  routeAdapter(makeControllerFindAllAnamnesis())
);

export default findAllAnamnesisRoutes;
