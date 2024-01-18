import { Router } from 'express';

import { makeMiddlewareAuthorizationPatientModification } from '../../../factories/middlewares/makeMiddlewareAuthorizationPatientModification';
import { makeControllerFindByPatientId } from '../../../factories/patient/controllers/makeControllerFindByPatientId';
import { middlewareAdapter } from '../../adapters/middlewareAdapter';
import { routeAdapter } from '../../adapters/routeAdapter';

const findByUserIdPatientRoutes = Router();

findByUserIdPatientRoutes.get(
  '/:patientId',
  (req, res, next) => {
    // #swagger.tags = ['Patient']
    // #swagger.description = 'Endpoint to find patient by user id'
    // #swagger.summary = 'Returns patient by user id'

    next();
  },
  middlewareAdapter(makeMiddlewareAuthorizationPatientModification()),
  routeAdapter(makeControllerFindByPatientId())
);

export default findByUserIdPatientRoutes;
