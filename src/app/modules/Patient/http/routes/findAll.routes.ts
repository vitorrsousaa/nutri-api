import { Router } from 'express';

import authHandler from '../../../../shared/http/middlewares/authHandler';
import PatientModule from '../../module';

const findAllPatientRoutes = Router();

findAllPatientRoutes.get(
  '/',
  authHandler,
  PatientModule.getController('findAll')
);

export default findAllPatientRoutes;
