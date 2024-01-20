import { Router } from 'express';

import createPatientRoutes from './create.routes';
import deletePatientRoutes from './delete.routes';
import findAllPatientRoutes from './findAll.routes';
import findByUserIdPatientRoutes from './findByUserId.routes';
import updatePatientRoutes from './update.routes';

const patientRoutes = Router();

patientRoutes.use(createPatientRoutes);
patientRoutes.use(findAllPatientRoutes);
patientRoutes.use(findByUserIdPatientRoutes);
patientRoutes.use(deletePatientRoutes);
patientRoutes.use(updatePatientRoutes);

export default patientRoutes;
