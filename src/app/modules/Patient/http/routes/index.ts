import { Router } from 'express';

import createPatientRoutes from './create.routes';
import deletePatientRoutes from './delete.routes';
import findAllPatientRoutes from './findAll.routes';

const patientRoutes = Router();

patientRoutes.use('/patient', createPatientRoutes);
patientRoutes.use('/patient', findAllPatientRoutes);
patientRoutes.use('/patient', deletePatientRoutes);

export default patientRoutes;
