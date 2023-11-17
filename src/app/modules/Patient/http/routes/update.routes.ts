import { Router } from 'express';

import PatientModule from '../../module';

const updatePatientRoutes = Router();

updatePatientRoutes.patch('/update/:id', PatientModule.getController('update'));

export default updatePatientRoutes;
