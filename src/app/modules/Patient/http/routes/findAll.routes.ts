import { Router } from 'express';

import PatientModule from '../../module';

const findAllPatientRoutes = Router();

findAllPatientRoutes.get('/', PatientModule.getController('findAll'));

export default findAllPatientRoutes;
