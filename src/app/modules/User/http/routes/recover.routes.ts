import { Router } from 'express';

import UserModule from '../../module';

const recoverRoute = Router();

//get
recoverRoute.get('/recover', UserModule.getController('recover'));

export default recoverRoute;
