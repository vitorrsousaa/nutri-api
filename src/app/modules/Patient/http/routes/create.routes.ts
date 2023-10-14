import { Router } from 'express';

import authHandler from '../../../../shared/http/middlewares/authHandler';
import PatientModule from '../../module';

const createPatientRoutes = Router();

createPatientRoutes.post(
  '/create',
  authHandler,
  PatientModule.getController('create')
);

export default createPatientRoutes;
