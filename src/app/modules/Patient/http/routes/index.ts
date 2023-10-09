import { Router } from 'express';

import createPatientRoutes from './create.routes';

const patientRoutes = Router();

patientRoutes.use('/patient', createPatientRoutes);

export default patientRoutes;
