import { Router } from 'express';

import createPatientRoutes from './create.routes';
import deletePatientRoutes from './delete.routes';
import findAllPatientRoutes from './findAll.routes';
import findByUserIdPatientRoutes from './findByUserId.routes';

const patientRoutes = Router();

patientRoutes.use('/patient', createPatientRoutes);
patientRoutes.use('/patient', findAllPatientRoutes);
patientRoutes.use('/patient', findByUserIdPatientRoutes);
patientRoutes.use('/patient', deletePatientRoutes);

export default patientRoutes;
