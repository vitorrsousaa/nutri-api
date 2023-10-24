import { Router } from 'express';

import PatientModule from '../../module';

const findByUserIdPatientRoutes = Router();

findByUserIdPatientRoutes.get(
  '/:id',
  PatientModule.getController('findByUserId')
);

export default findByUserIdPatientRoutes;
