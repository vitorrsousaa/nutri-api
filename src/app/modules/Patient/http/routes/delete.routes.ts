import { Router } from 'express';

import PatientModule from '../../module';

const deletePatientRoutes = Router();

deletePatientRoutes.delete('/:id', PatientModule.getController('delete'));

export default deletePatientRoutes;
