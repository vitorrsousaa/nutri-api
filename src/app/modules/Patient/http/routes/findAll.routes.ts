import { Router } from 'express';

import PatientModule from '../../module';

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
  PatientModule.getController('findAll')
);

export default findAllPatientRoutes;
