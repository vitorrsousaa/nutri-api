import { Router } from 'express';

import createPatientRoutes from './create.routes';
import findAllPatientRoutes from './findAll.routes';

const patientRoutes = Router();

patientRoutes.use('/patient', createPatientRoutes);
patientRoutes.use('/patient', findAllPatientRoutes);

export default patientRoutes;
