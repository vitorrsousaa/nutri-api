import { Router } from 'express';

import authHandler from '../../../../shared/http/middlewares/authHandler';
import PatientModule from '../../module';

const deletePatientRoutes = Router();

deletePatientRoutes.delete(
  '/:id',
  authHandler,
  PatientModule.getController('delete')
);

export default deletePatientRoutes;
