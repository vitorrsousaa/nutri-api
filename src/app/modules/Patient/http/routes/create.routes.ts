import { Router } from 'express';

import PatientModule from '../../module';

const createPatientRoutes = Router();

createPatientRoutes.use('/create', PatientModule.getController('create'));

export default createPatientRoutes;
