import { Router } from 'express';

import { makeControllerUpdateAnamnesis } from '../../../factories/anamnesis/controllers/makeControllerUpdateAnamnesis';
import { makeMiddlewareAuthorizationPatientModification } from '../../../factories/middlewares/makeMiddlewareAuthorizationPatientModification';
import { middlewareAdapter } from '../../adapters/middlewareAdapter';
import { routeAdapter } from '../../adapters/routeAdapter';

const updateAnamnesisRoutes = Router();

updateAnamnesisRoutes.put(
  '/:patientId',
  (req, res, next) => {
    // #swagger.tags = ['Anamnesis Template']

    next();
  },
  middlewareAdapter(makeMiddlewareAuthorizationPatientModification()),
  routeAdapter(makeControllerUpdateAnamnesis())
);

export default updateAnamnesisRoutes;
