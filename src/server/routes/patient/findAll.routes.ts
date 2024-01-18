import { Router } from 'express';

import { makeControllerFindAllPatients } from '../../../factories/patient/controllers/makeControllerFindAllPatients';
import { routeAdapter } from '../../adapters/routeAdapter';

const findAllPatientRoutes = Router();

findAllPatientRoutes.get(
  '/',
  (req, res, next) => {
    // #swagger.tags = ['Patient']
    // #swagger.description = 'Endpoint to find all patient'
    // #swagger.summary = 'Returns all patient'
    // #swagger.operationId = 'findAllPatient'

    next();
  },
  routeAdapter(makeControllerFindAllPatients())
);

export default findAllPatientRoutes;
