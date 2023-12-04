import { Router } from 'express';

import PatientModule from '../../module';

const findByUserIdPatientRoutes = Router();

findByUserIdPatientRoutes.get(
  '/:id',
  (req, res, next) => {
    // #swagger.tags = ['Patient']
    // #swagger.description = 'Endpoint to find patient by user id'
    // #swagger.summary = 'Returns patient by user id'

    next();
  },
  PatientModule.getController('findByUserId')
);

export default findByUserIdPatientRoutes;
