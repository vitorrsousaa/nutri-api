import { Router } from 'express';

import PatientModule from '../../module';

const createPatientRoutes = Router();

createPatientRoutes.post('/create', PatientModule.getController('create'));

export default createPatientRoutes;
